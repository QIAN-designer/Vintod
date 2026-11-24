import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../../core/auth/auth.service";
import { AuthStore } from "../../../core/auth/auth.store";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [RouterLink, RouterLinkActive, FormsModule, ThemeToggleComponent],
    template: `
        <header class="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none">
            <div
                class="pointer-events-auto bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/60 dark:border-stone-800 shadow-[0_8px_32px_rgba(0,119,130,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-4 transition-all"
            >
                <!-- Izquierda: Isotipo circular #007782 con "V" + texto "Vintod" y navegación -->
                <div class="flex items-center gap-6 shrink-0">
                    <a routerLink="/" class="flex items-center gap-2 group">
                        <div
                            class="w-9 h-9 rounded-full bg-[#007782] flex items-center justify-center shadow-sm shadow-[#007782]/30 group-hover:scale-105 transition-transform"
                        >
                            <span class="text-white font-black text-lg leading-none">V</span>
                        </div>
                        <span class="text-xl font-extrabold text-slate-900 dark:text-stone-100 tracking-tight"
                            >Vintod</span
                        >
                    </a>

                    <nav
                        class="hidden md:flex items-center gap-5 text-sm font-semibold text-slate-600 dark:text-stone-300"
                    >
                        <a routerLink="/" class="hover:text-[#007782] dark:hover:text-[#4db8c4] transition-colors"
                            >Explorar</a
                        >
                        <a
                            routerLink="/products"
                            class="hover:text-[#007782] dark:hover:text-[#4db8c4] transition-colors"
                            >Catálogo</a
                        >
                        <a
                            routerLink="/products"
                            [queryParams]="{ category: 'vintage' }"
                            class="hover:text-[#007782] dark:hover:text-[#4db8c4] transition-colors"
                            >Sobre Nosotros</a
                        >
                    </nav>
                </div>

                <!-- Centro: Input de búsqueda rápida redondeado (Enter navega a /products?search=...) -->
                <div class="flex-1 max-w-md mx-2 sm:mx-4">
                    <div class="relative">
                        <div
                            class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-stone-500"
                        >
                            <span class="material-symbols-outlined text-[19px]">search</span>
                        </div>
                        <input
                            type="text"
                            [(ngModel)]="searchTerm"
                            (keydown.enter)="onSearch()"
                            placeholder="Buscar prendas, marcas..."
                            class="w-full pl-10 pr-4 py-2 bg-slate-100/80 dark:bg-stone-800/80 hover:bg-slate-100 dark:hover:bg-stone-800 focus:bg-white dark:focus:bg-stone-900 border border-transparent focus:border-slate-200 dark:focus:border-stone-700 rounded-full text-xs sm:text-sm text-slate-900 dark:text-stone-100 placeholder:text-slate-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#007782]/40 transition-all shadow-inner"
                        />
                    </div>
                </div>

                <!-- Derecha: CTA "Vender prenda", Theme Toggle, Notificaciones y Menú de perfil reactivo -->
                <div class="flex items-center gap-2 sm:gap-2.5 shrink-0">
                    <!-- Botón CTA Pill "Vender prenda" -->
                    <a
                        routerLink="/products/new"
                        class="hidden sm:inline-flex items-center gap-1.5 bg-[#007782] hover:bg-[#005f69] active:scale-95 text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full shadow-sm shadow-[#007782]/20 transition-all cursor-pointer"
                    >
                        <span class="material-symbols-outlined text-[17px]">add</span>
                        <span>Vender prenda</span>
                    </a>

                    <!-- Botón Selector Modo Claro / Oscuro -->
                    <app-theme-toggle></app-theme-toggle>

                    <!-- Botón de Favoritos (Corazón) -->
                    <a
                        routerLink="/favorites"
                        routerLinkActive="!text-rose-500 bg-rose-50/80 dark:bg-rose-950/40"
                        class="w-9 h-9 rounded-full hover:bg-rose-50/70 dark:hover:bg-stone-800 text-slate-600 dark:text-stone-300 hover:text-rose-500 dark:hover:text-rose-400 flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Mis favoritos"
                        title="Mis favoritos"
                    >
                        <span class="material-symbols-outlined text-[20px]">favorite</span>
                    </a>

                    <!-- Icono de Notificaciones -->
                    <button
                        type="button"
                        (click)="onNotificationClick()"
                        class="w-9 h-9 rounded-full hover:bg-slate-100 dark:hover:bg-stone-800 text-slate-600 dark:text-stone-300 hover:text-slate-900 dark:hover:text-stone-100 flex items-center justify-center transition-colors relative cursor-pointer"
                        aria-label="Notificaciones"
                    >
                        <span class="material-symbols-outlined text-[20px]">notifications</span>
                        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#d97757]"></span>
                    </button>

                    <!-- Menú de Usuario / Auth reactivo a AuthStore -->
                    @if (authStore.isAuthenticated()) {
                        <div class="relative">
                            <button
                                type="button"
                                (click)="isMenuOpen.set(!isMenuOpen())"
                                class="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                            >
                                <img
                                    [src]="authStore.avatar()"
                                    [alt]="authStore.username()"
                                    class="w-8 h-8 rounded-full object-cover ring-2 ring-[#007782]/25 shadow-2xs"
                                />
                                <span
                                    class="text-xs font-bold text-slate-800 dark:text-stone-200 hidden lg:inline max-w-[100px] truncate"
                                >
                                    {{ authStore.username() }}
                                </span>
                                <span class="material-symbols-outlined text-[16px] text-slate-500 dark:text-stone-400"
                                    >expand_more</span
                                >
                            </button>

                            @if (isMenuOpen()) {
                                <div
                                    class="absolute right-0 top-full mt-2 w-52 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 dark:border-stone-800 py-2 z-50 divide-y divide-slate-100 dark:divide-stone-800"
                                >
                                    <div class="px-4 py-2.5">
                                        <p class="text-xs text-slate-400 dark:text-stone-400">Sesión iniciada como</p>
                                        <p class="text-sm font-bold text-slate-900 dark:text-stone-100 truncate">
                                            {{ authStore.username() }}
                                        </p>
                                    </div>
                                    <div class="py-1">
                                        <a
                                            routerLink="/profile"
                                            (click)="isMenuOpen.set(false)"
                                            class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800"
                                        >
                                            <span class="material-symbols-outlined text-[17px] text-slate-400"
                                                >person</span
                                            >
                                            <span>Mi Perfil</span>
                                        </a>
                                        <a
                                            routerLink="/favorites"
                                            (click)="isMenuOpen.set(false)"
                                            class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800"
                                        >
                                            <span class="material-symbols-outlined text-[17px] text-rose-500"
                                                >favorite</span
                                            >
                                            <span>Mis Favoritos</span>
                                        </a>
                                        <a
                                            routerLink="/products/new"
                                            (click)="isMenuOpen.set(false)"
                                            class="sm:hidden flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-stone-800"
                                        >
                                            <span class="material-symbols-outlined text-[17px] text-[#007782]"
                                                >add_circle</span
                                            >
                                            <span>Vender prenda</span>
                                        </a>
                                        @if (authStore.userRole() === "ADMIN") {
                                            <a
                                                routerLink="/admin/products"
                                                (click)="isMenuOpen.set(false)"
                                                class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#007782] dark:text-[#4db8c4] hover:bg-slate-50 dark:hover:bg-stone-800"
                                            >
                                                <span class="material-symbols-outlined text-[17px]"
                                                    >admin_panel_settings</span
                                                >
                                                <span>Panel Admin</span>
                                            </a>
                                        }
                                    </div>
                                    <div class="pt-1">
                                        <button
                                            type="button"
                                            (click)="handleLogout()"
                                            class="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                        >
                                            <span class="material-symbols-outlined text-[17px]">logout</span>
                                            <span>Cerrar sesión</span>
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    } @else {
                        <div class="flex items-center gap-1.5 sm:gap-2">
                            <a
                                routerLink="/login"
                                class="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-stone-300 hover:text-[#007782] dark:hover:text-[#4db8c4] hover:bg-slate-100/70 dark:hover:bg-stone-800/70 transition-all"
                            >
                                Entrar
                            </a>
                            <a
                                routerLink="/register"
                                class="px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold bg-[#007782] text-white hover:bg-[#005f69] shadow-xs transition-all"
                            >
                                Registro
                            </a>
                        </div>
                    }
                </div>
            </div>
        </header>
    `,
})
export class NavbarComponent {
    authStore = inject(AuthStore);
    private authService = inject(AuthService);
    private router = inject(Router);

    searchTerm = "";
    isMenuOpen = signal<boolean>(false);

    onSearch(): void {
        const term = this.searchTerm.trim();
        if (term) {
            this.router.navigate(["/products"], { queryParams: { search: term } });
        } else {
            this.router.navigate(["/products"]);
        }
    }

    onNotificationClick(): void {
        Swal.fire({
            icon: "info",
            title: "Notificaciones",
            text: "No tienes notificaciones pendientes en este momento.",
            confirmButtonColor: "#007782",
        });
    }

    handleLogout(): void {
        this.isMenuOpen.set(false);
        Swal.fire({
            title: "¿Cerrar sesión?",
            text: "Tendrás que iniciar sesión nuevamente para comprar o publicar prendas.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#007782",
        }).then(result => {
            if (result.isConfirmed) {
                this.authService.logout();
                this.router.navigate(["/login"]);
            }
        });
    }
}
