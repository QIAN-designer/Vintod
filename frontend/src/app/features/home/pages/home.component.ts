import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HomeStore } from '../store/home.store';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink, CarouselComponent, NgxSkeletonLoaderModule],
  template: `
    <div class="relative w-full pb-20 px-4 sm:px-6 lg:px-8">

      <!-- Contenedor Principal Centrado -->
      <div class="relative z-10 max-w-7xl mx-auto space-y-10 pt-2">

        <!-- Estado de Error de Red / API -->
        @if (homeStore.error()) {
          <div class="bg-white/80 backdrop-blur-md border border-rose-200/80 rounded-3xl p-6 sm:p-8 text-center max-w-xl mx-auto shadow-sm">
            <span class="material-symbols-outlined text-4xl text-rose-500 mb-2">cloud_off</span>
            <h3 class="text-lg font-bold text-slate-800">No pudimos cargar algunos datos</h3>
            <p class="text-sm text-slate-600 mt-1 mb-4">{{ homeStore.error() }}</p>
            <button
              type="button"
              (click)="retryLoad()"
              class="inline-flex items-center gap-2 bg-[#007782] hover:bg-[#005f69] text-white font-semibold text-xs py-2.5 px-6 rounded-full transition-all cursor-pointer shadow-sm"
            >
              <span class="material-symbols-outlined text-[17px]">refresh</span>
              <span>Reintentar</span>
            </button>
          </div>
        }

        <!-- 3. Hero Banner (Distribución flex/grid con ilustración vectorial) -->
        <section class="bg-white/80 dark:bg-[#152125]/85 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-sm overflow-hidden relative transition-colors duration-300">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div class="md:col-span-7 flex flex-col gap-4 text-left">
              <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#007782] dark:text-[#2dd4bf] bg-[#007782]/10 dark:bg-[#2dd4bf]/15 px-3 py-1 rounded-full w-fit">
                <span class="material-symbols-outlined text-[15px]">eco</span>
                <span>Moda Circular & Sostenible</span>
              </span>

              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-stone-100 tracking-tight leading-[1.12]">
                Dale una segunda vida <br class="hidden sm:inline" />
                <span class="text-[#007782] dark:text-[#2dd4bf]">a tu ropa</span>
              </h1>

              <p class="text-base sm:text-lg text-slate-600 dark:text-stone-300 max-w-lg leading-relaxed">
                Compra y vende moda de segunda mano de forma segura. Descubre prendas únicas seleccionadas con protección al comprador incluida.
              </p>

              <div class="pt-2 flex flex-wrap items-center gap-3">
                <a
                  routerLink="/products/new"
                  class="bg-[#007782] dark:bg-[#00838f] hover:bg-[#005f69] dark:hover:bg-[#00929f] text-white font-semibold rounded-full px-6 py-2.5 shadow-md shadow-[#007782]/25 dark:shadow-black/30 hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span class="material-symbols-outlined text-[18px]">sell</span>
                  <span>Vender Ahora</span>
                </a>

                <a
                  routerLink="/products"
                  class="bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 text-slate-700 dark:text-stone-200 font-semibold rounded-full px-6 py-2.5 border border-slate-200/80 dark:border-white/10 shadow-2xs hover:shadow-xs transition-all inline-flex items-center gap-1.5"
                >
                  <span class="material-symbols-outlined text-[18px]">explore</span>
                  <span>Explorar Catálogo</span>
                </a>
              </div>
            </div>

            <!-- Ilustración Vectorial Editorial de Moda -->
            <div class="md:col-span-5 flex items-center justify-center relative">
              <div class="relative w-full max-w-[340px] aspect-4/3 rounded-2xl bg-gradient-to-tr from-[#007782]/15 dark:from-[#007782]/30 via-[#f5ebe0]/40 dark:via-[#1a262a] to-[#d97757]/20 dark:to-[#d97757]/30 p-6 flex flex-col items-center justify-center border border-white/80 dark:border-white/10 shadow-inner">
                <div class="w-24 h-24 rounded-full bg-[#007782] dark:bg-[#00838f] flex items-center justify-center text-white shadow-lg shadow-[#007782]/30 dark:shadow-black/40 mb-3 animate-pulse">
                  <span class="material-symbols-outlined text-5xl">checkroom</span>
                </div>
                <div class="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-stone-200 bg-white/90 dark:bg-[#141e22] px-3.5 py-1.5 rounded-full shadow-2xs border border-transparent dark:border-white/10">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>+14.000 prendas en circulación</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- 4. Sección 1 — Carrusel "Explorar por Categorías" -->
        <section class="bg-white/80 dark:bg-[#152125]/85 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-stone-100 tracking-tight">
                Explorar por Categorías
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-stone-400 mt-0.5">
                Encuentra tu estilo por colecciones seleccionadas
              </p>
            </div>
            <a
              routerLink="/products"
              class="text-xs sm:text-sm font-bold text-[#007782] dark:text-[#2dd4bf] hover:underline flex items-center gap-0.5"
            >
              <span>Ver todas</span>
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </a>
          </div>

          <!-- Skeleton Loader para Categorías -->
          @if (homeStore.loading() && homeStore.categories().length === 0) {
            <div class="flex items-center gap-6 overflow-hidden py-2">
              @for (item of [1, 2, 3, 4, 5, 6]; track item) {
                <div class="flex flex-col items-center gap-2 shrink-0">
                  <ngx-skeleton-loader
                    [theme]="{ width: '96px', height: '96px', 'border-radius': '9999px', 'background-color': '#203035' }"
                  ></ngx-skeleton-loader>
                  <ngx-skeleton-loader
                    [theme]="{ width: '60px', height: '14px', 'border-radius': '6px', 'background-color': '#203035' }"
                  ></ngx-skeleton-loader>
                </div>
              }
            </div>
          } @else {
            <!-- Carrusel con Proyección ng-content y Deep-linking -->
            <app-carousel [scrollStep]="320">
              @for (cat of homeStore.categories(); track cat.id || cat.slug) {
                <a
                  [routerLink]="['/products']"
                  [queryParams]="{ category: cat.slug || cat.name }"
                  class="group flex flex-col items-center gap-2.5 p-2 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all cursor-pointer shrink-0"
                >
                  <!-- Ítems circulares w-24 h-24 rounded-full con fondos de acento oscuros en Dark Mode -->
                  <div
                    class="w-24 h-24 rounded-full p-1 border-2 border-white dark:border-[#203238] shadow-sm flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 bg-slate-100 dark:bg-[#1a282d]"
                  >
                    @if (cat.img) {
                      <img
                        [src]="cat.img"
                        [alt]="cat.name"
                        class="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                      />
                    } @else {
                      <span class="material-symbols-outlined text-3xl text-slate-700 dark:text-stone-300">
                        {{ getCategoryIcon(cat.slug || cat.name) }}
                      </span>
                    }
                  </div>
                  <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-stone-200 group-hover:text-[#007782] dark:group-hover:text-[#2dd4bf] transition-colors text-center">
                    {{ cat.name }}
                  </span>
                </a>
              }
            </app-carousel>
          }
        </section>

        <!-- 5. Sección Inferior (Grid Asimétrico 2 Columnas en Desktop: lg:grid-cols-12) -->
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <!-- Columna Izquierda (lg:col-span-7) — Carrusel "Marcas Populares" -->
          <div class="lg:col-span-7 bg-white/80 dark:bg-[#152125]/85 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between transition-colors duration-300">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-stone-100 tracking-tight">
                  Marcas Populares
                </h2>
                <p class="text-xs sm:text-sm text-slate-500 dark:text-stone-400 mt-0.5">
                  Las firmas más deseadas de segunda mano
                </p>
              </div>
              <a
                routerLink="/products"
                class="text-xs sm:text-sm font-bold text-[#007782] dark:text-[#2dd4bf] hover:underline flex items-center gap-0.5"
              >
                <span>Ver catálogo</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </a>
            </div>

            <!-- Skeleton para Marcas -->
            @if (homeStore.loading() && homeStore.brands().length === 0) {
              <div class="flex gap-4 overflow-hidden py-2">
                @for (item of [1, 2, 3, 4]; track item) {
                  <ngx-skeleton-loader
                    [theme]="{ width: '130px', height: '110px', 'border-radius': '16px', 'background-color': '#203035' }"
                  ></ngx-skeleton-loader>
                }
              </div>
            } @else {
              <!-- Tarjetas cuadradas redondeadas con estética oscura tipo Figma -->
              <app-carousel [scrollStep]="280">
                @for (brand of homeStore.brands(); track brand.id || brand.slug) {
                  <a
                    [routerLink]="['/products']"
                    [queryParams]="{ brand: brand.slug || brand.name }"
                    class="shrink-0 w-32 sm:w-36 h-28 bg-[#f3dec9]/90 dark:bg-[#1b262a]/95 hover:bg-[#ebd0b6] dark:hover:bg-[#223035] border border-white/70 dark:border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md hover:scale-[1.03] transition-all cursor-pointer group"
                  >
                    <span class="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-stone-100 tracking-tight group-hover:text-[#007782] dark:group-hover:text-[#2dd4bf] transition-colors">
                      {{ brand.name }}
                    </span>
                    <span class="text-[11px] font-semibold text-slate-500 dark:text-stone-400 mt-1 flex items-center gap-0.5">
                      <span>Ver piezas</span>
                      <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </span>
                  </a>
                }
              </app-carousel>
            }
          </div>

          <!-- Columna Derecha (lg:col-span-5) — Carrusel "Vendedores Destacados" -->
          <div class="lg:col-span-5 bg-white/80 dark:bg-[#152125]/85 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between transition-colors duration-300">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-stone-100 tracking-tight">
                  Vendedores Destacados
                </h2>
                <p class="text-xs sm:text-sm text-slate-500 dark:text-stone-400 mt-0.5">
                  Comunidad con mejor reputación y envíos rápidos
                </p>
              </div>
            </div>

            <!-- Skeleton para Vendedores -->
            @if (homeStore.loading() && homeStore.topSellers().length === 0) {
              <div class="flex gap-4 overflow-hidden py-2">
                @for (item of [1, 2, 3]; track item) {
                  <ngx-skeleton-loader
                    [theme]="{ width: '150px', height: '170px', 'border-radius': '16px', 'background-color': '#203035' }"
                  ></ngx-skeleton-loader>
                }
              </div>
            } @else {
              <!-- Tarjetas verticales compactas oscuras con acento teal -->
              <app-carousel [scrollStep]="260">
                @for (seller of homeStore.topSellers(); track seller.id || seller.username) {
                  <div class="shrink-0 w-36 sm:w-40 bg-white/90 dark:bg-[#182428]/95 border border-slate-200/80 dark:border-white/10 rounded-2xl p-3.5 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-md transition-all">
                    
                    <!-- Avatar circular -->
                    <div class="relative">
                      <img
                        [src]="seller.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'"
                        [alt]="seller.username"
                        class="w-12 h-12 rounded-full object-cover ring-2 ring-[#007782]/20 dark:ring-[#2dd4bf]/30 shadow-xs"
                      />
                      <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-[#182428]"></span>
                    </div>

                    <!-- Datos del vendedor -->
                    <div class="my-2">
                      <span class="font-bold text-slate-900 dark:text-stone-100 text-xs block truncate max-w-[130px]">
                        &#64;{{ seller.username }}
                      </span>
                      <div class="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-500 mt-0.5">
                        <span class="material-symbols-outlined text-[13px]">star</span>
                        <span>{{ seller.ratingAverage | number:'1.1-1' }}</span>
                      </div>
                    </div>

                    <!-- Botón "Ver tienda" -->
                    <a
                      [routerLink]="['/products']"
                      [queryParams]="{ seller: seller.userId || seller.id }"
                      class="w-full py-1.5 px-3 bg-[#007782]/10 dark:bg-[#2dd4bf]/15 text-[#007782] dark:text-[#2dd4bf] hover:bg-[#007782] dark:hover:bg-[#2dd4bf] hover:text-white dark:hover:text-[#0d1416] rounded-full text-[11px] font-bold transition-all text-center cursor-pointer"
                    >
                      Ver tienda
                    </a>

                  </div>
                }
              </app-carousel>
            }
          </div>

        </section>

      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  homeStore = inject(HomeStore);

  ngOnInit(): void {
    this.homeStore.loadHomeData();
  }

  retryLoad(): void {
    this.homeStore.loadHomeData(true);
  }

  getCategoryIcon(slug: string): string {
    const s = slug.toLowerCase();
    if (s.includes('mujer')) return 'female';
    if (s.includes('hombre')) return 'male';
    if (s.includes('accesor')) return 'watch';
    if (s.includes('calzad') || s.includes('zapa')) return 'steps';
    if (s.includes('vint')) return 'history_edu';
    return 'category';
  }
}
