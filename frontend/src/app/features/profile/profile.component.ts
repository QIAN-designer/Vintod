import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthStore } from '../../core/auth/auth.store';
import { ProfileService, ProfileApiResponse } from '../../core/services/profile.service';
import { ProductService } from '../../core/services/product.service';
import { ReviewService, UserReview } from '../../core/services/review.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../products/components/product-card/product-card.component';

type ProfileTab = 'listings' | 'reviews';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DatePipe, DecimalPipe, ProductCardComponent],
  template: `
    <div class="max-w-6xl mx-auto py-8 pb-24 px-4 sm:px-6 lg:px-8 space-y-6 text-slate-900 dark:text-stone-100">

      <!-- Encabezado de Perfil -->
      <div class="bg-white/85 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-white/70 dark:border-stone-800 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
        <div class="relative shrink-0">
          <img
            [src]="authStore.avatar()"
            [alt]="authStore.username()"
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-[#007782]/25 shadow-sm"
          />
          <span class="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full"></span>
        </div>

        <div class="flex-1 text-center md:text-left space-y-2.5 w-full">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-3">
            <div>
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-stone-100 tracking-tight">
                  &#64;{{ authStore.username() }}
                </h1>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#007782]/10 dark:bg-[#007782]/25 text-[#007782] dark:text-[#4db8c4] uppercase tracking-wider">
                  {{ authStore.userRole() }}
                </span>
              </div>
              <p class="text-sm text-slate-500 dark:text-stone-400 mt-0.5">{{ authStore.user()?.email }}</p>
            </div>

            <!-- Botón desplegable "Editar perfil" -->
            <button
              type="button"
              (click)="toggleEditProfile()"
              [attr.aria-expanded]="isEditingProfile()"
              class="inline-flex items-center justify-center gap-2 self-center md:self-start px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer shadow-2xs"
              [ngClass]="
                isEditingProfile()
                  ? 'bg-slate-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-slate-800 dark:hover:bg-stone-200'
                  : 'bg-[#007782] hover:bg-[#005f69] text-white'
              "
            >
              <span class="material-symbols-outlined text-[18px]">
                {{ isEditingProfile() ? 'close' : 'edit' }}
              </span>
              <span>{{ isEditingProfile() ? 'Cerrar edición' : 'Editar perfil' }}</span>
            </button>
          </div>

          <p class="text-sm text-slate-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            {{ currentBio() || 'Sin biografía aún. Pulsa en "Editar perfil" para contar tu estilo y detalles de envío.' }}
          </p>

          <!-- Métricas y ubicación -->
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs font-semibold text-slate-600 dark:text-stone-300">
            @if (currentCity()) {
              <span class="inline-flex items-center gap-1.5 bg-slate-100/80 dark:bg-stone-800 px-3 py-1.5 rounded-full">
                <span class="material-symbols-outlined text-[15px] text-[#007782] dark:text-[#4db8c4]">location_on</span>
                <span>{{ currentCity() }}@if (currentCountry()) {, {{ currentCountry() }}}</span>
              </span>
            }

            <span class="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-full">
              <span class="material-symbols-outlined text-[15px] text-amber-500" style="font-variation-settings: 'FILL' 1">star</span>
              @if (ratingCount() > 0) {
                <span><strong>{{ ratingAverage() | number:'1.1-1' }}</strong>/5 ({{ ratingCount() }} {{ ratingCount() === 1 ? 'valoración' : 'valoraciones' }})</span>
              } @else {
                <span>Sin valoraciones aún</span>
              }
            </span>

            <span class="inline-flex items-center gap-1.5 bg-slate-100/80 dark:bg-stone-800 px-3 py-1.5 rounded-full">
              <span class="material-symbols-outlined text-[15px] text-[#007782] dark:text-[#4db8c4]">checkroom</span>
              <span><strong>{{ myProducts().length }}</strong> {{ myProducts().length === 1 ? 'anuncio publicado' : 'anuncios publicados' }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Apartado Desplegable de Edición de Perfil -->
      @if (isEditingProfile()) {
        <div class="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-3xl border border-[#007782]/25 dark:border-[#007782]/40 p-6 sm:p-8 shadow-md transition-all">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-stone-800 pb-4 mb-6">
            <div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-stone-100">Editar Información Pública</h2>
              <p class="text-xs text-slate-500 dark:text-stone-400 mt-0.5">
                Estos datos serán visibles por otros compradores y vendedores en el marketplace.
              </p>
            </div>
            <button
              type="button"
              (click)="cancelEditProfile()"
              class="w-9 h-9 rounded-full hover:bg-slate-100 dark:hover:bg-stone-800 flex items-center justify-center text-slate-500 dark:text-stone-400 cursor-pointer transition-colors"
              aria-label="Cerrar formulario"
            >
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Username -->
              <div>
                <label for="username" class="block text-xs font-semibold text-slate-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  type="text"
                  formControlName="username"
                  class="block w-full px-3.5 py-2.5 text-sm bg-white dark:bg-stone-800 text-slate-900 dark:text-stone-100 border border-slate-300 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-[#007782] focus:border-[#007782] focus:outline-none transition-colors"
                />
                @if (isFieldInvalid('username')) {
                  <p class="mt-1 text-xs text-rose-600 dark:text-rose-400">El nombre de usuario debe tener al menos 3 caracteres.</p>
                }
              </div>

              <!-- Ciudad -->
              <div>
                <label for="city" class="block text-xs font-semibold text-slate-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Ciudad
                </label>
                <input
                  id="city"
                  type="text"
                  formControlName="city"
                  placeholder="Madrid, Barcelona, Valencia..."
                  class="block w-full px-3.5 py-2.5 text-sm bg-white dark:bg-stone-800 text-slate-900 dark:text-stone-100 border border-slate-300 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-[#007782] focus:border-[#007782] focus:outline-none transition-colors"
                />
              </div>

              <!-- País -->
              <div>
                <label for="country" class="block text-xs font-semibold text-slate-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  País
                </label>
                <input
                  id="country"
                  type="text"
                  formControlName="country"
                  placeholder="España"
                  class="block w-full px-3.5 py-2.5 text-sm bg-white dark:bg-stone-800 text-slate-900 dark:text-stone-100 border border-slate-300 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-[#007782] focus:border-[#007782] focus:outline-none transition-colors"
                />
              </div>

              <!-- Código Postal -->
              <div>
                <label for="postalCode" class="block text-xs font-semibold text-slate-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Código Postal
                </label>
                <input
                  id="postalCode"
                  type="text"
                  formControlName="postalCode"
                  placeholder="28001"
                  class="block w-full px-3.5 py-2.5 text-sm bg-white dark:bg-stone-800 text-slate-900 dark:text-stone-100 border border-slate-300 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-[#007782] focus:border-[#007782] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <!-- URL Avatar -->
            <div>
              <label for="avatarUrl" class="block text-xs font-semibold text-slate-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                URL Foto de perfil / Avatar
              </label>
              <input
                id="avatarUrl"
                type="url"
                formControlName="avatarUrl"
                placeholder="https://images.unsplash.com/photo-..."
                class="block w-full px-3.5 py-2.5 text-sm bg-white dark:bg-stone-800 text-slate-900 dark:text-stone-100 border border-slate-300 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-[#007782] focus:border-[#007782] focus:outline-none transition-colors"
              />
            </div>

            <!-- Biografía -->
            <div>
              <label for="bio" class="block text-xs font-semibold text-slate-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Biografía / Sobre ti
              </label>
              <textarea
                id="bio"
                rows="3"
                formControlName="bio"
                placeholder="Describe tu estilo, condiciones de envío o marcas favoritas..."
                class="block w-full px-3.5 py-2.5 text-sm bg-white dark:bg-stone-800 text-slate-900 dark:text-stone-100 border border-slate-300 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-[#007782] focus:border-[#007782] focus:outline-none transition-colors"
              ></textarea>
            </div>

            <!-- Botones de Acción -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-stone-800">
              <button
                type="button"
                (click)="cancelEditProfile()"
                class="px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-stone-300 hover:bg-slate-100 dark:hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                [disabled]="isLoading() || profileForm.invalid"
                class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#007782] hover:bg-[#005f69] rounded-full shadow-xs disabled:opacity-50 transition-all cursor-pointer"
              >
                @if (isLoading()) {
                  <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Guardando...</span>
                } @else {
                  <span class="material-symbols-outlined text-[18px]">check</span>
                  <span>Guardar cambios</span>
                }
              </button>
            </div>
          </form>
        </div>
      }

      <!-- Navegación por Pestañas: Mis anuncios | Valoraciones -->
      <div class="flex items-center gap-2 bg-white/75 dark:bg-stone-900/75 backdrop-blur-md p-1.5 rounded-full border border-white/70 dark:border-stone-800 w-fit shadow-2xs">
        <button
          type="button"
          (click)="activeTab.set('listings')"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer"
          [ngClass]="
            activeTab() === 'listings'
              ? 'bg-[#007782] text-white shadow-xs'
              : 'text-slate-600 dark:text-stone-300 hover:text-slate-900 dark:hover:text-stone-100'
          "
        >
          <span class="material-symbols-outlined text-[18px]">checkroom</span>
          <span>Mis anuncios</span>
          <span
            class="px-2 py-0.5 rounded-full text-[11px] font-extrabold"
            [ngClass]="activeTab() === 'listings' ? 'bg-white/20 text-white' : 'bg-slate-200/80 dark:bg-stone-800 text-slate-700 dark:text-stone-300'"
          >
            {{ myProducts().length }}
          </span>
        </button>

        <button
          type="button"
          (click)="activeTab.set('reviews')"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer"
          [ngClass]="
            activeTab() === 'reviews'
              ? 'bg-[#007782] text-white shadow-xs'
              : 'text-slate-600 dark:text-stone-300 hover:text-slate-900 dark:hover:text-stone-100'
          "
        >
          <span class="material-symbols-outlined text-[18px]">star</span>
          <span>Valoraciones</span>
          <span
            class="px-2 py-0.5 rounded-full text-[11px] font-extrabold"
            [ngClass]="activeTab() === 'reviews' ? 'bg-white/20 text-white' : 'bg-slate-200/80 dark:bg-stone-800 text-slate-700 dark:text-stone-300'"
          >
            {{ ratingCount() }}
          </span>
        </button>
      </div>

      <!-- APARTADO 1: MIS ANUNCIOS -->
      @if (activeTab() === 'listings') {
        <section class="space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-xl font-extrabold text-slate-900 dark:text-stone-100">Mis anuncios publicados</h2>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-stone-400">
                Gestiona y revisa todas las prendas que tienes publicadas en Vintod.
              </p>
            </div>
            <a
              routerLink="/products/new"
              class="inline-flex items-center gap-1.5 self-start sm:self-auto bg-[#007782] hover:bg-[#005f69] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-xs transition-all"
            >
              <span class="material-symbols-outlined text-[18px]">add</span>
              <span>Publicar prenda</span>
            </a>
          </div>

          @if (loadingProducts()) {
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              @for (item of [1, 2, 3, 4]; track item) {
                <div class="bg-white/80 dark:bg-stone-900/80 border border-white/60 dark:border-stone-800 rounded-3xl overflow-hidden animate-pulse">
                  <div class="aspect-[3/4] bg-slate-200 dark:bg-stone-800"></div>
                  <div class="p-4 space-y-2.5">
                    <div class="h-3 w-1/3 bg-slate-200 dark:bg-stone-700 rounded"></div>
                    <div class="h-4 w-3/4 bg-slate-200 dark:bg-stone-700 rounded"></div>
                    <div class="h-5 w-1/4 bg-slate-200 dark:bg-stone-700 rounded"></div>
                  </div>
                </div>
              }
            </div>
          } @else if (myProducts().length === 0) {
            <div class="bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto shadow-sm">
              <div class="w-16 h-16 rounded-full bg-[#007782]/10 dark:bg-[#007782]/25 text-[#007782] dark:text-[#4db8c4] mx-auto flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-3xl">checkroom</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-stone-100">Aún no tienes anuncios publicados</h3>
              <p class="text-sm text-slate-600 dark:text-stone-400 mt-2 mb-6">
                Sube tu primera prenda para empezar a vender en el marketplace.
              </p>
              <a
                routerLink="/products/new"
                class="inline-flex items-center gap-2 bg-[#007782] hover:bg-[#005f69] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-sm transition-all"
              >
                <span class="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Publicar mi primera prenda</span>
              </a>
            </div>
          } @else {
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              @for (product of myProducts(); track product.id || product._id) {
                <div class="relative group/card">
                  <app-product-card [product]="product"></app-product-card>
                  <a
                    [routerLink]="['/products', product.id || product._id, 'edit']"
                    class="absolute top-3 right-3 z-20 inline-flex items-center gap-1 bg-white/90 dark:bg-stone-900/90 hover:bg-[#007782] hover:text-white text-slate-700 dark:text-stone-200 border border-white/80 dark:border-stone-700 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs backdrop-blur-md transition-all"
                    title="Editar anuncio"
                  >
                    <span class="material-symbols-outlined text-[14px]">edit</span>
                    <span>Editar</span>
                  </a>
                </div>
              }
            </div>
          }
        </section>
      }

      <!-- APARTADO 2: VALORACIONES -->
      @if (activeTab() === 'reviews') {
        <section class="space-y-6">
          <div>
            <h2 class="text-xl font-extrabold text-slate-900 dark:text-stone-100">Valoraciones recibidas</h2>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-stone-400">
              Opiniones que otros usuarios han dejado sobre tu perfil y la media calculada automáticamente.
            </p>
          </div>

          @if (loadingReviews()) {
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
              <div class="lg:col-span-4 h-56 bg-white/80 dark:bg-stone-900/80 rounded-3xl border border-white/60 dark:border-stone-800"></div>
              <div class="lg:col-span-8 space-y-4">
                <div class="h-28 bg-white/80 dark:bg-stone-900/80 rounded-2xl border border-white/60 dark:border-stone-800"></div>
                <div class="h-28 bg-white/80 dark:bg-stone-900/80 rounded-2xl border border-white/60 dark:border-stone-800"></div>
              </div>
            </div>
          } @else {
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              <!-- Tarjeta de Media de Valoraciones -->
              <div class="lg:col-span-4 bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-5">
                <div class="text-center">
                  <p class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-stone-400">
                    Media global
                  </p>
                  <div class="mt-2 flex items-baseline justify-center gap-1">
                    <span class="text-5xl font-black text-slate-900 dark:text-stone-100 tabular-nums">
                      {{ ratingCount() > 0 ? (ratingAverage() | number:'1.1-1') : '0.0' }}
                    </span>
                    <span class="text-base font-bold text-slate-400 dark:text-stone-500">/ 5</span>
                  </div>

                  <!-- Estrellas visuales de la media -->
                  <div class="flex items-center justify-center gap-1 mt-2">
                    @for (star of starScale; track star) {
                      <span
                        class="material-symbols-outlined text-[22px]"
                        [ngClass]="star <= roundedAverage() ? 'text-amber-400' : 'text-slate-300 dark:text-stone-700'"
                        [style.font-variation-settings]="star <= roundedAverage() ? &quot;'FILL' 1&quot; : &quot;'FILL' 0&quot;"
                      >
                        star
                      </span>
                    }
                  </div>

                  <p class="text-xs text-slate-500 dark:text-stone-400 mt-2">
                    Basada en <strong>{{ ratingCount() }}</strong> {{ ratingCount() === 1 ? 'valoración' : 'valoraciones' }}
                  </p>
                </div>

                <!-- Distribución por estrellas (5 -> 1) -->
                <div class="space-y-2 pt-3 border-t border-slate-100 dark:border-stone-800">
                  @for (star of starBreakdownOrder; track star) {
                    <div class="flex items-center gap-2.5 text-xs">
                      <span class="w-8 font-bold text-slate-600 dark:text-stone-300 inline-flex items-center gap-0.5 shrink-0">
                        {{ star }}
                        <span class="material-symbols-outlined text-[13px] text-amber-400" style="font-variation-settings: 'FILL' 1">star</span>
                      </span>
                      <div class="flex-1 h-2 bg-slate-100 dark:bg-stone-800 rounded-full overflow-hidden">
                        <div
                          class="h-full bg-amber-400 rounded-full transition-all duration-300"
                          [style.width.%]="getStarPercentage(star)"
                        ></div>
                      </div>
                      <span class="w-6 text-right font-semibold text-slate-500 dark:text-stone-400 tabular-nums">
                        {{ ratingDistribution()[star] || 0 }}
                      </span>
                    </div>
                  }
                </div>
              </div>

              <!-- Listado de Valoraciones -->
              <div class="lg:col-span-8 space-y-4">
                @if (reviews().length === 0) {
                  <div class="bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-3xl p-10 text-center shadow-sm">
                    <div class="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-500 mx-auto flex items-center justify-center mb-3">
                      <span class="material-symbols-outlined text-3xl">reviews</span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 dark:text-stone-100">
                      Todavía no has recibido valoraciones
                    </h3>
                    <p class="text-sm text-slate-500 dark:text-stone-400 mt-1.5 max-w-md mx-auto">
                      Cuando otros usuarios te valoren en Vintod, sus puntuaciones y comentarios aparecerán aquí junto con tu media.
                    </p>
                  </div>
                } @else {
                  @for (review of reviews(); track review.id) {
                    <article class="bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-2xl p-5 shadow-2xs space-y-3">
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex items-center gap-3 min-w-0">
                          <img
                            [src]="review.author.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'"
                            [alt]="review.author.username"
                            class="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-stone-800 shrink-0"
                          />
                          <div class="min-w-0">
                            <p class="text-sm font-bold text-slate-900 dark:text-stone-100 truncate">
                              &#64;{{ review.author.username }}
                            </p>
                            <p class="text-xs text-slate-400 dark:text-stone-400">
                              {{ review.createdAt | date:'dd MMM yyyy' }}
                              @if (review.author.city) {
                                <span> • {{ review.author.city }}</span>
                              }
                            </p>
                          </div>
                        </div>

                        <div class="flex items-center gap-0.5 shrink-0" [attr.aria-label]="review.rating + ' de 5 estrellas'">
                          @for (star of starScale; track star) {
                            <span
                              class="material-symbols-outlined text-[18px]"
                              [ngClass]="star <= review.rating ? 'text-amber-400' : 'text-slate-300 dark:text-stone-700'"
                              [style.font-variation-settings]="star <= review.rating ? &quot;'FILL' 1&quot; : &quot;'FILL' 0&quot;"
                            >
                              star
                            </span>
                          }
                        </div>
                      </div>

                      @if (review.comment) {
                        <p class="text-sm text-slate-600 dark:text-stone-300 leading-relaxed">
                          {{ review.comment }}
                        </p>
                      }
                    </article>
                  }
                }
              </div>

            </div>
          }
        </section>
      }

    </div>
  `
})
export class ProfilePageComponent implements OnInit {
  authStore = inject(AuthStore);
  private profileService = inject(ProfileService);
  private productService = inject(ProductService);
  private reviewService = inject(ReviewService);
  private fb = inject(FormBuilder);

