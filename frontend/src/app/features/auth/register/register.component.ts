import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthStore } from '../../../core/auth/auth.store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <!-- Tarjeta Principal (Glassmorphism adaptado a Modo Claro y Modo Oscuro) -->
      <div class="relative z-10 w-full max-w-md">
        <div class="bg-white/85 dark:bg-[#111e21]/90 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-[0_20px_50px_rgba(0,119,130,0.12),0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] rounded-3xl p-8 sm:p-10 transition-colors duration-300">
          
          <!-- Cabecera de marca: Isotipo circular #007782 con "V" blanca + texto "Vintod" -->
          <div class="flex flex-col items-center text-center mb-6">
            <a routerLink="/" class="inline-flex items-center gap-3 group mb-3">
              <div class="w-12 h-12 rounded-full bg-[#007782] flex items-center justify-center shadow-md shadow-[#007782]/25 group-hover:scale-105 transition-transform">
                <span class="text-white font-black text-2xl tracking-tighter">V</span>
              </div>
              <span class="text-2xl font-extrabold text-slate-900 tracking-tight">Vintod</span>
            </a>
            <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Únete a Vintod
            </h1>
            <p class="mt-2 text-sm text-slate-600">
              Descubre, vende y eleva tu estilo
            </p>
          </div>

          <!-- Formulario de Registro -->
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Full Name (Nombre completo) -->
            <div>
              <label for="fullName" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1">
                Nombre completo
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-stone-400">
                  <span class="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <input
                  id="fullName"
                  type="text"
                  formControlName="fullName"
                  autocomplete="name"
                  placeholder="María García"
                  [class.border-rose-400]="isFieldInvalid('fullName')"
                  [class.focus:ring-rose-400]="isFieldInvalid('fullName')"
                  class="w-full pl-11 pr-4 py-2.5 bg-white/90 dark:bg-[#0d171a]/90 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-stone-100 placeholder:text-slate-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#007782] dark:focus:ring-teal-400 focus:border-transparent transition-all shadow-xs"
                />
              </div>
              @if (isFieldInvalid('fullName')) {
                <p class="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">error</span>
                  Por favor, indica tu nombre completo.
                </p>
              }
            </div>

            <!-- Username (Nombre de usuario público) -->
            <div>
              <label for="username" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1">
                Nombre de usuario (público)
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-stone-400">
                  <span class="material-symbols-outlined text-[20px]">person</span>
                </div>
                <input
                  id="username"
                  type="text"
                  formControlName="username"
                  autocomplete="username"
                  placeholder="ej: maria_vintage"
                  [class.border-rose-400]="isFieldInvalid('username')"
                  [class.focus:ring-rose-400]="isFieldInvalid('username')"
                  class="w-full pl-11 pr-4 py-2.5 bg-white/90 dark:bg-[#0d171a]/90 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-stone-100 placeholder:text-slate-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#007782] dark:focus:ring-teal-400 focus:border-transparent transition-all shadow-xs"
                />
              </div>
              @if (isFieldInvalid('username')) {
                <p class="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">error</span>
                  @if (registerForm.get('username')?.hasError('required')) {
                    El nombre de usuario es obligatorio.
                  } @else if (registerForm.get('username')?.hasError('minlength')) {
                    Mínimo 3 caracteres.
                  } @else if (registerForm.get('username')?.hasError('pattern')) {
                    Solo letras, números, puntos y guiones.
                  }
                </p>
              }
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1">
                Correo electrónico
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-stone-400">
                  <span class="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  autocomplete="email"
                  placeholder="tu@correo.com"
                  [class.border-rose-400]="isFieldInvalid('email')"
                  [class.focus:ring-rose-400]="isFieldInvalid('email')"
                  class="w-full pl-11 pr-4 py-2.5 bg-white/90 dark:bg-[#0d171a]/90 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-stone-100 placeholder:text-slate-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#007782] dark:focus:ring-teal-400 focus:border-transparent transition-all shadow-xs"
                />
              </div>
              @if (isFieldInvalid('email')) {
                <p class="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">error</span>
                  Ingresa un correo electrónico válido.
                </p>
              }
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1">
                Contraseña
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-stone-400">
                  <span class="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  id="password"
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="password"
                  autocomplete="new-password"
                  placeholder="Mínimo 6 caracteres"
                  [class.border-rose-400]="isFieldInvalid('password')"
                  [class.focus:ring-rose-400]="isFieldInvalid('password')"
                  class="w-full pl-11 pr-11 py-2.5 bg-white/90 dark:bg-[#0d171a]/90 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-stone-100 placeholder:text-slate-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#007782] dark:focus:ring-teal-400 focus:border-transparent transition-all shadow-xs"
                />
                <button
                  type="button"
                  (click)="togglePasswordVisibility()"
                  class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-stone-200 transition-colors"
                  [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Ver contraseña'"
                >
                  <span class="material-symbols-outlined text-[20px]">
                    {{ showPassword() ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </div>
              @if (isFieldInvalid('password')) {
                <p class="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">error</span>
                  La contraseña debe tener al menos 6 caracteres.
                </p>
              }
            </div>

            <!-- Términos y condiciones -->
            <div class="pt-1">
              <label class="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  formControlName="terms"
                  class="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-stone-700 text-[#007782] dark:text-teal-500 focus:ring-[#007782] dark:focus:ring-teal-400 bg-white dark:bg-[#0d171a]"
                />
                <span class="text-xs text-slate-600 dark:text-stone-300 leading-tight">
                  Acepto los <a href="javascript:void(0)" class="text-[#007782] dark:text-[#2dd4bf] font-semibold hover:underline">Términos de Servicio</a> y la <a href="javascript:void(0)" class="text-[#007782] dark:text-[#2dd4bf] font-semibold hover:underline">Política de Privacidad</a> de Vintod.
                </span>
              </label>
              @if (isFieldInvalid('terms')) {
                <p class="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">error</span>
                  Debes aceptar los términos para continuar.
                </p>
              }
            </div>

            <!-- Botón principal de registro (Pill button ancho completo con loader) -->
            <button
              type="submit"
              [disabled]="isLoading()"
              class="w-full rounded-full bg-[#007782] dark:bg-teal-500 hover:bg-[#005f69] dark:hover:bg-teal-400 active:scale-[0.99] text-white dark:text-[#0b1416] font-semibold py-3 px-6 shadow-md shadow-[#007782]/25 dark:shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              @if (isLoading()) {
                <div class="w-5 h-5 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin"></div>
                <span>Creando cuenta...</span>
              } @else {
                <span>Crear cuenta gratis</span>
                <span class="material-symbols-outlined text-[18px]">sparkles</span>
              }
            </button>
          </form>

          <!-- Separador "O continúa con" -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200 dark:border-white/10"></div>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-white/90 dark:bg-[#111e21] px-3 text-slate-500 dark:text-stone-400 font-semibold tracking-wider">
                O regístrate con
              </span>
            </div>
          </div>

          <!-- Botones sociales redondeados (Stubs UI para Google y Apple) -->
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              (click)="onSocialRegister('Google')"
              class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0d171a]/80 hover:bg-white dark:hover:bg-[#162529] text-xs font-semibold text-slate-700 dark:text-stone-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              (click)="onSocialRegister('Apple')"
              class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0d171a]/80 hover:bg-white dark:hover:bg-[#162529] text-xs font-semibold text-slate-700 dark:text-stone-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <svg class="w-4 h-4 fill-current text-slate-900 dark:text-stone-100" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-1 2.94 1.07.08 2.15-.46 2.81-1.28z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <!-- Pie de tarjeta: enlace a inicio de sesión -->
          <div class="mt-8 text-center pt-4 border-t border-slate-200/60 dark:border-white/10">
            <p class="text-sm text-slate-600 dark:text-stone-400">
              ¿Ya tienes cuenta?
              <a
                routerLink="/login"
                class="font-bold text-[#007782] dark:text-[#2dd4bf] hover:text-[#005f69] dark:hover:text-teal-300 hover:underline transition-colors ml-1"
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    username: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z0-9_.-]+$/)
    ]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    terms: [true, [Validators.requiredTrue]]
  });

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const { email, password, username, fullName } = this.registerForm.value;

    this.authService.register({
      email,
      password,
      username,
      bio: fullName ? `Hola, soy ${fullName}` : undefined
    }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido a Vintod!',
            text: 'Tu cuenta ha sido creada exitosamente.',
            timer: 1800,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/']);
          });
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg = err.error?.error?.message || err.error?.message || 'No se pudo completar el registro. Inténtalo de nuevo.';
        Swal.fire({
          icon: 'error',
          title: 'Error al registrarte',
          text: errorMsg,
          confirmButtonColor: '#007782'
        });
      }
    });
  }

  onSocialRegister(provider: string): void {
    Swal.fire({
      icon: 'info',
      title: `Registro con ${provider}`,
      text: `El registro rápido con ${provider} estará disponible próximamente.`,
      confirmButtonColor: '#007782'
    });
  }
}
