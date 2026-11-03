import { Injectable, signal, computed } from '@angular/core';
import { AuthUser, UserRole } from './auth.models';

const TOKEN_KEY = 'vintod_jwt_token';
const USER_KEY = 'vintod_user_data';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  // Estado privado con Signals
  private userSignal = signal<AuthUser | null>(this.getInitialUser());
  private tokenSignal = signal<string | null>(this.getInitialToken());

  // Signals públicas de solo lectura
  readonly user = this.userSignal.asReadonly();
  readonly token = this.tokenSignal.asReadonly();

  // Signals computadas reactivas
  readonly isAuthenticated = computed(() => !!this.tokenSignal());
  readonly isAdmin = computed(() => {
    const current = this.userSignal();
    const roleName = typeof current?.role === 'string'
      ? current.role
      : (current?.role as any)?.name;
    return roleName?.toUpperCase() === 'ADMIN';
  });
  readonly userRole = computed<UserRole | null>(() => {
    const current = this.userSignal();
    if (!current) return null;
    const roleName = typeof current.role === 'string'
      ? current.role
      : (current.role as any)?.name;
    return (roleName?.toUpperCase() as UserRole) || 'USER';
  });
  readonly username = computed(() => {
    const u = this.userSignal();
    return u?.profile?.username || u?.email?.split('@')[0] || 'Usuario';
  });
  readonly avatar = computed(() => {
    return this.userSignal()?.profile?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
  });

  /**
   * Actualiza el estado reactivo de sesión y persiste en localStorage
   */
  setSession(token: string, user: AuthUser): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving session to localStorage:', e);
    }
    this.tokenSignal.set(token);
    this.userSignal.set(user);
  }

  /**
   * Actualiza únicamente la información de usuario (útil tras llamar a /me o editar perfil)
   */
  updateUser(user: AuthUser): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error updating user in localStorage:', e);
    }
    this.userSignal.set(user);
  }

  /**
   * Limpia señales y elimina datos del localStorage
   */
  clearSession(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Error clearing session from localStorage:', e);
    }
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  /**
   * Comprueba si el usuario autenticado posee un rol determinado
   */
  hasRole(role: UserRole): boolean {
    const currentRole = this.userRole();
    return currentRole === role.toUpperCase();
  }

  // Métodos auxiliares para inicialización desde localStorage
  private getInitialToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  private getInitialUser(): AuthUser | null {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
}

