import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../core/auth/auth.store';
import { AuthService } from '../../../core/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="bg-white shadow-xs border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/95">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center gap-2">
            <a routerLink="/" class="text-3xl font-extrabold text-teal-700 tracking-tight hover:opacity-90 transition-opacity">
              Vintod
            </a>
            <span class="hidden md:inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Marketplace
            </span>
          </div>

          <!-- Buscador central -->
          <div class="flex-1 flex justify-center px-4 max-w-lg">
            <div class="w-full relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Buscar prendas de segunda mano..."
                class="block w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-full bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <!-- Acciones de Usuario / Auth -->
          <div class="flex items-center space-x-3">
            <!-- Vender Prenda -->
            <a
              routerLink="/products/new"
              class="inline-flex items-center px-3.5 py-2 text-sm font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 shadow-2xs transition-all"
            >
              <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Vender</span>
            </a>

            <!-- Acceso a Panel Admin si es ADMIN -->
            @if (authStore.isAdmin()) {
              <a
                routerLink="/admin/products"
                class="inline-flex items-center px-3 py-2 border border-teal-200 text-xs font-semibold rounded-lg text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
                title="Acceder al Panel de Administración"
              >
                <svg class="w-4 h-4 mr-1.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Panel Admin</span>
              </a>
            }

            <!-- Estado de sesión -->
            @if (authStore.isAuthenticated()) {
              <!-- Usuario Logueado -->
              <div class="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img
                  [src]="authStore.avatar()"
                  [alt]="authStore.username()"
                  class="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/30"
                />
                <div class="hidden sm:block text-left text-xs">
                  <div class="font-bold text-slate-800 leading-tight">{{ authStore.username() }}</div>
                  <div class="text-[10px] text-teal-600 font-semibold uppercase">{{ authStore.userRole() }}</div>
                </div>
                <button
                  type="button"
                  (click)="handleLogout()"
                  class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
                  title="Cerrar sesión"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            } @else {
              <!-- Usuario Anónimo -->
              <div class="flex items-center gap-2 pl-2">
                <a
                  routerLink="/login"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Iniciar sesión
                </a>
                <a
                  routerLink="/register"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
                >
                  Registrarse
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  authStore = inject(AuthStore);
  private authService = inject(AuthService);
  private router = inject(Router);

  handleLogout(): void {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Seguro que deseas salir de tu cuenta en Vintod?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#007782',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Has salido de tu cuenta.',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/login']);
      }
    });
  }
}
