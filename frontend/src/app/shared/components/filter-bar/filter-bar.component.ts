import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FilterCriteria {
  category: string;
  brand: string;
  condition: string;
  size: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: string;
  order: 'asc' | 'desc';
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FormsModule],
  styles: [`
    .range-slider-input {
      -webkit-appearance: none;
      appearance: none;
      pointer-events: none;
      background: transparent;
    }
    .range-slider-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      pointer-events: auto;
      width: 16px;
      height: 16px;
      border-radius: 9999px;
      background: #007782;
      border: 2px solid #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    .range-slider-input::-webkit-slider-thumb:hover {
      transform: scale(1.15);
    }
    .range-slider-input::-moz-range-thumb {
      pointer-events: auto;
      width: 16px;
      height: 16px;
      border-radius: 9999px;
      background: #007782;
      border: 2px solid #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    .range-slider-input::-moz-range-thumb:hover {
      transform: scale(1.15);
    }
  `],
  template: `
    <div class="w-full bg-surface-container-low p-4 rounded-2xl shadow-xs flex flex-col gap-3">
      <div class="flex flex-wrap items-center gap-2.5">
        <!-- Categoría -->
        <div class="relative">
          <select
            [ngModel]="category"
            (ngModelChange)="onCategoryChange($event)"
            class="appearance-none bg-surface text-on-surface hover:bg-surface-container pl-3.5 pr-8 py-2 rounded-full text-xs font-semibold cursor-pointer border border-outline-variant/30 outline-none shadow-2xs"
          >
            <option value="">Todas las categorías</option>
            @for (cat of categories; track cat) {
              <option [value]="cat">{{ cat }}</option>
            }
          </select>
          <span class="material-symbols-outlined absolute right-2.5 top-2 text-[16px] text-outline pointer-events-none">expand_more</span>
        </div>

        <!-- Marca / Location -->
        <div class="relative">
          <select
            [ngModel]="brand"
            (ngModelChange)="onBrandChange($event)"
            class="appearance-none bg-surface text-on-surface hover:bg-surface-container pl-3.5 pr-8 py-2 rounded-full text-xs font-semibold cursor-pointer border border-outline-variant/30 outline-none shadow-2xs"
          >
            <option value="">Todas las marcas</option>
            @for (b of brands; track b) {
              <option [value]="b">{{ b }}</option>
            }
          </select>
          <span class="material-symbols-outlined absolute right-2.5 top-2 text-[16px] text-outline pointer-events-none">expand_more</span>
        </div>

        <!-- Estado / Condición -->
        <div class="relative">
          <select
            [ngModel]="condition"
            (ngModelChange)="onConditionChange($event)"
            class="appearance-none bg-surface text-on-surface hover:bg-surface-container pl-3.5 pr-8 py-2 rounded-full text-xs font-semibold cursor-pointer border border-outline-variant/30 outline-none shadow-2xs"
          >
            <option value="">Todos los estados</option>
            @for (cond of conditions; track cond) {
              <option [value]="cond">{{ cond }}</option>
            }
          </select>
          <span class="material-symbols-outlined absolute right-2.5 top-2 text-[16px] text-outline pointer-events-none">expand_more</span>
        </div>

        <!-- Talla (Variant Size) -->
        <div class="relative">
          <select
            [ngModel]="size"
            (ngModelChange)="onSizeChange($event)"
            class="appearance-none bg-surface text-on-surface hover:bg-surface-container pl-3.5 pr-8 py-2 rounded-full text-xs font-semibold cursor-pointer border border-outline-variant/30 outline-none shadow-2xs"
          >
            <option value="">Todas las tallas</option>
            @for (sz of sizes; track sz) {
              <option [value]="sz">Talla {{ sz }}</option>
            }
          </select>
          <span class="material-symbols-outlined absolute right-2.5 top-2 text-[16px] text-outline pointer-events-none">expand_more</span>
        </div>

        <!-- Selector de Precio con Slider Dual -->
        <div class="flex items-center gap-3 bg-surface px-4 py-1.5 rounded-full border border-outline-variant/30 shadow-2xs min-w-[240px]">
          <span class="text-xs font-semibold text-on-surface whitespace-nowrap">
            {{ currentMin }}€ - {{ currentMax >= maxLimit ? maxLimit + '+€' : currentMax + '€' }}
          </span>
          <div class="relative flex-1 h-5 flex items-center min-w-[110px]">
            <!-- Track de fondo -->
            <div class="w-full h-1.5 bg-surface-container-highest rounded-full"></div>
            <!-- Barra de progreso activa -->
            <div
              class="absolute h-1.5 bg-primary rounded-full"
              [style.left.%]="minPercent"
              [style.width.%]="maxPercent - minPercent"
            ></div>
            <!-- Slider Mínimo -->
            <input
              type="range"
              [min]="minLimit"
              [max]="maxLimit"
              step="5"
              [ngModel]="currentMin"
              (ngModelChange)="onMinSliderChange($event)"
              class="range-slider-input absolute inset-0 w-full h-full m-0 z-10"
              aria-label="Precio mínimo"
            />
            <!-- Slider Máximo -->
            <input
              type="range"
              [min]="minLimit"
              [max]="maxLimit"
              step="5"
              [ngModel]="currentMax"
              (ngModelChange)="onMaxSliderChange($event)"
              class="range-slider-input absolute inset-0 w-full h-full m-0 z-20"
              aria-label="Precio máximo"
            />
          </div>
        </div>

        <!-- Ordenación -->
        <div class="relative ml-auto">
          <select
            [ngModel]="sortBy + ':' + order"
            (ngModelChange)="onSortChange($event)"
            class="appearance-none bg-surface text-on-surface hover:bg-surface-container pl-3.5 pr-8 py-2 rounded-full text-xs font-semibold cursor-pointer border border-outline-variant/30 outline-none shadow-2xs"
          >
            <option value="createdAt:desc">Más recientes</option>
            <option value="price:asc">Precio: menor a mayor</option>
            <option value="price:desc">Precio: mayor a menor</option>
            <option value="title:asc">Nombre: A - Z</option>
          </select>
          <span class="material-symbols-outlined absolute right-2.5 top-2 text-[16px] text-outline pointer-events-none">sort</span>
        </div>

        @if (hasActiveFilters) {
          <button
            type="button"
            (click)="reset.emit()"
            class="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline px-2 py-1.5 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Limpiar filtros</span>
          </button>
        }
      </div>

      <div class="flex items-center justify-between text-xs text-outline pt-1 border-t border-outline-variant/20">
        <div class="flex flex-wrap items-center gap-1.5">
          @if (category) {
            <span class="inline-flex items-center gap-1 bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-full font-semibold">
              Categoría: {{ category }}
              <button type="button" (click)="onCategoryChange('')" class="hover:opacity-75 cursor-pointer">×</button>
            </span>
          }
          @if (brand) {
            <span class="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed px-2.5 py-0.5 rounded-full font-semibold">
              Marca: {{ brand }}
              <button type="button" (click)="onBrandChange('')" class="hover:opacity-75 cursor-pointer">×</button>
            </span>
          }
          @if (condition) {
            <span class="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-0.5 rounded-full font-semibold">
              Estado: {{ condition }}
              <button type="button" (click)="onConditionChange('')" class="hover:opacity-75 cursor-pointer">×</button>
            </span>
          }
          @if (size) {
            <span class="inline-flex items-center gap-1 bg-surface-container-highest text-on-surface px-2.5 py-0.5 rounded-full font-semibold">
              Talla: {{ size }}
              <button type="button" (click)="onSizeChange('')" class="hover:opacity-75 cursor-pointer">×</button>
            </span>
          }
          @if (minPrice !== null || maxPrice !== null) {
            <span class="inline-flex items-center gap-1 bg-primary-fixed/60 text-on-primary-fixed px-2.5 py-0.5 rounded-full font-semibold">
              Precio: {{ currentMin }}€ - {{ currentMax >= maxLimit ? maxLimit + '+€' : currentMax + '€' }}
              <button type="button" (click)="clearPriceFilter()" class="hover:opacity-75 cursor-pointer">×</button>
            </span>
          }
        </div>
        <span>
          Resultados encontrados: <strong class="text-on-surface">{{ totalResults }}</strong>
        </span>
      </div>
    </div>
  `
})
export class FilterBarComponent {
  @Input() category = '';
  @Input() brand = '';
  @Input() condition = '';
  @Input() size = '';
  @Input() minPrice: number | null = null;
  @Input() maxPrice: number | null = null;
  @Input() sortBy = 'createdAt';
  @Input() order: 'asc' | 'desc' = 'desc';
  @Input() totalResults = 0;

