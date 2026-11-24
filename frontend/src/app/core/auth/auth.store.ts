import { Injectable, signal, computed } from '@angular/core';
import { AuthUser, UserRole } from './auth.models';

const LEGACY_AUTH_KEYS = ['vintod_jwt_token', 'vintod_refresh_token', 'vintod_user_data'];

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  // Estado privado únicamente en memoria con Signals (sin localStorage)
  private userSignal = signal<AuthUser | null>(null);
  private tokenSignal = signal<string | null>(null);
  private refreshTokenSignal = signal<string | null>(null);

  // Signals públicas de solo lectura
  readonly user = this.userSignal.asReadonly();
  readonly token = this.tokenSignal.asReadonly();
  readonly refreshToken = this.refreshTokenSignal.asReadonly();

  // Signals computadas reactivas
  readonly isAuthenticated = computed(() => !!this.userSignal() || !!this.tokenSignal());
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

  constructor() {
    this.purgeLegacyLocalStorage();
  }

  /**
   * Actualiza el estado reactivo de sesión en memoria (las cookies httpOnly persisten la sesión)
   */
  setSession(token: string, user: AuthUser, refreshToken?: string | null): void {
    this.tokenSignal.set(token);
    this.userSignal.set(user);
    if (refreshToken !== undefined) {
      this.refreshTokenSignal.set(refreshToken);
    }
  }

  /**
   * Actualiza únicamente la información de usuario en memoria (útil tras /me o editar perfil)
   */
  updateUser(user: AuthUser): void {
    this.userSignal.set(user);
  }

  /**
   * Limpia todas las señales de autenticación en memoria
   */
  clearSession(): void {
    this.tokenSignal.set(null);
    this.refreshTokenSignal.set(null);
    this.userSignal.set(null);
    this.purgeLegacyLocalStorage();
  }

  /**
   * Comprueba si el usuario autenticado posee un rol determinado
   */
  hasRole(role: UserRole): boolean {
    const currentRole = this.userRole();
    return currentRole === role.toUpperCase();
  }

  /**
   * Elimina cualquier clave antigua de autenticación que hubiera quedado en localStorage
   */
  private purgeLegacyLocalStorage(): void {
    try {
      for (const key of LEGACY_AUTH_KEYS) {
        localStorage.removeItem(key);
      }
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }
}
