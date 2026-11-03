import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-700 text-xl font-bold mb-3">
            ✨
          </span>
          <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
            Únete a Vintod Marketplace
          </h2>
          <p class="mt-2 text-sm text-slate-600">
            ¿Ya tienes cuenta?
            <a routerLink="/login" class="font-semibold text-teal-600 hover:text-teal-500 hover:underline">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <!-- Username -->
            <div>
              <label for="username" class="block text-sm font-medium text-slate-700">
                Nombre de usuario (visible en tu perfil)
              </label>
              <div class="mt-1">
                <input
                  id="username"
                  type="text"
                  formControlName="username"
                  placeholder="ej: maria_vintage"
                  [class.border-rose-500]="isFieldInvalid('username')"
                  class="block w-full px-3.5 py-2.5 sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>
              @if (isFieldInvalid('username')) {
                <p class="mt-1 text-xs text-rose-600 font-medium">
                  El nombre de usuario debe tener al menos 3 caracteres.
                </p>
              }
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-slate-700">
                Correo electrónico
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  autocomplete="email"
                  placeholder="tu@correo.com"
                  [class.border-rose-500]="isFieldInvalid('email')"
                  class="block w-full px-3.5 py-2.5 sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>
              @if (isFieldInvalid('email')) {
                <p class="mt-1 text-xs text-rose-600 font-medium">
                  Ingresa un correo electrónico válido.
                </p>
              }
            </div>

            <!-- Contraseña -->
            <div>
              <label for="password" class="block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  type="password"
                  formControlName="password"
                  placeholder="Mínimo 6 caracteres"
                  [class.border-rose-500]="isFieldInvalid('password')"
                  class="block w-full px-3.5 py-2.5 sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>
              @if (isFieldInvalid('password')) {
                <p class="mt-1 text-xs text-rose-600 font-medium">
                  La contraseña debe tener al menos 6 caracteres.
                </p>
              }
            </div>

            <!-- Ciudad -->
            <div>
              <label for="city" class="block text-sm font-medium text-slate-700">
                Ciudad (opcional)
              </label>
              <div class="mt-1">
                <input
                  id="city"
                  type="text"
                  formControlName="city"
                  placeholder="Madrid, Barcelona, Valencia..."
                  class="block w-full px-3.5 py-2.5 sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            <!-- Botón Submit -->
            <div class="pt-2">
              <button
                type="submit"
                [disabled]="isLoading() || registerForm.invalid"
                class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                @if (isLoading()) {
                  <span class="inline-flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando tu cuenta...
                  </span>
                } @else {
                  <span>Crear mi cuenta</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    city: ['']
  });

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const data = this.registerForm.value;

    this.authService.register(data).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          Swal.fire({
            icon: 'success',
            title: '¡Cuenta creada con éxito!',
            text: 'Te damos la bienvenida a Vintod Marketplace.',
            timer: 1800,
            showConfirmButton: false
          });
          this.router.navigate(['/products']);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg =
          err.error?.error?.message ||
          err.error?.message ||
          (typeof err.error?.error === 'string' ? err.error.error : null) ||
          err.message ||
          'Error al procesar el registro. Intenta con otro correo o username.';

        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: errorMsg,
          confirmButtonColor: '#007782'
        });
      }
    });
  }
}
