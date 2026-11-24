import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LikeService } from '../../core/services/like.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../products/components/product-card/product-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <section class="relative w-full pb-24 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-stone-100">
      <div class="max-w-7xl mx-auto pt-4">

        <!-- Cabecera -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full mb-2">
              <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1">favorite</span>
              <span>Mis Favoritos</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-stone-100">
              Prendas que te gustan
            </h1>
            <p class="text-sm text-slate-600 dark:text-stone-400 mt-1">
              Accede a cada prenda para ver sus detalles o gestionar tu like.
            </p>
          </div>

          <a
            routerLink="/products"
            class="inline-flex items-center gap-2 self-start sm:self-auto bg-white/80 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-900 backdrop-blur-md border border-white/70 dark:border-stone-800 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-700 dark:text-stone-200 hover:text-[#007782] dark:hover:text-[#4db8c4] shadow-2xs transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">storefront</span>
            <span>Explorar catálogo</span>
          </a>
        </div>

        <!-- Loading Skeleton -->
        @if (loading()) {
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
        } @else if (favorites().length === 0) {
          <!-- Estado vacío -->
          <div class="bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto shadow-sm mt-6">
            <div class="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 mx-auto flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-3xl">favorite_border</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-stone-100">
              Todavía no tienes favoritos
            </h2>
            <p class="text-sm text-slate-600 dark:text-stone-400 mt-2 mb-6 leading-relaxed">
              Explora el catálogo y pulsa el corazón dentro de la página de detalle de cualquier prenda para guardarla aquí.
            </p>
            <a
              routerLink="/products"
              class="inline-flex items-center gap-2 bg-[#007782] hover:bg-[#005f69] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-sm transition-all"
            >
              <span class="material-symbols-outlined text-[18px]">explore</span>
              <span>Descubrir prendas</span>
            </a>
          </div>
        } @else {
          <!-- Grid de favoritos -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            @for (product of favorites(); track product.id || product._id) {
              <app-product-card [product]="product"></app-product-card>
            }
          </div>
        }

      </div>
    </section>
  `,
})
export class FavoritesComponent implements OnInit {
  private likeService = inject(LikeService);

  favorites = signal<Product[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.loading.set(true);
    this.likeService.getMyFavorites().subscribe({
      next: (res) => {
        if (res.success && Array.isArray(res.data)) {
          this.favorites.set(res.data);
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
