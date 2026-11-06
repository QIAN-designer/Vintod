import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../core/auth/auth.store';
import { ProfileService, ProfileApiResponse } from '../../core/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Encabezado de Perfil -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div class="relative group">
          <img
            [src]="authStore.avatar()"
            [alt]="authStore.username()"
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-teal-500/20 shadow-sm"
          />
          <span class="absolute bottom-0 right-0 w-5 h-5 bg-teal-500 border-2 border-white rounded-full"></span>
        </div>

        <div class="flex-1 text-center sm:text-left space-y-2">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
                {{ authStore.username() }}
              </h1>
              <p class="text-sm text-slate-500">{{ authStore.user()?.email }}</p>
            </div>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 self-center sm:self-start uppercase">
              Rol: {{ authStore.userRole() }}
            </span>
          </div>

          <p class="text-sm text-slate-600 max-w-xl">
            {{ currentBio() || 'Sin biografía aún. Edita tu perfil para que otros usuarios conozcan tu estilo y prendas.' }}
          </p>

          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-2">
            @if (currentCity()) {
              <span class="inline-flex items-center gap-1">
                📍 {{ currentCity() }}, {{ currentCountry() }}
              </span>
            }
            <span class="inline-flex items-center gap-1">
              ⭐ Valoración: <strong>{{ currentRating() }}/5</strong>
            </span>
          </div>
        </div>
      </div>

      <!-- Formulario de Edición de Perfil -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div class="border-b border-slate-100 pb-4 mb-6">
          <h2 class="text-lg font-bold text-slate-900">Editar Información Pública</h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Estos datos serán visibles por otros compradores y vendedores en el marketplace.
          </p>
        </div>

        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Username -->
            <div>
              <label for="username" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Nombre de usuario
              </label>
              <input
                id="username"
                type="text"
                formControlName="username"
                class="block w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
              @if (isFieldInvalid('username')) {
                <p class="mt-1 text-xs text-rose-600">El nombre de usuario debe tener al menos 3 caracteres.</p>
              }
            </div>

            <!-- Ciudad -->
            <div>
              <label for="city" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Ciudad
              </label>
              <input
                id="city"
                type="text"
                formControlName="city"
                placeholder="Madrid, Barcelona, Valencia..."
                class="block w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
            </div>

            <!-- País -->
            <div>
              <label for="country" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                País
              </label>
              <input
                id="country"
                type="text"
                formControlName="country"
                placeholder="España"
                class="block w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
            </div>

            <!-- Código Postal -->
            <div>
              <label for="postalCode" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Código Postal
              </label>
              <input
                id="postalCode"
                type="text"
                formControlName="postalCode"
                placeholder="28001"
                class="block w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

          <!-- URL Avatar -->
          <div>
            <label for="avatarUrl" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              URL Foto de perfil / Avatar
            </label>
            <input
              id="avatarUrl"
              type="url"
              formControlName="avatarUrl"
              placeholder="https://images.unsplash.com/photo-..."
              class="block w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
          </div>

          <!-- Biografía -->
          <div>
            <label for="bio" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Biografía / Sobre ti
            </label>
            <textarea
              id="bio"
              rows="3"
              formControlName="bio"
              placeholder="Describe tu estilo, condiciones de envío o marcas favoritas..."
              class="block w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            ></textarea>
          </div>

          <!-- Botones de Acción -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <a
              routerLink="/products"
              class="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </a>
            <button
              type="submit"
              [disabled]="isLoading() || profileForm.invalid"
              class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-2xs disabled:opacity-50 transition-all"
            >
              @if (isLoading()) {
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando cambios...
              } @else {
                <span>Guardar Cambios</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ProfilePageComponent implements OnInit {
  authStore = inject(AuthStore);
  private profileService = inject(ProfileService);
  private fb = inject(FormBuilder);

  isLoading = signal(false);

  profileForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    city: [''],
    country: ['España'],
    postalCode: [''],
    avatarUrl: [''],
    bio: ['']
  });

  currentBio = signal('');
  currentCity = signal('');
  currentCountry = signal('España');
  currentRating = signal('5.0');

  ngOnInit(): void {
    const user = this.authStore.user();
    if (user?.profile) {
      this.populateForm(user.profile);
    }

    // Cargar perfil fresco desde la API
    this.profileService.getMyProfile().subscribe({
      next: (res: ProfileApiResponse) => {
        if (res.success && res.data) {
          this.populateForm(res.data);
        }
      },
      error: () => {}
    });
  }

  private populateForm(p: any): void {
    this.profileForm.patchValue({
      username: p.username || '',
      city: p.city || '',
      country: p.country || 'España',
      postalCode: p.postalCode || '',
      avatarUrl: p.avatarUrl || '',
      bio: p.bio || ''
    });
    this.currentBio.set(p.bio || '');
    this.currentCity.set(p.city || '');
    this.currentCountry.set(p.country || 'España');
    this.currentRating.set(p.ratingAverage ? p.ratingAverage.toFixed(1) : '5.0');
  }

  isFieldInvalid(field: string): boolean {
    const control = this.profileForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const userId = this.authStore.user()?.id;
    if (!userId) return;

    this.isLoading.set(true);
    const data = this.profileForm.value;

    this.profileService.updateProfile(userId, data).subscribe({
      next: (res: ProfileApiResponse) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          // Actualizar estado en el AuthStore
          const current = this.authStore.user();
          if (current) {
            this.authStore.updateUser({
              ...current,
              profile: {
                ...current.profile,
                ...res.data
              }
            });
          }

          this.populateForm(res.data);

          Swal.fire({
            icon: 'success',
            title: 'Perfil actualizado',
            text: 'Tus datos se han guardado correctamente.',
            timer: 1800,
            showConfirmButton: false
          });
        }
      },
      error: (err: any) => {
        this.isLoading.set(false);
        const errorMsg = err.error?.error?.message || err.error?.message || 'Error al actualizar el perfil';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMsg,
          confirmButtonColor: '#007782'
        });
      }
    });
  }
}
