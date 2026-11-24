import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpContextToken,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  finalize,
  map,
  of,
  shareReplay,
  switchMap,
  throwError,
} from 'rxjs';
import Swal from 'sweetalert2';
import { AuthStore } from './auth.store';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

// Evita reintentar /refresh más de una vez para la misma petición
const IS_RETRY_REQUEST = new HttpContextToken<boolean>(() => false);

// Permite restaurar sesión en el arranque sin mostrar modal ni redirigir a visitantes no autenticados
export const IS_SILENT_AUTH_CHECK = new HttpContextToken<boolean>(() => false);

// Cola compartida para que múltiples 401 concurrentes disparen un único /refresh
let refreshInProgress$: Observable<string> | null = null;
let isHandlingSessionExpiry = false;

function cloneWithToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({
    withCredentials: true,
    context: req.context.set(IS_RETRY_REQUEST, true),
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handleRefreshFailure(
  authService: AuthService,
  authStore: AuthStore,
  router: Router,
  refreshErr: unknown,
  isSilent: boolean
): Observable<never> {
  const payload = {
    accessToken: authStore.token(),
    refreshToken: authStore.refreshToken(),
    userId: authStore.user()?.id ?? null,
  };

  authStore.clearSession();

  return authService.logoutHttp(payload).pipe(
    catchError(() => of(null)),
    switchMap(() => {
      if (!isSilent && !isHandlingSessionExpiry) {
        isHandlingSessionExpiry = true;
        Swal.fire({
          icon: 'warning',
          title: 'Sesión expirada',
          text: 'Tu sesión ha expirado o no es válida. Por favor, inicia sesión nuevamente.',
          confirmButtonColor: '#007782',
          confirmButtonText: 'Iniciar sesión',
        }).then(() => {
          isHandlingSessionExpiry = false;
          const currentUrl = router.routerState.snapshot.url;
          if (!currentUrl.startsWith('/login')) {
            router.navigate(['/login'], {
              queryParams: { returnUrl: currentUrl },
            });
          }
        });
      }
      return throwError(() => refreshErr);
    })
  );
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authStore.token();
  const isApiUrl = req.url.startsWith(environment.apiUrl);
  const isSilentCheck = req.context.get(IS_SILENT_AUTH_CHECK);

  const isLoginOrRegister =
    req.url.includes('/api/auth/login') ||
    req.url.includes('/api/auth/register');
  const isRefreshEndpoint = req.url.includes('/api/auth/refresh');
  const isLogoutEndpoint =
    req.url.includes('/api/auth/logout') ||
    req.url.includes('/api/auth/revoke-token');

  // No disparar /refresh en endpoints de autenticación ni en peticiones ya reintentadas
  const shouldSkipRefresh =
    isLoginOrRegister ||
    isRefreshEndpoint ||
    isLogoutEndpoint ||
    req.context.get(IS_RETRY_REQUEST);

  // Clonar la petición activando SIEMPRE withCredentials: true
  // Envía automáticamente las cookies httpOnly (access_token, refresh_token)
  let authReq = req.clone({
    withCredentials: true,
  });

  if (token && isApiUrl && !isLoginOrRegister && !isRefreshEndpoint) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 1. Manejo de 401 Unauthorized (access_token caducado o inválido)
      if (error.status === 401 && isApiUrl && !shouldSkipRefresh) {
        if (!refreshInProgress$) {
          refreshInProgress$ = authService.refreshToken().pipe(
            map((response) => {
              const newToken = response.data?.accessToken || response.data?.token;
              if (!newToken) {
                throw new Error('No se recibió un nuevo access token al refrescar la sesión');
              }
              return newToken;
            }),
            catchError((refreshErr) =>
              handleRefreshFailure(authService, authStore, router, refreshErr, isSilentCheck)
            ),
            finalize(() => {
              refreshInProgress$ = null;
            }),
            shareReplay(1)
          );
        }

        return refreshInProgress$.pipe(
          switchMap((newToken) => next(cloneWithToken(req, newToken)))
        );
      }

      // Si ya se reintentó con un token nuevo y volvió a dar 401, forzar logout
      if (error.status === 401 && isApiUrl && req.context.get(IS_RETRY_REQUEST)) {
        return handleRefreshFailure(authService, authStore, router, error, isSilentCheck);
      }

      // 2. Manejo de 403 Forbidden (usuario sin permisos para el recurso)
      if (error.status === 403 && !isSilentCheck) {
        const errorMsg =
          error.error?.error?.message ||
          error.error?.message ||
          'No dispones de los permisos necesarios para realizar esta acción.';
        Swal.fire({
          icon: 'error',
          title: 'Acceso Denegado (403)',
          text: errorMsg,
          confirmButtonColor: '#007782',
        });

        if (router.routerState.snapshot.url.startsWith('/admin')) {
          router.navigate(['/products']);
        }
      }

      // 3. Error de red o servidor caído
      else if (error.status === 0 && !isSilentCheck) {
        Swal.fire({
          icon: 'info',
          title: 'Problema de conexión',
          text: 'No se pudo conectar con el servidor. Revisa tu conexión a internet o intenta nuevamente en unos instantes.',
          confirmButtonColor: '#007782',
        });
      }

      return throwError(() => error);
    })
  );
};
