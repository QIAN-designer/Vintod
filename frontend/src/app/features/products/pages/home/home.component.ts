import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductsStore } from '../../../../core/store/products.store';
import { AuthStore } from '../../../../core/auth/auth.store';
import { AuthService } from '../../../../core/auth/auth.service';
import { CarouselComponent } from '../../../../shared/components/carousel/carousel.component';
import { CategoryCardComponent, CategoryCardItem } from '../../components/category-card/category-card.component';
import { LocationCardComponent, LocationItem } from '../../components/location-card/location-card.component';
import { HostCardComponent, HostItem } from '../../components/host-card/host-card.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductSkeletonComponent } from '../../components/product-skeleton/product-skeleton.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CarouselComponent,
    CategoryCardComponent,
    LocationCardComponent,
    HostCardComponent,
    ProductCardComponent,
    ProductSkeletonComponent,
    SearchBarComponent
  ],
  template: `
    <div class="min-h-screen bg-surface font-body-md text-on-surface flex flex-col">
      <!-- Top Navigation Header -->
      <header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div class="max-w-[1280px] mx-auto px-margin-desktop flex flex-col justify-between py-space-xs">
          <div class="flex items-center justify-between gap-space-lg pt-space-xs">
            <a routerLink="/" class="flex items-center gap-2 shrink-0">
              <span class="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold shadow-sm">
                <span class="material-symbols-outlined text-[20px]">shopping_bag</span>
              </span>
              <span class="font-headline-md text-headline-md tracking-tight text-primary font-extrabold">Vintod</span>
            </a>

            <div class="flex-1 max-w-xl px-space-sm">
              <app-search-bar
                placeholder="Buscar prendas, marcas o colecciones..."
                [searchTerm]="store.searchFilter()"
                (searchChange)="onQuickSearch($event)"
              ></app-search-bar>
            </div>

            <nav class="hidden lg:flex items-center gap-1 shrink-0">
              <a routerLink="/" class="px-space-md py-space-xs bg-surface-container-high text-on-surface font-label-lg text-label-lg rounded-full transition-all">
                Inicio
              </a>
              <a routerLink="/shop" class="px-space-md py-space-xs text-on-surface-variant hover:bg-surface-container-low font-label-lg text-label-lg rounded-full transition-all">
                Catálogo / Shop
              </a>
              <a routerLink="/admin/products" class="px-space-md py-space-xs font-label-lg text-label-lg text-primary hover:bg-surface-container-low rounded-full transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                <span>Panel Admin</span>
              </a>
            </nav>

            <div class="flex items-center gap-space-md shrink-0">
              <a
                routerLink="/products/new"
                class="flex items-center gap-1.5 bg-secondary-container text-on-secondary-container px-space-lg py-2 rounded-full font-label-lg text-label-lg shadow-sm hover:opacity-95 active:scale-95 transition-all"
              >
                <span class="material-symbols-outlined text-[18px]">add</span>
                <span>¡Vender ahora!</span>
              </a>

              <div class="relative pl-space-xs">
                @if (authStore.isAuthenticated()) {
                  <button
                    type="button"
                    (click)="toggleUserMenu()"
                    class="flex items-center gap-2 p-1 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    <img
                      [src]="authStore.avatar()"
                      [alt]="authStore.username()"
                      class="w-9 h-9 rounded-full object-cover ring-2 ring-primary/30"
                    />
                    <span class="material-symbols-outlined text-[18px] text-outline hidden sm:block">expand_more</span>
                  </button>
                  @if (isUserMenuOpen()) {
                    <div class="fixed inset-0 z-40" (click)="isUserMenuOpen.set(false)"></div>
                    <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-2xl shadow-xl py-2 bg-surface-container-lowest ring-1 ring-outline-variant/30 z-50 divide-y divide-surface-container">
                      <div class="px-4 py-3">
                        <p class="text-xs text-outline">Conectado como</p>
                        <p class="text-sm font-bold text-on-surface truncate">{{ authStore.username() }}</p>
                      </div>
                      <div class="py-1">
                        <a routerLink="/profile" class="flex items-center gap-2.5 px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low">
                          <span class="material-symbols-outlined text-[18px] text-outline">person</span>
                          <span>Mi Perfil</span>
                        </a>
                        <a routerLink="/shop" class="flex items-center gap-2.5 px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low">
                          <span class="material-symbols-outlined text-[18px] text-outline">storefront</span>
                          <span>Ir a Shop</span>
                        </a>
                      </div>
                      <div class="py-1">
                        <button
                          type="button"
                          (click)="handleLogout()"
                          class="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-error hover:bg-error-container/20 cursor-pointer"
                        >
                          <span class="material-symbols-outlined text-[18px] text-error">logout</span>
                          <span>Cerrar sesión</span>
                        </button>
                      </div>
                    </div>
                  }
                } @else {
                  <div class="flex items-center gap-2">
                    <a routerLink="/login" class="px-3.5 py-1.5 rounded-full font-label-md text-label-md font-semibold text-on-surface hover:bg-surface-container-low">
                      Iniciar sesión
                    </a>
                    <a routerLink="/register" class="px-4 py-1.5 rounded-full font-label-md text-label-md font-bold bg-primary text-on-primary shadow-sm">
                      Registrarse
                    </a>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="w-full pt-24 bg-surface flex-1">
        <div class="max-w-[1280px] mx-auto px-margin-desktop py-space-lg flex flex-col gap-space-xl">

          <!-- Hero Banner -->
          <section class="relative w-full rounded-2xl bg-gradient-to-r from-surface-container via-surface-container-low to-primary-fixed/30 p-space-lg md:p-space-xl overflow-hidden shadow-sm">
            <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
              <div class="lg:col-span-7 flex flex-col gap-space-md">
                <div class="inline-flex items-center gap-2 bg-surface px-space-md py-1 rounded-full shadow-sm w-fit">
                  <span class="inline-block w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                  <span class="font-label-md text-label-md text-on-surface uppercase tracking-wider">Moda Circular Verificada</span>
                </div>
                <h1 class="font-display-hero text-display-hero text-on-surface leading-tight tracking-tight">
                  Dale una segunda vida a tu ropa favorita.
                </h1>
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Explora categorías curadas, hubs de moda circular por ciudades y los armarios de nuestras mejores vendedoras y anfitrionas.
                </p>
                <div class="flex flex-wrap items-center gap-space-md pt-space-xs">
                  <a
                    routerLink="/shop"
                    class="bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-space-xl py-3 rounded-full transition-all shadow-md flex items-center gap-2"
                  >
                    <span class="material-symbols-outlined text-[20px]">manage_search</span>
                    <span>Explorar Tienda (Shop)</span>
                  </a>
                  <a
                    routerLink="/products/new"
                    class="bg-surface hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg px-space-lg py-3 rounded-full transition-all shadow-sm flex items-center gap-2"
                  >
                    <span class="material-symbols-outlined text-[18px]">add_circle</span>
                    <span>Subir prenda gratis</span>
                  </a>
                </div>
              </div>

              <div class="lg:col-span-5 flex flex-col gap-space-md">
                <div class="bg-surface/95 backdrop-blur-md rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-sm">
                  <div class="flex items-center justify-between">
                    <span class="font-label-md text-label-md text-on-surface-variant">Impacto colectivo en tiempo real</span>
                    <span class="material-symbols-outlined text-secondary text-[22px]">eco</span>
                  </div>
                  <div class="flex items-baseline gap-2">
                    <span class="font-display-hero text-headline-lg text-secondary font-extrabold tracking-tight">
                      {{ ecoCounter().toLocaleString('es-ES') }}
                    </span>
                    <span class="font-headline-sm text-headline-sm text-on-surface">kg de CO₂</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-outline">
                    Ahorrados esta semana por compras de segunda mano en Vintod España.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- 1. Carousel de Categorías (Categories Card) -->
          <section class="w-full">
            <app-carousel
              badge="Colecciones"
              badgeIcon="category"
              title="Explora por categorías clave"
              subtitle="Desliza y selecciona una categoría para filtrar directamente en la tienda"
              [scrollStep]="400"
            >
              @for (cat of categories; track cat.id) {
                <app-category-card
                  [category]="cat"
                  (selectCategory)="navigateToShopWithFilter({ category: $event })"
                ></app-category-card>
              }
            </app-carousel>
          </section>

          <!-- 2. Carousel de Locations / Hubs & Marcas (Locations Card) -->
          <section class="w-full">
            <app-carousel
              badge="Ciudades & Hubs"
              badgeIcon="location_on"
              title="Localizaciones y Hubs de Moda Circular"
              subtitle="Encuentra prendas y eventos de armario cerca de tu ciudad o marca favorita"
              [scrollStep]="480"
            >
              @for (loc of locations; track loc.id) {
                <app-location-card
                  [location]="loc"
                  (selectLocation)="navigateToShopWithFilter({ search: $event.slug || $event.name })"
                ></app-location-card>
              }
            </app-carousel>
          </section>

          <!-- 3. Carousel de Vendedoras / Anfitrionas (Hosts Card) -->
          <section class="w-full bg-surface-container-low rounded-2xl p-space-lg">
            <app-carousel
              badge="Vendedoras Pro & Hosts"
              badgeIcon="verified"
              title="Anfitrionas y armarios destacados"
              subtitle="Perfiles verificados con alta valoración y envíos en menos de 24 horas"
              [scrollStep]="420"
            >
              @for (host of featuredHosts; track host.id) {
                <app-host-card
                  [host]="host"
                  (selectHost)="navigateToShopWithFilter({ search: $event.name.split(' ')[0] })"
                ></app-host-card>
              }
            </app-carousel>
          </section>

          <!-- 4. Avance de Novedades Recientes con enlace a Shop -->
          <section class="w-full">
            <div class="flex items-end justify-between mb-4">
              <div>
                <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Últimas prendas añadidas</h2>
                <p class="font-body-sm text-body-sm text-outline">Recién publicadas en el catálogo</p>
              </div>
              <a
                routerLink="/shop"
                class="font-label-lg text-label-lg text-primary hover:underline flex items-center gap-1"
              >
                <span>Ver todo e ir a filtros avanzados</span>
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>

            @if (store.loading()) {
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-lg">
                @for (i of [1, 2, 3, 4]; track i) {
                  <app-product-skeleton></app-product-skeleton>
                }
              </div>
            } @else {
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-lg">
                @for (product of store.products().slice(0, 4); track product._id || product.id) {
                  <app-product-card [product]="product"></app-product-card>
                }
              </div>
            }
          </section>

        </div>
      </main>
    </div>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  store = inject(ProductsStore);
  authStore = inject(AuthStore);
  private authService = inject(AuthService);
  private router = inject(Router);

  isUserMenuOpen = signal(false);
  ecoCounter = signal(14280);
  private ecoIntervalId?: any;

  categories: CategoryCardItem[] = [
    {
      id: 'vestidos',
      name: 'Vestidos',
      count: '3.4k prendas',
      img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'zapatillas',
      name: 'Zapatillas',
      count: '2.8k pares',
      img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'chaquetas',
      name: 'Chaquetas',
      count: '1.9k abrigos',
      img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'bolsos',
      name: 'Bolsos',
      count: '890 piezas',
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'vintage',
      name: 'Vintage',
      count: '4.1k tesoros',
      img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'punto',
      name: 'Punto',
      count: '1.5k prendas',
      img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=80'
    }
  ];

  locations: LocationItem[] = [
    {
      id: 'loc-madrid',
      name: 'Madrid Centro',
      slug: 'Nike',
      country: 'España',
      subtitle: 'Hub Malasaña & Vintage',
      itemsCount: '1.2k prendas',
      img: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'loc-bcn',
      name: 'Barcelona Born',
      slug: 'Zara',
      country: 'España',
      subtitle: 'Archivo & Diseño Local',
      itemsCount: '980 prendas',
      img: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'loc-valencia',
      name: 'Valencia Ruzafa',
      slug: 'Carhartt',
      country: 'España',
      subtitle: 'Streetwear & Denim',
      itemsCount: '640 prendas',
      img: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'loc-paris',
      name: 'París Marais',
      slug: 'Sézane',
      country: 'Francia',
      subtitle: 'Chic Francés & Lino',
      itemsCount: '1.5k prendas',
      img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'loc-milano',
      name: 'Milán Navigli',
      slug: "Levi's",
      country: 'Italia',
      subtitle: 'Sastrería & Archivo',
      itemsCount: '720 prendas',
      img: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&auto=format&fit=crop&q=80'
    }
  ];

  featuredHosts: HostItem[] = [
    {
      id: 'h1',
      name: 'Andrea Silva',
      rating: '5.0',
      sales: 240,
      city: 'Madrid',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Armario minimalista escandinavo, linos franceses y prendas de Rouje, Arket y COS.',
      itemsCount: 14,
      isFollowing: false,
      previewImgs: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=300&auto=format&fit=crop&q=80'
      ]
    },
    {
      id: 'h2',
      name: 'Nico Archivist',
      rating: '4.9',
      sales: 312,
      city: 'Barcelona',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      bio: 'Especializado en archivo 90s, sudaderas universitarias USA originales y ropa de trabajo.',
      itemsCount: 28,
      isFollowing: false,
      previewImgs: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&auto=format&fit=crop&q=80'
      ]
    },
    {
      id: 'h3',
      name: 'Marta Atelier',
      rating: '5.0',
      sales: 185,
      city: 'Valencia',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
      bio: 'Accesorios de lujo, bolsos descatalogados y vestidos de invitada con etiqueta.',
      itemsCount: 9,
      isFollowing: false,
      previewImgs: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80'
      ]
    },
    {
      id: 'h4',
      name: 'Lucas Vintage Lab',
      rating: '4.8',
      sales: 154,
      city: 'Sevilla',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      bio: 'Chaquetas de cuero, denim japonés selvedge y zapatillas clásicas restauradas.',
      itemsCount: 19,
      isFollowing: false,
      previewImgs: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&auto=format&fit=crop&q=80'
      ]
    }
  ];

  ngOnInit() {
    this.store.fetchShopProducts();
    this.ecoIntervalId = setInterval(() => {
      if (Math.random() > 0.5) {
        this.ecoCounter.update(c => c + Math.floor(Math.random() * 3) + 1);
      }
    }, 4500);
  }

  ngOnDestroy() {
    if (this.ecoIntervalId) {
      clearInterval(this.ecoIntervalId);
    }
  }

  toggleUserMenu() {
    this.isUserMenuOpen.update(v => !v);
  }

  onQuickSearch(term: string) {
    if (term.trim()) {
      this.navigateToShopWithFilter({ search: term.trim() });
    }
  }

  navigateToShopWithFilter(queryParams: Record<string, any>) {
    this.router.navigate(['/shop'], { queryParams });
  }

  handleLogout(): void {
    this.isUserMenuOpen.set(false);
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
        this.router.navigate(['/login']);
      }
    });
  }
}
