import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthStore } from '../../../core/auth/auth.store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-700 text-xl font-bold mb-3">
            🔐
          </span>
          <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
            Iniciar sesión en Vintod
          </h2>
          <p class="mt-2 text-sm text-slate-600">
            ¿No tienes cuenta?
            <a routerLink="/register" class="font-semibold text-teal-600 hover:text-teal-500 hover:underline">
              Regístrate gratis
            </a>
          </p>
        </div>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-slate-700">
                Correo electrónico
              </label>
              <div class="mt-1 relative rounded-md shadow-xs">
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  autocomplete="email"
                  placeholder="ejemplo@vintod.com"
                  [class.border-rose-500]="isFieldInvalid('email')"
                  class="block w-full px-3.5 py-2.5 sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>
              @if (isFieldInvalid('email')) {
                <p class="mt-1.5 text-xs text-rose-600 font-medium">
                  @if (loginForm.get('email')?.hasError('required')) {
                    El email es obligatorio.
                  } @else if (loginForm.get('email')?.hasError('email')) {
                    Ingresa un correo electrónico con formato válido.
                  }
                </p>
              }
            </div>

            <!-- Contraseña -->
            <div>
              <label for="password" class="block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <div class="mt-1 relative rounded-md shadow-xs">
                <input
                  id="password"
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="password"
                  autocomplete="current-password"
                  placeholder="••••••••"
                  [class.border-rose-500]="isFieldInvalid('password')"
                  class="block w-full px-3.5 py-2.5 sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
                <button
                  type="button"
                  (click)="showPassword.set(!showPassword())"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
                >
                  {{ showPassword() ? 'Ocultar' : 'Mostrar' }}
                </button>
              </div>
              @if (isFieldInvalid('password')) {
                <p class="mt-1.5 text-xs text-rose-600 font-medium">
                  La contraseña es obligatoria.
                </p>
              }
            </div>

            <!-- Accesos rápidos de prueba (Seed credentials) -->
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 text-slate-600">
              <span class="font-bold text-slate-700 block">Cuentas de prueba del sistema:</span>
              <div class="flex items-center justify-between">
                <span>👤 Vendedor (USER):</span>
                <button
                  type="button"
                  (click)="fillCredentials('carmen@vintod.com', 'password123')"
                  class="text-teal-600 font-semibold hover:underline"
                >
                  carmen&#64;vintod.com
                </button>
              </div>
              <div class="flex items-center justify-between">
                <span>🛡️ Administrador (ADMIN):</span>
                <button
                  type="button"
                  (click)="fillCredentials('admin@vintod.com', 'admin123')"
                  class="text-teal-600 font-semibold hover:underline"
                >
                  admin&#64;vintod.com
                </button>
              </div>
            </div>

            <!-- Botón Submit -->
            <div>
              <button
                type="submit"
                [disabled]="isLoading() || loginForm.invalid"
                class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                @if (isLoading()) {
                  <span class="inline-flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Validando credenciales...
                  </span>
                } @else {
                  <span>Iniciar sesión</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = signal(false);
  showPassword = signal(false);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  fillCredentials(email: string, pass: string): void {
    this.loginForm.patchValue({
      email,
      password: pass
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          const user = res.data.user;
          const username = user.profile?.username || user.email;

          Swal.fire({
            icon: 'success',
            title: `¡Bienvenido de nuevo, ${username}!`,
            text: 'Sesión iniciada correctamente en Vintod.',
            timer: 1800,
            showConfirmButton: false
          });

          // Redirección según rol o returnUrl
          const returnUrl = this.route.snapshot.queryParams['returnUrl'];
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else if (this.authStore.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/products']);
          }
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg = err.error?.error?.message || err.error?.message || 'Credenciales inválidas. Comprueba tu correo y contraseña.';
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: errorMsg,
          confirmButtonColor: '#007782'
        });
      }
    });
  }
}