  readonly starScale = [1, 2, 3, 4, 5];
  readonly starBreakdownOrder = [5, 4, 3, 2, 1];

  activeTab = signal<ProfileTab>('listings');
  isEditingProfile = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  // Datos de perfil
  private lastSavedProfile: any = null;
  currentBio = signal('');
  currentCity = signal('');
  currentCountry = signal('España');

  // Mis anuncios
  myProducts = signal<Product[]>([]);
  loadingProducts = signal<boolean>(true);

  // Valoraciones
  reviews = signal<UserReview[]>([]);
  loadingReviews = signal<boolean>(true);
  ratingAverage = signal<number>(0);
  ratingCount = signal<number>(0);
  ratingDistribution = signal<Record<number, number>>({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  roundedAverage = computed(() => Math.round(this.ratingAverage()));

  profileForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    city: [''],
    country: ['España'],
    postalCode: [''],
    avatarUrl: [''],
    bio: ['']
  });

  ngOnInit(): void {
    const user = this.authStore.user();
    if (user?.profile) {
      this.populateForm(user.profile);
    }

    this.profileService.getMyProfile().subscribe({
      next: (res: ProfileApiResponse) => {
        if (res.success && res.data) {
          this.populateForm(res.data);
        }
      },
      error: () => {}
    });

    if (user?.id) {
      this.loadMyProducts(user.id);
    } else {
      this.loadingProducts.set(false);
    }

    this.loadMyReviews();
  }