  @Input() minLimit = 0;
  @Input() maxLimit = 300;

  @Input() categories: string[] = ['Vestidos', 'Zapatillas', 'Chaquetas', 'Bolsos', 'Vintage', 'Punto', 'Sudaderas', 'Pantalones'];
  @Input() brands: string[] = ['Nike', "Levi's", 'Zara', 'Carhartt', 'Sézane', 'Adidas', 'Ralph Lauren', 'Vintage'];
  @Input() conditions: string[] = ['Nuevo con etiquetas', 'Muy bueno', 'Bueno', 'Satisfactorio'];
  @Input() sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', '38', '40', '42', 'Única'];

  @Output() filterChange = new EventEmitter<Partial<FilterCriteria>>();
  @Output() reset = new EventEmitter<void>();

  get currentMin(): number {
    return this.minPrice !== null && this.minPrice !== undefined ? this.minPrice : this.minLimit;
  }

  get currentMax(): number {
    return this.maxPrice !== null && this.maxPrice !== undefined ? this.maxPrice : this.maxLimit;
  }

  get minPercent(): number {
    return ((this.currentMin - this.minLimit) / (this.maxLimit - this.minLimit)) * 100;
  }

  get maxPercent(): number {
    return ((this.currentMax - this.minLimit) / (this.maxLimit - this.minLimit)) * 100;
  }

