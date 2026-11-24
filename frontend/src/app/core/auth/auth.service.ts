import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStore } from './auth.store';
import { IS_SILENT_AUTH_CHECK } from './auth.interceptor';
import {
  LoginCredentials,
  RegisterData,
  AuthApiResponse,
  MeApiResponse
} from './auth.models';

export interface LogoutPayload {
  accessToken?: string | null;
  refreshToken?: string | null;
  userId?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);
  private baseUrl = `${environment.apiUrl}/auth`;

  // Opciones HTTP con withCredentials habilitado por defecto
  private httpOptions = {
    withCredentials: true
  };

  /**
   * Inicio de sesión contra POST /api/auth/login
   * Envía withCredentials: true para recibir y persistir las cookies httpOnly (access_token y refresh_token)
   * Tras respuesta exitosa, actualiza automáticamente el AuthStore en memoria
   */
  login(credentials: LoginCredentials): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(`${this.baseUrl}/login`, credentials, this.httpOptions).pipe(
      tap(response => {
        if (response.success && response.data) {
          const token = response.data.accessToken || response.data.token;
          const user = response.data.user;
          this.authStore.setSession(token, user, response.data.refreshToken);
        }
      })
    );
  }

  /**
   * Registro atómico contra POST /api/auth/register
   * Envía withCredentials: true para recibir y persistir las cookies httpOnly
   * Tras respuesta exitosa, guarda sesión en AuthStore en memoria
   */
  register(userData: RegisterData): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(`${this.baseUrl}/register`, userData, this.httpOptions).pipe(
      tap(response => {
        if (response.success && response.data) {
          const token = response.data.accessToken || response.data.token;
          const user = response.data.user;
          this.authStore.setSession(token, user, response.data.refreshToken);
        }
      })
    );
  }

  /**
   * Renovación de sesión automática contra POST /api/auth/refresh
   * Envía cookies automáticamente gracias a withCredentials: true y refreshToken en memoria como fallback
   */
  refreshToken(): Observable<AuthApiResponse> {
    const refreshToken = this.authStore.refreshToken();
    const body = refreshToken ? { refreshToken } : {};

    return this.http.post<AuthApiResponse>(`${this.baseUrl}/refresh`, body, this.httpOptions).pipe(
      tap(response => {
        if (response.success && response.data) {
          const token = response.data.accessToken || response.data.token;
          const user = response.data.user;
          this.authStore.setSession(token, user, response.data.refreshToken);
        }
      })
    );
  }

  /**
   * Obtiene la sesión actual desde GET /api/auth/me con withCredentials: true
   */
  getMe(): Observable<MeApiResponse> {
    return this.http.get<MeApiResponse>(`${this.baseUrl}/me`, this.httpOptions).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.authStore.updateUser(response.data);
        }
      })
    );
  }

  /**
   * Restaura la sesión al recargar la página usando únicamente las cookies httpOnly (sin localStorage).
   * Si access_token caducó, el interceptor renovará automáticamente mediante /refresh.
   */
  restoreSession(): Observable<MeApiResponse | null> {
    const context = new HttpContext().set(IS_SILENT_AUTH_CHECK, true);
    return this.http.get<MeApiResponse>(`${this.baseUrl}/me`, {
      ...this.httpOptions,
      context,
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.authStore.updateUser(response.data);
        }
      }),
      catchError(() => of(null))
    );
  }

  /**
   * Notifica eliminación/revocación de tokens al backend contra POST /api/auth/logout con withCredentials: true
   */
  logoutHttp(payload?: LogoutPayload): Observable<any> {
    const body: LogoutPayload = payload ?? {
      accessToken: this.authStore.token(),
      refreshToken: this.authStore.refreshToken(),
      userId: this.authStore.user()?.id ?? null,
    };

    return this.http.post(`${this.baseUrl}/logout`, body, this.httpOptions);
  }

  /**
   * Cierra sesión eliminando los tokens en el backend y limpiando el estado en memoria en AuthStore
   */
  logout(): void {
    const payload: LogoutPayload = {
      accessToken: this.authStore.token(),
      refreshToken: this.authStore.refreshToken(),
      userId: this.authStore.user()?.id ?? null,
    };

    this.authStore.clearSession();

    this.logoutHttp(payload).subscribe({
      next: () => {},
      error: () => {}
    });
  }
}
