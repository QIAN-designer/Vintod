import { Component, OnInit, inject, Input, signal, computed, effect } from '@angular/core';
import { ProductsStore } from '../../../../core/store/products.store';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { ProductVariant } from '../../../../core/models/marketplace.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, ErrorStateComponent],
  template: `
    <div class="min-h-screen bg-surface py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div class="mb-6 flex items-center justify-between">
        <a
          routerLink="/shop"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Volver al catálogo (Shop)</span>
        </a>

        <a
          routerLink="/"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <span class="material-symbols-outlined text-[18px]">home</span>
          <span>Inicio</span>
        </a>
      </div>

      @if (store.error()) {
        <app-error-state [message]="store.error()!" (retry)="loadProduct()"></app-error-state>
      } @else {
        @if (store.selectedProduct(); as product) {
        <div class="bg-surface-container-lowest shadow-md rounded-2xl overflow-hidden border border-outline-variant/20">
          <div class="grid grid-cols-1 md:grid-cols-12">
            <!-- Galería de imágenes (Principal + Miniaturas de la variante) -->
            <div class="md:col-span-6 bg-surface-container-low p-6 flex flex-col gap-4">
              <div class="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-surface shadow-xs">
                <img
                  [src]="activeImage()"
                  [alt]="product.title"
                  class="w-full h-full object-center object-cover transition-all duration-300"
                />
              </div>

              @if (variantImages().length > 1) {
                <div class="flex items-center gap-3 overflow-x-auto pb-1">
                  @for (imgUrl of variantImages(); track imgUrl) {
                    <button
                      type="button"
                      (click)="selectedImageUrl.set(imgUrl)"
                      class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer"
                      [class.border-primary]="activeImage() === imgUrl"
                      [class.border-transparent]="activeImage() !== imgUrl"
                    >
                      <img [src]="imgUrl" [alt]="product.title" class="w-full h-full object-cover" />
                    </button>
                  }
                </div>
              }
            </div>

            <!-- Información del Producto y Selector de Variantes -->
            <div class="md:col-span-6 p-8 flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  @if (product.category) {
                    <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">
                      {{ product.category }}
                    </span>
                  }
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                    {{ currentCondition() }}
                  </span>
                  @if (product.slug) {
                    <span class="text-[11px] text-outline ml-auto font-mono">
                      /{{ product.slug }}
                    </span>
                  }
                </div>

                <div class="flex justify-between items-start gap-4 mt-2">
                  <div>
                    <h1 class="text-2xl sm:text-3xl font-extrabold text-on-surface leading-tight">
                      {{ product.title }}
                    </h1>
                    <p class="mt-1 text-base font-semibold text-primary">
                      {{ product.brand || 'Vintage' }}
                    </p>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="text-3xl font-extrabold text-on-surface">
                      {{ currentPrice() | currency:'EUR':'symbol':'1.2-2' }}
                    </p>
                    <p class="text-[11px] text-secondary font-semibold">Protección incluida</p>
                  </div>
                </div>

                <!-- Selector de Variantes (Variants) -->
                @if (variantsList().length > 0) {
                  <div class="mt-6 pt-5 border-t border-outline-variant/25">
                    <div class="flex items-center justify-between mb-2.5">
                      <span class="text-xs font-bold uppercase tracking-wider text-outline">
                        Variantes disponibles ({{ variantsList().length }})
                      </span>
                      @if (activeVariant()?.sku) {
                        <span class="text-[11px] font-mono text-outline">SKU: {{ activeVariant()?.sku }}</span>
                      }
                    </div>

                    <div class="flex flex-wrap gap-2.5">
                      @for (variant of variantsList(); track variant.id || $index) {
                        <button
                          type="button"
                          (click)="selectVariant($index)"
                          class="px-3.5 py-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 min-w-[110px]"
                          [class.border-primary]="selectedVariantIndex() === $index"
                          [class.bg-primary-fixed]="selectedVariantIndex() === $index"
                          [class.border-outline-variant]="selectedVariantIndex() !== $index"
                          [class.bg-surface]="selectedVariantIndex() !== $index"
                        >
                          <div class="flex items-center justify-between gap-2">
                            <span class="text-xs font-extrabold text-on-surface">Talla {{ variant.size }}</span>
                            <span class="text-xs font-bold text-primary">{{ variant.price | currency:'EUR':'symbol':'1.0-2' }}</span>
                          </div>
                          <span class="text-[11px] text-outline truncate">
                            {{ variant.color || variant.condition }}
                          </span>
                        </button>
                      }
                    </div>
                  </div>
                }

                <!-- Ficha Técnica -->
                <div class="mt-6 border-t border-outline-variant/25 pt-5">
                  <dl class="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                    <div>
                      <dt class="text-xs font-medium text-outline">Talla seleccionada</dt>
                      <dd class="mt-0.5 font-bold text-on-surface">{{ currentSize() }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs font-medium text-outline">Estado / Condición</dt>
                      <dd class="mt-0.5 font-bold text-on-surface">{{ currentCondition() }}</dd>
                    </div>
                    @if (currentColor()) {
                      <div>
                        <dt class="text-xs font-medium text-outline">Color</dt>
                        <dd class="mt-0.5 font-semibold text-on-surface">{{ currentColor() }}</dd>
                      </div>
                    }
                    <div>
                      <dt class="text-xs font-medium text-outline">Stock disponible</dt>
                      <dd class="mt-0.5 font-semibold text-on-surface">{{ currentStock() }} ud.</dd>
                    </div>
                    <div class="col-span-2">
                      <dt class="text-xs font-medium text-outline">Descripción</dt>
                      <dd class="mt-1 text-sm text-on-surface-variant whitespace-pre-line leading-relaxed">
                        {{ product.description }}
                      </dd>
                    </div>
                    <div>
                      <dt class="text-xs font-medium text-outline">Vendedor</dt>
                      <dd class="mt-0.5 font-semibold text-on-surface">{{ '@' + (product.sellerName || 'vintod_seller') }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs font-medium text-outline">Publicado</dt>
                      <dd class="mt-0.5 text-on-surface-variant">{{ product.createdAt | date:'mediumDate' }}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <!-- Acciones -->
              <div class="mt-8 pt-6 border-t border-outline-variant/25 flex flex-wrap gap-3">
                <button
                  type="button"
                  class="flex-1 bg-primary hover:opacity-95 text-on-primary rounded-full shadow-sm py-3 px-6 text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span class="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>Comprar ahora</span>
                </button>
                <a
                  [routerLink]="['/products', product._id || product.id, 'edit']"
                  class="bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 rounded-full py-3 px-5 text-sm font-semibold text-on-surface transition-colors flex items-center gap-1.5"
                >
                  <span class="material-symbols-outlined text-[18px]">edit</span>
                  <span>Editar</span>
                </a>
                <button
                  type="button"
                  (click)="deleteProduct()"
                  class="bg-error-container/20 hover:bg-error-container/40 text-error rounded-full py-3 px-5 text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span class="material-symbols-outlined text-[18px]">delete</span>
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        }
      }
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  @Input() id?: string;
  @Input() slug?: string;

  store = inject(ProductsStore);
  router = inject(Router);
  private route = inject(ActivatedRoute);

  selectedVariantIndex = signal(0);
  selectedImageUrl = signal<string | null>(null);

  variantsList = computed<ProductVariant[]>(() => {
    const p = this.store.selectedProduct();
    if (!p) return [];
    if (p.variants && p.variants.length > 0) {
      return p.variants;
    }
    return [
      {
        id: 'default',
        size: p.size || 'M',
        condition: p.condition || 'Muy bueno',
        color: p.color || '',
        price: p.price || 0,
        stock: p.stock || 1,
        images: p.image ? [{ id: 'img-0', url: p.image, isCover: true }] : []
      }
    ];
  });

  activeVariant = computed<ProductVariant | null>(() => {
    const list = this.variantsList();
    const idx = this.selectedVariantIndex();
    return list[idx] || list[0] || null;
  });

  variantImages = computed<string[]>(() => {
    const v = this.activeVariant();
    const p = this.store.selectedProduct();
    const urls: string[] = [];
    if (v?.images && v.images.length > 0) {
      v.images.forEach(img => {
        if (img.url && !urls.includes(img.url)) urls.push(img.url);
      });
    }
    if (p?.image && !urls.includes(p.image)) {
      urls.push(p.image);
    }
    if (urls.length === 0) {
      urls.push('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80');
    }
    return urls;
  });

  activeImage = computed<string>(() => {
    return this.selectedImageUrl() || this.variantImages()[0];
  });

  currentPrice = computed(() => this.activeVariant()?.price ?? this.store.selectedProduct()?.price ?? 0);
  currentSize = computed(() => this.activeVariant()?.size || this.store.selectedProduct()?.size || 'Única');
  currentCondition = computed(() => this.activeVariant()?.condition || this.store.selectedProduct()?.condition || 'Muy bueno');
  currentColor = computed(() => this.activeVariant()?.color || this.store.selectedProduct()?.color || '');
  currentStock = computed(() => this.activeVariant()?.stock ?? this.store.selectedProduct()?.stock ?? 1);

  constructor() {
    effect(() => {
      // Resetear selección al cambiar el producto cargado
      const _ = this.store.selectedProduct();
      this.selectedVariantIndex.set(0);
      this.selectedImageUrl.set(null);
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paramSlugOrId = params.get('slug') || params.get('id') || this.slug || this.id;
      if (paramSlugOrId) {
        this.store.loadProduct(paramSlugOrId);
      }
    });
  }

  loadProduct() {
    const paramSlugOrId =
      this.route.snapshot.paramMap.get('slug') ||
      this.route.snapshot.paramMap.get('id') ||
      this.slug ||
      this.id;
    if (paramSlugOrId) {
      this.store.loadProduct(paramSlugOrId);
    }
  }

  selectVariant(index: number) {
    this.selectedVariantIndex.set(index);
    this.selectedImageUrl.set(null);
  }

  deleteProduct() {
    const product = this.store.selectedProduct();
    const targetId = product?._id || product?.id;
    if (!product || !targetId) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La prenda pasará a la papelera de reciclaje',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.deleteProductData(targetId).add(() => {
          Swal.fire('Eliminado!', 'La prenda ha sido eliminada.', 'success');
          this.router.navigate(['/shop']);
        });
      }
    });
  }
}