  get hasActiveFilters(): boolean {
    return !!(
      this.category ||
      this.brand ||
      this.condition ||
      this.size ||
      this.minPrice !== null ||
      this.maxPrice !== null ||
      this.sortBy !== 'createdAt' ||
      this.order !== 'desc'
    );
  }

  onCategoryChange(category: string) {
    this.category = category;
    this.filterChange.emit({ category });
  }

  onBrandChange(brand: string) {
    this.brand = brand;
    this.filterChange.emit({ brand });
  }

  onConditionChange(condition: string) {
    this.condition = condition;
    this.filterChange.emit({ condition });
  }

  onSizeChange(size: string) {
    this.size = size;
    this.filterChange.emit({ size });
  }

  onMinSliderChange(val: number) {
    const numVal = Number(val);
    const clamped = Math.min(numVal, this.currentMax - 5);
    const finalMin = clamped <= this.minLimit ? null : clamped;
    this.minPrice = finalMin;
    this.filterChange.emit({ minPrice: finalMin });
  }

  onMaxSliderChange(val: number) {
    const numVal = Number(val);
    const clamped = Math.max(numVal, this.currentMin + 5);
    const finalMax = clamped >= this.maxLimit ? null : clamped;
    this.maxPrice = finalMax;
    this.filterChange.emit({ maxPrice: finalMax });
  }

  clearPriceFilter() {
    this.minPrice = null;
    this.maxPrice = null;
    this.filterChange.emit({ minPrice: null, maxPrice: null });
  }

  onSortChange(combined: string) {
    const [sortBy, order] = combined.split(':');
    this.sortBy = sortBy || 'createdAt';
    this.order = (order === 'asc' ? 'asc' : 'desc');
    this.filterChange.emit({ sortBy: this.sortBy, order: this.order });
  }
}
