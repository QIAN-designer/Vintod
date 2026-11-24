import { Component, OnInit, inject, Input, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { AuthStore } from '../../../../core/auth/auth.store';
import { ProductLikeButtonComponent } from '../../components/product-like-button/product-like-button.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import Swal from 'sweetalert2';

export interface ProductDetailItem {
  id: string;
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  price: number;
  condition: string;
  size: string;
  color?: string;
  stock?: number;
  status?: string;
  likesCount?: number;
  createdAt?: string | Date;
  sellerId?: string;
  brand: {
    id?: string;
    name: string;
    slug?: string;
    logoUrl?: string;
  };
  category?: {
    id?: string;
    name: string;
    slug?: string;
  };
  seller: {
    id: string;
    email?: string;
    username: string;
    avatarUrl?: string;
    ratingAverage: number;
    ratingCount?: number;
    city?: string;
  };
  images: Array<{
    id?: string;
    url: string;
    altText?: string;
    isCover?: boolean;
    sortOrder?: number;
  }>;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DecimalPipe, RouterLink, NgxSkeletonLoaderModule, ProductLikeButtonComponent],
  template: `
    <div class="relative w-full pb-24 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-stone-100 transition-colors duration-300">

      <!-- Contenedor central -->
      <div class="relative z-10 max-w-6xl mx-auto pt-4">

        <!-- Breadcrumbs / Navegación superior hacia catálogo -->
        <nav class="mb-6 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600 dark:text-stone-300">
          <a
            routerLink="/products"
            class="inline-flex items-center gap-2 bg-white/70 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-900 backdrop-blur-md border border-white/70 dark:border-stone-800 px-4 py-2 rounded-full shadow-2xs text-slate-700 dark:text-stone-200 hover:text-[#007782] dark:hover:text-[#4db8c4] transition-all cursor-pointer"
          >
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Volver al catálogo</span>
          </a>

          <div class="flex items-center gap-2">
            @if (product(); as p) {
              @if (isOwner() || authStore.isAdmin()) {
                <a
                  [routerLink]="['/products', p.id, 'edit']"
                  class="inline-flex items-center gap-1.5 bg-white/80 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-900 text-slate-700 dark:text-stone-200 hover:text-[#007782] dark:hover:text-[#4db8c4] border border-white/80 dark:border-stone-800 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs"
                >
                  <span class="material-symbols-outlined text-[16px]">edit</span>
                  <span>Editar prenda</span>
                </a>
              }
            }
          </div>
        </nav>

        <!-- Skeleton Loader mientras carga -->
        @if (loading()) {
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <!-- Skeleton Galería -->
            <div class="lg:col-span-6 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-white/60 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <div class="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-stone-800 mb-4 animate-pulse"></div>
              <div class="flex justify-center gap-3">
                <div class="w-16 h-16 rounded-xl bg-slate-200 dark:bg-stone-700 animate-pulse"></div>
                <div class="w-16 h-16 rounded-xl bg-slate-200 dark:bg-stone-700 animate-pulse"></div>
                <div class="w-16 h-16 rounded-xl bg-slate-200 dark:bg-stone-700 animate-pulse"></div>
              </div>
            </div>

            <!-- Skeleton Información -->
            <div class="lg:col-span-6 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-white/60 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-4">
              <div class="h-8 bg-slate-200 dark:bg-stone-700 rounded-lg w-3/4 animate-pulse"></div>
              <div class="h-7 bg-slate-200 dark:bg-stone-700 rounded-lg w-1/3 animate-pulse"></div>
              <div class="flex gap-2 my-2">
                <div class="h-8 w-24 bg-slate-200 dark:bg-stone-700 rounded-full animate-pulse"></div>
                <div class="h-8 w-28 bg-slate-200 dark:bg-stone-700 rounded-full animate-pulse"></div>
                <div class="h-8 w-24 bg-slate-200 dark:bg-stone-700 rounded-full animate-pulse"></div>
              </div>
              <div class="space-y-2 my-4">
                <div class="h-4 bg-slate-200 dark:bg-stone-700 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-slate-200 dark:bg-stone-700 rounded w-5/6 animate-pulse"></div>
                <div class="h-4 bg-slate-200 dark:bg-stone-700 rounded w-4/6 animate-pulse"></div>
              </div>
              <div class="h-20 bg-slate-100 dark:bg-stone-800 rounded-2xl w-full animate-pulse my-2"></div>
              <div class="h-14 bg-slate-200 dark:bg-stone-700 rounded-full w-full animate-pulse mt-4"></div>
            </div>
          </div>
        }

        <!-- Estado de Error (404 o problema de conexión) -->
        @else if (error()) {
          <div class="bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
            <div class="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 mx-auto flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-3xl">sentiment_dissatisfied</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-800 dark:text-stone-100">Prenda no disponible</h2>
            <p class="text-sm text-slate-600 dark:text-stone-300 mt-2 mb-6 leading-relaxed">
              {{ error() }}
            </p>
            <div class="flex items-center justify-center gap-3">
              <a
                routerLink="/products"
                class="inline-flex items-center gap-2 bg-[#007782] hover:bg-[#005f69] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-sm"
              >
                <span class="material-symbols-outlined text-[18px]">storefront</span>
                <span>Volver al catálogo</span>
              </a>
              <button
                type="button"
                (click)="loadProduct()"
                class="inline-flex items-center gap-1.5 bg-white dark:bg-stone-800 border border-slate-200 dark:border-stone-700 px-5 py-3 rounded-full text-sm font-semibold text-slate-700 dark:text-stone-200 hover:bg-slate-50 dark:hover:bg-stone-700 transition-all cursor-pointer"
              >
                <span class="material-symbols-outlined text-[18px]">refresh</span>
                <span>Reintentar</span>
              </button>
            </div>
          </div>
        }
        @else {
          @if (product(); as prod) {
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            <!-- Columna Izquierda: Galería y Carrusel de Imágenes -->
            <div class="lg:col-span-6 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-white/60 dark:border-stone-800 rounded-3xl p-5 sm:p-7 shadow-sm flex flex-col justify-between">
              
              <!-- Visor Principal de la Imagen -->
              <div class="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-inner group">
                <img
                  [src]="currentImageUrl()"
                  [alt]="prod.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />

                <!-- Controles flotantes Anterior / Siguiente si hay más de 1 imagen -->
                @if (imagesList().length > 1) {
                  <button
                    type="button"
                    (click)="prevImage()"
                    aria-label="Imagen anterior"
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-900 text-slate-800 dark:text-stone-200 backdrop-blur-sm shadow flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100 hover:scale-110 active:scale-95"
                  >
                    <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>

                  <button
                    type="button"
                    (click)="nextImage()"
                    aria-label="Imagen siguiente"
                    class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-900 text-slate-800 dark:text-stone-200 backdrop-blur-sm shadow flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100 hover:scale-110 active:scale-95"
                  >
                    <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>

                  <!-- Indicador de página 1 / N -->
                  <div class="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full pointer-events-none">
                    {{ activeImageIndex() + 1 }} / {{ imagesList().length }}
                  </div>
                }
              </div>

              <!-- Miniaturas Inferiores -->
              @if (imagesList().length > 1) {
                <div class="flex justify-center items-center gap-3 mt-4 overflow-x-auto py-1 scrollbar-none">
                  @for (img of imagesList(); track $index) {
                    <button
                      type="button"
                      (click)="setImageIndex($index)"
                      [attr.aria-label]="'Ver imagen ' + ($index + 1)"
                      class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-stone-100 dark:bg-stone-800 shadow-2xs"
                      [ngClass]="activeImageIndex() === $index ? 'ring-2 ring-[#007782] border-transparent scale-105' : 'border-stone-200/80 dark:border-stone-700 opacity-70 hover:opacity-100'"
                    >
                      <img [src]="img.url" [alt]="img.altText || prod.title" class="w-full h-full object-cover" />
                    </button>
                  }
                </div>
              }
            </div>

            <!-- Columna Derecha: Ficha Técnica y Acciones -->
            <div class="lg:col-span-6 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-white/60 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              
              <div>
                <!-- Encabezado con Categoría -->
                @if (prod.category?.name) {
                  <span class="inline-block text-[11px] font-bold uppercase tracking-wider text-[#007782] dark:text-[#4db8c4] bg-[#007782]/10 dark:bg-[#007782]/25 px-3 py-0.5 rounded-full mb-3">
                    {{ prod.category?.name }}
                  </span>
                }

                <!-- Título y Precio -->
                <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-stone-100 leading-tight">
                  {{ prod.title }}
                </h1>
                <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-stone-100 mt-2 tracking-tight">
                  {{ prod.price | currency:'EUR':'symbol':'1.2-2' }}
                </p>

                <!-- Píldoras de Atributos (Badges) -->
                <div class="flex flex-wrap items-center gap-2 my-4">
                  <!-- Talla -->
                  <span class="inline-flex items-center gap-1.5 bg-[#f8f3ed] dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-stone-200 shadow-2xs">
                    <span class="material-symbols-outlined text-[15px] text-slate-500 dark:text-stone-400">straighten</span>
                    <span>Talla {{ prod.size }}</span>
                  </span>

                  <!-- Marca -->
                  <span class="inline-flex items-center gap-1.5 bg-[#f8f3ed] dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-stone-200 shadow-2xs">
                    <span class="material-symbols-outlined text-[15px] text-slate-500 dark:text-stone-400">sell</span>
                    <span>{{ prod.brand.name }}</span>
                  </span>

                  <!-- Estado -->
                  <span class="inline-flex items-center gap-1.5 bg-[#f8f3ed] dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-stone-200 shadow-2xs">
                    <span class="material-symbols-outlined text-[15px] text-emerald-600 dark:text-emerald-400">verified</span>
                    <span>{{ prod.condition }}</span>
                  </span>

                  @if (prod.color) {
                    <span class="inline-flex items-center gap-1.5 bg-[#f8f3ed] dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-stone-200 shadow-2xs">
                      <span class="material-symbols-outlined text-[15px] text-slate-500 dark:text-stone-400">palette</span>
                      <span>{{ prod.color }}</span>
                    </span>
                  }
                </div>

                <!-- Descripción -->
                <div class="my-5 pt-3 border-t border-slate-100 dark:border-stone-800">
                  <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-stone-400 mb-2">Descripción de la prenda</h3>
                  <p class="text-slate-600 dark:text-stone-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {{ prod.description }}
                  </p>
                </div>

                <!-- Tarjeta Compacta del Vendedor -->
                <a
                  [routerLink]="['/products']"
                  [queryParams]="{ seller: prod.seller.id }"
                  class="bg-white/90 dark:bg-stone-800/90 border border-white/70 dark:border-stone-700 hover:border-[#007782]/40 rounded-2xl p-3.5 flex items-center gap-3.5 my-6 shadow-2xs hover:shadow-sm transition-all group cursor-pointer"
                >
                  <img
                    [src]="prod.seller.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'"
                    [alt]="prod.seller.username"
                    class="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 dark:ring-stone-700 group-hover:ring-[#007782]/40 transition-all"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-1.5">
                      <span class="font-bold text-slate-900 dark:text-stone-100 truncate">&#64;{{ prod.seller.username }}</span>
                      <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[16px]">verified</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-0.5">
                      <span class="material-symbols-outlined text-[14px]">star</span>
                      <span>{{ prod.seller.ratingAverage | number:'1.1-1' }}</span>
                      @if (prod.seller.ratingCount) {
                        <span class="text-slate-400 dark:text-stone-400 font-normal">({{ prod.seller.ratingCount }} valoraciones)</span>
                      }
                      @if (prod.seller.city) {
                        <span class="text-slate-400 dark:text-stone-400 font-normal">• {{ prod.seller.city }}</span>
                      }
                    </div>
                  </div>
                  <div class="text-xs font-semibold text-[#007782] dark:text-[#4db8c4] group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-0.5">
                    <span>Ver armario</span>
                    <span class="material-symbols-outlined text-[16px]">chevron_right</span>
                  </div>
                </a>

                <!-- Garantía de Protección Vintod -->
                <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-stone-800/60 border border-slate-100 dark:border-stone-800 text-xs text-slate-600 dark:text-stone-300 mb-6">
                  <span class="material-symbols-outlined text-[#007782] dark:text-[#4db8c4] text-[18px]">security</span>
                  <span><strong>Protección al comprador:</strong> Tu dinero está a salvo hasta que recibas la prenda tal como se describe.</span>
                </div>
              </div>

              <!-- Barra de Acciones Inferiores -->
              <div class="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100 dark:border-stone-800">
                <!-- Botón Principal "Comprar ahora" -->
                <button
                  type="button"
                  (click)="handleBuyNow()"
                  class="flex-1 rounded-full bg-[#007782] hover:bg-[#005f69] active:scale-[0.99] text-white font-semibold py-3.5 px-6 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                >
                  <span class="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>Comprar ahora</span>
                </button>

                <!-- Componente de Like (solo en Shop Details) -->
                <app-product-like-button
                  [productId]="prod.id"
                  [initialLikesCount]="prod.likesCount ?? 0"
                />
              </div>

            </div>

          </div>
          }
        }

      </div>

    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  @Input() id?: string;
  @Input() slug?: string;

  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  authStore = inject(AuthStore);

  product = signal<ProductDetailItem | null>(null);
  activeImageIndex = signal<number>(0);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Deriva la lista de imágenes con fallback
  imagesList = computed(() => {
    const p = this.product();
    if (!p) return [];
    if (p.images && p.images.length > 0) {
      return p.images;
    }
    return [
      {
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80',
        altText: p.title || 'Prenda'
      }
    ];
  });

  // URL de la imagen actualmente seleccionada
  currentImageUrl = computed(() => {
    const list = this.imagesList();
    const idx = this.activeImageIndex();
    return list[idx]?.url || list[0]?.url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80';
  });

  // Determina si el usuario logueado es el dueño de la prenda
  isOwner = computed(() => {
    const user = this.authStore.user();
    const p = this.product();
    if (!user || !p) return false;
    return user.id === p.sellerId || user.id === p.seller.id;
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const param = params.get('id') || params.get('slug') || this.id || this.slug;
      if (param) {
        this.fetchProductDetail(param);
      } else {
        this.error.set('Identificador de prenda no especificado');
        this.loading.set(false);
      }
    });
  }

  loadProduct() {
    const param = this.route.snapshot.paramMap.get('id') || this.route.snapshot.paramMap.get('slug') || this.id || this.slug;
    if (param) {
      this.fetchProductDetail(param);
    }
  }

  async fetchProductDetail(idOrSlug: string) {
    this.loading.set(true);
    this.error.set(null);
    this.activeImageIndex.set(0);

    const isMongoId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
    const req$ = isMongoId
      ? this.productService.getProduct(idOrSlug)
      : this.productService.getProductBySlug(idOrSlug);

    req$.subscribe({
      next: (res) => {
        if (!res || !res.data) {
          this.error.set('No se encontró la prenda solicitada o ya no está disponible.');
          this.loading.set(false);
          return;
        }

        const raw: any = res.data;
        const mapped = this.mapProductToDetail(raw);
        this.product.set(mapped);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar detalle del producto:', err);
        if (err.status === 404) {
          this.error.set('La prenda que buscas no existe o ha sido retirada por su vendedor.');
        } else if (err.status === 400) {
          this.error.set('El identificador de la prenda no es válido.');
        } else {
          this.error.set('Ha ocurrido un problema al conectar con el servidor. Inténtalo de nuevo más tarde.');
        }
        this.loading.set(false);
      }
    });
  }

  private mapProductToDetail(raw: any): ProductDetailItem {
    // Normalizar imágenes desde variants o campo image
    const imgs: Array<{ id?: string; url: string; altText?: string; isCover?: boolean; sortOrder?: number }> = [];

    if (raw.variants && Array.isArray(raw.variants)) {
      raw.variants.forEach((v: any) => {
        if (v.images && Array.isArray(v.images)) {
          v.images.forEach((im: any) => {
            if (im.url && !imgs.some(x => x.url === im.url)) {
              imgs.push({
                id: im.id,
                url: im.url,
                altText: im.altText || raw.title,
                isCover: !!im.isCover,
                sortOrder: im.sortOrder ?? 0
              });
            }
          });
        }
      });
    }

    if (raw.image && !imgs.some(x => x.url === raw.image)) {
      imgs.unshift({ url: raw.image, isCover: true, altText: raw.title });
    }

    if (raw.images && Array.isArray(raw.images)) {
      raw.images.forEach((url: string) => {
        if (url && !imgs.some(x => x.url === url)) {
          imgs.push({ url, altText: raw.title });
        }
      });
    }

    // Normalizar marca
    const brandName = raw.brandInfo?.name || raw.brand || 'Vintage';
    const brandSlug = raw.brandInfo?.slug || brandName.toLowerCase().replace(/\s+/g, '-');

    // Normalizar vendedor
    const sellerObj = raw.sellerInfo || raw.seller;
    const profile = sellerObj?.profile;
    const sellerUsername = profile?.username || sellerObj?.username || raw.sellerName || 'vendedor';
    const sellerAvatar = profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
    const sellerRating = profile?.ratingAverage || 4.9;
    const sellerCount = profile?.ratingCount || 12;
    const sellerCity = profile?.city || '';

    // Primera variante para talla, condición y precio si existen
    const primaryVariant = raw.variants && raw.variants.length > 0 ? raw.variants[0] : null;

    return {
      id: raw.id || raw._id,
      _id: raw._id || raw.id,
      title: raw.title,
      slug: raw.slug,
      description: raw.description || 'Prenda en perfecto estado para dar una segunda vida a tu armario.',
      price: primaryVariant?.price ?? raw.price ?? 0,
      condition: primaryVariant?.condition || raw.condition || 'Muy bueno',
      size: primaryVariant?.size || raw.size || 'M',
      color: primaryVariant?.color || raw.color || '',
      stock: primaryVariant?.stock ?? raw.stock ?? 1,
      status: raw.status || 'available',
      likesCount: raw.likesCount ?? 0,
      createdAt: raw.createdAt,
      sellerId: raw.sellerId || sellerObj?.id,
      brand: {
        id: raw.brandInfo?.id || raw.brandId,
        name: brandName,
        slug: brandSlug,
        logoUrl: raw.brandInfo?.logoUrl
      },
      category: raw.categoryInfo || (raw.category ? { name: raw.category } : undefined),
      seller: {
        id: raw.sellerId || sellerObj?.id || 'vintod_seller',
        email: sellerObj?.email,
        username: sellerUsername,
        avatarUrl: sellerAvatar,
        ratingAverage: Number(sellerRating) || 4.9,
        ratingCount: Number(sellerCount) || 12,
        city: sellerCity
      },
      images: imgs
    };
  }

  setImageIndex(idx: number) {
    this.activeImageIndex.set(idx);
  }

  prevImage() {
    const current = this.activeImageIndex();
    const total = this.imagesList().length;
    if (total <= 1) return;
    this.activeImageIndex.set((current - 1 + total) % total);
  }

  nextImage() {
    const current = this.activeImageIndex();
    const total = this.imagesList().length;
    if (total <= 1) return;
    this.activeImageIndex.set((current + 1) % total);
  }

  handleBuyNow() {
    // 1. Comprobar si el usuario está autenticado
    if (!this.authStore.isAuthenticated()) {
      const currentUrl = this.router.url;
      Swal.fire({
        title: 'Inicia sesión para continuar',
        text: 'Debes tener una cuenta en Vintod para comprar esta prenda',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#007782',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
        }
      });
      return;
    }

    // 2. Comprobar si es su propia prenda
    if (this.isOwner()) {
      Swal.fire({
        title: 'Es tu propia prenda',
        text: 'No puedes comprar una prenda que tú mismo has publicado para la venta.',
        icon: 'warning',
        confirmButtonColor: '#007782',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    // 3. Stub para la siguiente fase de compra / pasarela de pago
    const p = this.product();
    Swal.fire({
      title: '¡Casi es tuya!',
      html: `
        <div class="text-left text-sm text-slate-600 space-y-2 mt-2">
          <p>Has seleccionado: <strong class="text-slate-900">${p?.title}</strong></p>
          <p>Precio de la prenda: <strong class="text-slate-900">${p?.price?.toFixed(2)} €</strong></p>
          <p class="text-xs text-slate-500">La integración completa con la pasarela de pagos seguros de Vintod se activará en la próxima actualización.</p>
        </div>
      `,
      icon: 'success',
      confirmButtonColor: '#007782',
      confirmButtonText: 'Aceptar'
    });
  }
}