  toggleEditProfile(): void {
    if (this.isEditingProfile()) {
      this.cancelEditProfile();
    } else {
      if (this.lastSavedProfile) {
        this.populateForm(this.lastSavedProfile);
      }
      this.isEditingProfile.set(true);
    }
  }

  cancelEditProfile(): void {
    if (this.lastSavedProfile) {
      this.populateForm(this.lastSavedProfile);
    }
    this.isEditingProfile.set(false);
  }

  getStarPercentage(star: number): number {
    const total = this.ratingCount();
    if (!total) return 0;
    const count = this.ratingDistribution()[star] || 0;
    return Math.round((count / total) * 100);
  }

  private loadMyProducts(userId: string): void {
    this.loadingProducts.set(true);
    this.productService.getProducts({ sellerId: userId, limit: 100 }).subscribe({
      next: (res) => {
        this.myProducts.set(res.data || []);
        this.loadingProducts.set(false);
      },
      error: () => {
        this.loadingProducts.set(false);
      }
    });
  }

  private loadMyReviews(): void {
    this.loadingReviews.set(true);
    this.reviewService.getMyReviews().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.reviews.set(res.data.reviews || []);
          this.ratingAverage.set(res.data.ratingAverage ?? 0);
          this.ratingCount.set(res.data.ratingCount ?? 0);
          this.ratingDistribution.set(
            res.data.distribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
          );
        }
        this.loadingReviews.set(false);
      },
      error: () => {
        this.loadingReviews.set(false);
      }
    });
  }

  private populateForm(p: any): void {
    this.lastSavedProfile = p;
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
          this.isEditingProfile.set(false);

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
