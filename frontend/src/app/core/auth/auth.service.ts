import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStore } from './auth.store';
import {
  LoginCredentials,
  RegisterData,
  AuthApiResponse,
  MeApiResponse
} from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);
  private baseUrl = `${environment.apiUrl}/auth`;

  /**
   * Inicio de sesión contra POST /api/auth/login
   * Tras respuesta exitosa, actualiza automáticamente el AuthStore
   */
  login(credentials: LoginCredentials): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.success && response.data) {
          const { token, user } = response.data;
          this.authStore.setSession(token, user);
        }
      })
    );
  }

  /**
   * Registro atómico contra POST /api/auth/register
   * Tras respuesta exitosa, guarda sesión en AuthStore
   */
  register(userData: RegisterData): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(`${this.baseUrl}/register`, userData).pipe(
      tap(response => {
        if (response.success && response.data) {
          const { token, user } = response.data;
          this.authStore.setSession(token, user);
        }
      })
    );
  }

  /**
   * Obtiene la sesión actual desde GET /api/auth/me
   */
  getMe(): Observable<MeApiResponse> {
    return this.http.get<MeApiResponse>(`${this.baseUrl}/me`).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.authStore.updateUser(response.data);
        }
      })
    );
  }

  /**
   * Notifica revocación de token al backend contra POST /api/auth/logout
   */
  logoutHttp(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  /**
   * Cierra sesión localmente en AuthStore
   */
  logout(): void {
    // Intento de revocación en backend en segundo plano
    this.logoutHttp().subscribe({
      next: () => {},
      error: () => {}
    });
    this.authStore.clearSession();
  }
}

