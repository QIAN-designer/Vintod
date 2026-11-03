import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthStore } from './auth.store';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const token = authStore.token();
  const isApiUrl = req.url.startsWith(environment.apiUrl);

  // Evitar inyectar Authorization en login/register si no hay token
  const isAuthEndpoint = req.url.includes('/api/auth/login') || req.url.includes('/api/auth/register');

  // Clonar la petición activando SIEMPRE withCredentials: true para peticiones a la API
  // Esto envía automáticamente las cookies httpOnly (jwt_token) y permite al navegador almacenarlas
  let authReq = req.clone({
    withCredentials: true
  });

  if (token && isApiUrl && !isAuthEndpoint) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 1. Manejo de 401 Unauthorized (token expirado, inválido o no suministrado)
      if (error.status === 401) {
        // Si no estamos intentando loguearnos
        if (!isAuthEndpoint) {
          authStore.clearSession();
          Swal.fire({
            icon: 'warning',
            title: 'Sesión expirada',
            text: error.error?.error?.message || 'Tu sesión ha expirado o no es válida. Por favor, inicia sesión nuevamente.',
            confirmButtonColor: '#007782',
            confirmButtonText: 'Iniciar sesión'
          }).then(() => {
            router.navigate(['/login'], {
              queryParams: { returnUrl: router.routerState.snapshot.url }
            });
          });
        }
      }

      // 2. Manejo de 403 Forbidden (usuario sin permisos para el recurso)
      else if (error.status === 403) {
        const errorMsg = error.error?.error?.message || error.error?.message || 'No dispones de los permisos necesarios para realizar esta acción.';
        Swal.fire({
          icon: 'error',
          title: 'Acceso Denegado (403)',
          text: errorMsg,
          confirmButtonColor: '#007782'
        });

        // Si el usuario intentó acceder a /admin sin privilegios, redirigir a catálogo
        if (router.routerState.snapshot.url.startsWith('/admin')) {
          router.navigate(['/products']);
        }
      }

      // 3. Error de red o servidor caído
      else if (error.status === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Problema de conexión',
          text: 'No se pudo conectar con el servidor. Revisa tu conexión a internet o intenta nuevamente en unos instantes.',
          confirmButtonColor: '#007782'
        });
      }

      return throwError(() => error);
    })
  );
};
