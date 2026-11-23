import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FilterCriteria {
  category: string;
  brand: string;
  location: string;
  host: string;
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
      width: 15px;
      height: 15px;
      border-radius: 9999px;
      background: #007782;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 5px rgba(0, 119, 130, 0.4);
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    .range-slider-input::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }
    .range-slider-input::-moz-range-thumb {
      pointer-events: auto;
      width: 15px;
      height: 15px;
      border-radius: 9999px;
      background: #007782;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 5px rgba(0, 119, 130, 0.4);
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    .range-slider-input::-moz-range-thumb:hover {
      transform: scale(1.2);
    }
  `],
  template: `
    <div class="w-full bg-white/95 dark:bg-[#141e22]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,119,130,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/80 dark:border-white/10 flex flex-col gap-3.5 transition-all text-slate-900 dark:text-stone-100">
      
      <!-- Fila de Filtros Personalizados con Menús Desplegables Glassmorphic -->
      <div class="flex flex-wrap items-center gap-2 sm:gap-2.5">
        
        <!-- Desplegable Personalizado: Categoría -->
        <div class="relative">
          <button
            type="button"
            (click)="toggleDropdown('category')"
            class="flex items-center gap-1.5 bg-slate-50/90 dark:bg-[#1b262a]/95 hover:bg-slate-100 dark:hover:bg-[#233136] text-slate-800 dark:text-stone-200 px-3.5 py-2 rounded-full text-xs font-semibold cursor-pointer border border-slate-200/80 dark:border-white/10 shadow-2xs hover:border-[#007782]/40 dark:hover:border-[#2dd4bf]/40 transition-all select-none"
            [class.border-cyan-700]="openDropdown() === 'category' || category"
            [class.bg-cyan-50]="category"
            [class.dark:bg-cyan-950]="category"
            [class.text-cyan-700]="category"
            [class.dark:text-cyan-300]="category"
          >
            <span>{{ category || 'Todas las categorías' }}</span>
            <span class="material-symbols-outlined text-[16px] text-slate-400 dark:text-stone-400 transition-transform duration-200" [class.rotate-180]="openDropdown() === 'category'">
              expand_more
            </span>
          </button>

          @if (openDropdown() === 'category') {
            <div class="fixed inset-0 z-30" (click)="closeDropdowns()"></div>
            <div class="absolute left-0 top-full mt-2 w-52 bg-white/95 dark:bg-[#162125]/95 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl py-1.5 z-40 max-h-60 overflow-y-auto divide-y divide-slate-50 dark:divide-white/5">
              <button
                type="button"
                (click)="selectCategoryOption('')"
                class="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#007782]/10 dark:hover:bg-white/10 hover:text-[#007782] dark:hover:text-[#2dd4bf] flex items-center justify-between transition-colors text-slate-700 dark:text-stone-200"
                [class.font-bold]="!category"
                [class.text-cyan-700]="!category"
                [class.dark:text-cyan-300]="!category"
              >
                <span>Todas las categorías</span>
                @if (!category) { <span class="material-symbols-outlined text-[15px]">check</span> }
              </button>
              @for (cat of categories; track cat) {
                <button
                  type="button"
                  (click)="selectCategoryOption(cat)"
                  class="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#007782]/10 dark:hover:bg-white/10 hover:text-[#007782] dark:hover:text-[#2dd4bf] flex items-center justify-between transition-colors text-slate-700 dark:text-stone-200"
                  [class.font-bold]="category === cat"
                  [class.text-cyan-700]="category === cat"
                  [class.dark:text-cyan-300]="category === cat"
                >
                  <span>{{ cat }}</span>
                  @if (category === cat) { <span class="material-symbols-outlined text-[15px]">check</span> }
                </button>
              }
            </div>
          }
        </div>

        <!-- Desplegable Personalizado: Marca -->
        <div class="relative">
          <button
            type="button"
            (click)="toggleDropdown('brand')"
            class="flex items-center gap-1.5 bg-slate-50/90 dark:bg-[#1b262a]/95 hover:bg-slate-100 dark:hover:bg-[#233136] text-slate-800 dark:text-stone-200 px-3.5 py-2 rounded-full text-xs font-semibold cursor-pointer border border-slate-200/80 dark:border-white/10 shadow-2xs hover:border-[#007782]/40 dark:hover:border-[#2dd4bf]/40 transition-all select-none"
            [class.border-cyan-700]="openDropdown() === 'brand' || brand"
            [class.bg-cyan-50]="brand"
            [class.dark:bg-cyan-950]="brand"
            [class.text-cyan-700]="brand"
            [class.dark:text-cyan-300]="brand"
          >
            <span>{{ brand || 'Todas las marcas' }}</span>
            <span class="material-symbols-outlined text-[16px] text-slate-400 dark:text-stone-400 transition-transform duration-200" [class.rotate-180]="openDropdown() === 'brand'">
              expand_more
            </span>
          </button>

          @if (openDropdown() === 'brand') {
            <div class="fixed inset-0 z-30" (click)="closeDropdowns()"></div>
            <div class="absolute left-0 top-full mt-2 w-48 bg-white/95 dark:bg-[#162125]/95 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl py-1.5 z-40 max-h-60 overflow-y-auto divide-y divide-slate-50 dark:divide-white/5">
              <button
                type="button"
                (click)="selectBrandOption('')"
                class="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#007782]/10 dark:hover:bg-white/10 hover:text-[#007782] dark:hover:text-[#2dd4bf] flex items-center justify-between transition-colors text-slate-700 dark:text-stone-200"
                [class.font-bold]="!brand"
                [class.text-cyan-700]="!brand"
                [class.dark:text-cyan-300]="!brand"
              >
                <span>Todas las marcas</span>
                @if (!brand) { <span class="material-symbols-outlined text-[15px]">check</span> }
              </button>
              @for (b of brands; track b) {
                <button
                  type="button"
                  (click)="selectBrandOption(b)"
                  class="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#007782]/10 dark:hover:bg-white/10 hover:text-[#007782] dark:hover:text-[#2dd4bf] flex items-center justify-between transition-colors text-slate-700 dark:text-stone-200"
                  [class.font-bold]="brand === b"
                  [class.text-cyan-700]="brand === b"
                  [class.dark:text-cyan-300]="brand === b"
                >
                  <span>{{ b }}</span>
                  @if (brand === b) { <span class="material-symbols-outlined text-[15px]">check</span> }
                </button>
              }
            </div>
          }
        </div>

        <!-- Desplegable Personalizado: Estado / Condición -->
        <div class="relative">
          <button
            type="button"
            (click)="toggleDropdown('condition')"
            class="flex items-center gap-1.5 bg-slate-50/90 dark:bg-[#1b262a]/95 hover:bg-slate-100 dark:hover:bg-[#233136] text-slate-800 dark:text-stone-200 px-3.5 py-2 rounded-full text-xs font-semibold cursor-pointer border border-slate-200/80 dark:border-white/10 shadow-2xs hover:border-[#007782]/40 dark:hover:border-[#2dd4bf]/40 transition-all select-none"
            [class.border-cyan-700]="openDropdown() === 'condition' || condition"
            [class.bg-cyan-50]="condition"
            [class.dark:bg-cyan-950]="condition"
            [class.text-cyan-700]="condition"
            [class.dark:text-cyan-300]="condition"
          >
            <span>{{ condition || 'Todos los estados' }}</span>
            <span class="material-symbols-outlined text-[16px] text-slate-400 dark:text-stone-400 transition-transform duration-200" [class.rotate-180]="openDropdown() === 'condition'">
              expand_more
            </span>
          </button>

          @if (openDropdown() === 'condition') {
            <div class="fixed inset-0 z-30" (click)="closeDropdowns()"></div>
            <div class="absolute left-0 top-full mt-2 w-52 bg-white/95 dark:bg-[#162125]/95 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl py-1.5 z-40 max-h-60 overflow-y-auto divide-y divide-slate-50 dark:divide-white/5">
              <button
                type="button"
                (click)="selectConditionOption('')"
                class="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#007782]/10 dark:hover:bg-white/10 hover:text-[#007782] dark:hover:text-[#2dd4bf] flex items-center justify-between transition-colors text-slate-700 dark:text-stone-200"
                [class.font-bold]="!condition"
                [class.text-cyan-700]="!condition"
                [class.dark:text-cyan-300]="!condition"
              >
                <span>Todos los estados</span>
                @if (!condition) { <span class="material-symbols-outlined text-[15px]">check</span> }
              </button>
              @for (cond of conditions; track cond) {
                <button
                  type="button"
                  (click)="selectConditionOption(cond)"
                  class="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#007782]/10 dark:hover:bg-white/10 hover:text-[#007782] dark:hover:text-[#2dd4bf] flex items-center justify-between transition-colors text-slate-700 dark:text-stone-200"
                  [class.font-bold]="condition === cond"
                  [class.text-cyan-700]="condition === cond"
                  [class.dark:text-cyan-300]="condition === cond"
                >
                  <span>{{ cond }}</span>
                  @if (condition === cond) { <span class="material-symbols-outlined text-[15px]">check</span> }
                </button>
              }
            </div>
          }
        </div>

        <!-- Desplegable Personalizado: Talla -->
        <div class="relative">
          <button
            type="button"
            (click)="toggleDropdown('size')"
            class="flex items-center gap-1.5 bg-slate-50/90 dark:bg-[#1b262a]/95 hover:bg-slate-100 dark:hover:bg-[#233136] text-slate-800 dark:text-stone-200 px-3.5 py-2 rounded-full text-xs font-semibold cursor-pointer border border-slate-200/80 dark:border-white/10 shadow-2xs hover:border-[#007782]/40 dark:hover:border-[#2dd4bf]/40 transition-all select-none"
            [class.border-cyan-700]="openDropdown() === 'size' || size"
            [class.bg-cyan-50]="size"
            [class.dark:bg-cyan-950]="size"
            [class.text-cyan-700]="size"
            [class.dark:text-cyan-300]="size"
          >
            <span>{{ size ? 'Talla ' + size : 'Todas las tallas' }}</span>
            <span class="material-symbols-outlined text-[16px] text-slate-400 dark:text-stone-400 transition-transform duration-200" [class.rotate-180]="openDropdown() === 'size'">
              expand_more
            </span>
          </button>

          @if (openDropdown() === 'size') {
            <div class="fixed inset-0 z-30" (click)="closeDropdowns()"></div>
            <div class="absolute left-0 top-full mt-2 w-44 bg-white/95 dark:bg-[#162125]/95 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl py-1.5 z-40 max-h-60 overflow-y-auto divide-y divide-slate-50 dark:divide-white/5">
              <button
                type="button"
                (click)="selectSizeOption('')"
                class="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#007782]/10 dark:hover:bg-white/10 hover:text-[#007782] dark:hover:text-[#2dd4bf] flex items-center justify-between transition-colors text-slate-700 dark:text-stone-200"
                [class.font-bold]="!size"
                [class.text-cyan-700]="!size"
                [class.dark:text-cyan-300]="!size"
              >
                <span>Todas las tallas</span>
                @if (!size) { <span class="material-symbols-outlined text-[15px]">check</span> }
              </button>
              @for (sz of sizes; track sz) {
                <button
                  type="button"
                  (click)="selectSizeOption(sz)"
                  class="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#007782]/10 dark:hover:bg-white/10 hover:text-[#007782] dark:hover:text-[#2dd4bf] flex items-center justify-between transition-colors text-slate-700 dark:text-stone-200"
                  [class.font-bold]="size === sz"
                  [class.text-cyan-700]="size === sz"
                  [class.dark:text-cyan-300]="size === sz"
                >
                  <span>Talla {{ sz }}</span>
                  @if (size === sz) { <span class="material-symbols-outlined text-[15px]">check</span> }
                </button>
              }
            </div>
          }
        </div>

        <!-- Selector de Precio con Slider Dual Estilizado -->
        <div class="flex items-center gap-3 bg-slate-50/90 dark:bg-[#1b262a]/95 px-4 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 shadow-2xs min-w-[220px]">
          <span class="text-xs font-bold text-[#007782] dark:text-[#2dd4bf] whitespace-nowrap">
            {{ currentMin }}€ - {{ currentMax >= maxLimit ? maxLimit + '+€' : currentMax + '€' }}
          </span>
          <div class="relative flex-1 h-5 flex items-center min-w-[100px]">
            <div class="w-full h-1.5 bg-slate-200 dark:bg-[#25363d] rounded-full"></div>
            <div
              class="absolute h-1.5 bg-[#007782] dark:bg-[#2dd4bf] rounded-full shadow-xs"
              [style.left.%]="minPercent"
              [style.width.%]="maxPercent - minPercent"
            ></div>
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

        <!-- Desplegable Personalizado: Ordenación -->
        <div class="relative ml-auto">
          <button
            type="button"
            (click)="toggleDropdown('sort')"
            class="flex items-center gap-1.5 bg-slate-50/90 dark:bg-[#1b262a]/95 hover:bg-slate-100 dark:hover:bg-[#233136] text-slate-800 dark:text-stone-200 px-3.5 py-2 rounded-full text-xs font-bold cursor-pointer border border-slate-200/80 dark:border-white/10 shadow-2xs hover:border-[#007782]/40 dark:hover:border-[#2dd4bf]/40 transition-all select-none"
            [class.border-cyan-700]="openDropdown() === 'sort'"
          >
            <span class="material-symbols-outlined text-[15px] text-[#007782] dark:text-[#2dd4bf]">sort</span>
            <span>{{ currentSortLabel }}</span>
            <span class="material-symbols-outlined text-[16px] text-slate-400 dark:text-stone-400 transition-transform duration-200" [class.rotate-180]="openDropdown() === 'sort'">
              expand_more
            </span>
          </button>

          @if (openDropdown() === 'sort') {
            <div class="fixed inset-0 z-30" (click)="closeDropdowns()"></div>
            <div class="absolute right-0 top-full mt-2 w-52 bg-white/95 dark:bg-[#162125]/95 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl py-1.5 z-40 divide-y divide-slate-50 dark:divide-white/5">
              @for (opt of sortOptions; track opt.value) {
                <button
                  type="button"
                  (click)="selectSortOption(opt.value)"
                  class="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#007782]/10 dark:hover:bg-white/10 hover:text-[#007782] dark:hover:text-[#2dd4bf] flex items-center justify-between transition-colors text-slate-700 dark:text-stone-200"
                  [class.font-bold]="(sortBy + ':' + order) === opt.value"
                  [class.text-cyan-700]="(sortBy + ':' + order) === opt.value"
                  [class.dark:text-cyan-300]="(sortBy + ':' + order) === opt.value"
                >
                  <span>{{ opt.label }}</span>
                  @if ((sortBy + ':' + order) === opt.value) {
                    <span class="material-symbols-outlined text-[15px]">check</span>
                  }
                </button>
              }
            </div>
          }
        </div>

        <!-- Botón Limpiar Filtros -->
        @if (hasActiveFilters) {
          <button
            type="button"
            (click)="reset.emit()"
            class="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100/70 dark:hover:bg-rose-900/40 border border-rose-200/60 dark:border-rose-900/60 px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-2xs"
          >
            <span class="material-symbols-outlined text-[15px]">restart_alt</span>
            <span>Limpiar</span>
          </button>
        }
      </div>

      <!-- Fila de Chips de Filtros Activos y Contador de Resultados -->
      <div class="flex items-center justify-between text-xs text-slate-500 dark:text-stone-400 pt-2 border-t border-slate-100 dark:border-white/10">
        <div class="flex flex-wrap items-center gap-1.5">
          @if (category) {
            <span class="inline-flex items-center gap-1.5 bg-[#007782]/10 dark:bg-[#2dd4bf]/15 text-[#007782] dark:text-[#2dd4bf] border border-[#007782]/20 dark:border-[#2dd4bf]/30 px-3 py-0.5 rounded-full font-bold text-xs">
              {{ category }}
              <button type="button" (click)="onCategoryChange('')" class="hover:text-rose-600 font-bold cursor-pointer text-sm leading-none">×</button>
            </span>
          }
          @if (brand) {
            <span class="inline-flex items-center gap-1.5 bg-[#d97757]/15 dark:bg-[#d97757]/25 text-[#d97757] dark:text-[#f29b7f] border border-[#d97757]/30 dark:border-[#d97757]/40 px-3 py-0.5 rounded-full font-bold text-xs">
              {{ brand }}
              <button type="button" (click)="onBrandChange('')" class="hover:text-rose-600 font-bold cursor-pointer text-sm leading-none">×</button>
            </span>
          }
          @if (location) {
            <span class="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 px-3 py-0.5 rounded-full font-semibold text-xs">
              {{ location }}
              <button type="button" (click)="onLocationChange('')" class="hover:text-rose-600 font-bold cursor-pointer text-sm leading-none">×</button>
            </span>
          }
          @if (condition) {
            <span class="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 px-3 py-0.5 rounded-full font-semibold text-xs">
              {{ condition }}
              <button type="button" (click)="onConditionChange('')" class="hover:text-rose-600 font-bold cursor-pointer text-sm leading-none">×</button>
            </span>
          }
          @if (size) {
            <span class="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-[#1f2d32] text-slate-700 dark:text-stone-300 border border-slate-200 dark:border-white/10 px-3 py-0.5 rounded-full font-semibold text-xs">
              Talla: {{ size }}
              <button type="button" (click)="onSizeChange('')" class="hover:text-rose-600 font-bold cursor-pointer text-sm leading-none">×</button>
            </span>
          }
          @if (minPrice !== null || maxPrice !== null) {
            <span class="inline-flex items-center gap-1.5 bg-[#007782]/10 dark:bg-[#2dd4bf]/15 text-[#007782] dark:text-[#2dd4bf] border border-[#007782]/20 dark:border-[#2dd4bf]/30 px-3 py-0.5 rounded-full font-bold text-xs">
              {{ currentMin }}€ - {{ currentMax >= maxLimit ? maxLimit + '+€' : currentMax + '€' }}
              <button type="button" (click)="clearPriceFilter()" class="hover:text-rose-600 font-bold cursor-pointer text-sm leading-none">×</button>
            </span>
          }
        </div>

        <div class="text-xs text-slate-500 dark:text-stone-400 font-medium shrink-0 ml-2">
          Prendas disponibles: <strong class="text-slate-900 dark:text-stone-100 font-black text-sm">{{ totalResults }}</strong>
        </div>
      </div>

    </div>
  `
})
export class FilterBarComponent {
  @Input() category = '';
  @Input() brand = '';
  @Input() location = '';
  @Input() host = '';
  @Input() condition = '';
  @Input() size = '';
  @Input() minPrice: number | null = null;
  @Input() maxPrice: number | null = null;
  @Input() sortBy = 'createdAt';
  @Input() order: 'asc' | 'desc' = 'desc';
  @Input() totalResults = 0;

  @Output() filterChange = new EventEmitter<Partial<FilterCriteria>>();
  @Output() reset = new EventEmitter<void>();

  openDropdown = signal<string | null>(null);

  readonly minLimit = 0;
  readonly maxLimit = 300;

  currentMin = 0;
  currentMax = 300;

  categories = ['Vestidos', 'Zapatillas', 'Chaquetas', 'Bolsos', 'Vintage', 'Punto'];
  brands = ['Nike', "Levi's", 'Adidas', 'Zara', 'Carhartt', 'Converse'];
  conditions = ['Nuevo con etiquetas', 'Muy bueno', 'Bueno', 'Con señales de uso'];
  sizes = ['XS', 'S', 'M', 'L', 'XL', '38', '39', '40', '41', '42'];

  sortOptions = [
    { label: 'Más recientes', value: 'createdAt:desc' },
    { label: 'Precio: menor a mayor', value: 'price:asc' },
    { label: 'Precio: mayor a menor', value: 'price:desc' },
    { label: 'Nombre: A - Z', value: 'title:asc' }
  ];

  get currentSortLabel(): string {
    const comp = `${this.sortBy}:${this.order}`;
    const found = this.sortOptions.find(o => o.value === comp);
    return found ? found.label : 'Más recientes';
  }

  ngOnChanges() {
    this.currentMin = this.minPrice !== null && this.minPrice !== undefined ? this.minPrice : this.minLimit;
    this.currentMax = this.maxPrice !== null && this.maxPrice !== undefined ? this.maxPrice : this.maxLimit;
  }

  toggleDropdown(name: string): void {
    this.openDropdown.update(curr => (curr === name ? null : name));
  }

  closeDropdowns(): void {
    this.openDropdown.set(null);
  }

  selectCategoryOption(val: string): void {
    this.onCategoryChange(val);
    this.closeDropdowns();
  }

  selectBrandOption(val: string): void {
    this.onBrandChange(val);
    this.closeDropdowns();
  }

  selectConditionOption(val: string): void {
    this.onConditionChange(val);
    this.closeDropdowns();
  }

  selectSizeOption(val: string): void {
    this.onSizeChange(val);
    this.closeDropdowns();
  }

  selectSortOption(val: string): void {
    this.onSortChange(val);
    this.closeDropdowns();
  }

  get minPercent(): number {
    return Math.round(((this.currentMin - this.minLimit) / (this.maxLimit - this.minLimit)) * 100);
  }

  get maxPercent(): number {
    return Math.round(((this.currentMax - this.minLimit) / (this.maxLimit - this.minLimit)) * 100);
  }

  get hasActiveFilters(): boolean {
    return !!(
      this.category ||
      this.brand ||
      this.location ||
      this.host ||
      this.condition ||
      this.size ||
      this.minPrice !== null ||
      this.maxPrice !== null
    );
  }

  onCategoryChange(category: string) {
    this.filterChange.emit({ category });
  }

  onBrandChange(brand: string) {
    this.filterChange.emit({ brand });
  }

  onConditionChange(condition: string) {
    this.filterChange.emit({ condition });
  }

  onSizeChange(size: string) {
    this.filterChange.emit({ size });
  }

  onLocationChange(location: string) {
    this.filterChange.emit({ location });
  }

  onHostChange(host: string) {
    this.filterChange.emit({ host });
  }

  onMinSliderChange(val: number) {
    const num = Number(val);
    if (num <= this.currentMax) {
      this.currentMin = num;
      this.emitPriceChange();
    }
  }

  onMaxSliderChange(val: number) {
    const num = Number(val);
    if (num >= this.currentMin) {
      this.currentMax = num;
      this.emitPriceChange();
    }
  }

  clearPriceFilter() {
    this.currentMin = this.minLimit;
    this.currentMax = this.maxLimit;
    this.filterChange.emit({ minPrice: null, maxPrice: null });
  }

  private emitPriceChange() {
    const min = this.currentMin === this.minLimit ? null : this.currentMin;
    const max = this.currentMax === this.maxLimit ? null : this.currentMax;
    this.filterChange.emit({ minPrice: min, maxPrice: max });
  }

  onSortChange(composite: string) {
    const [sortBy, order] = composite.split(':') as [string, 'asc' | 'desc'];
    this.filterChange.emit({ sortBy, order });
  }
}
