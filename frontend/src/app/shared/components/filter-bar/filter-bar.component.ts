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

        <!-- Rango de Precio -->
        <div class="flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-full border border-outline-variant/30 shadow-2xs">
          <span class="text-xs text-outline font-medium">€</span>
          <input
            type="number"
            min="0"
            placeholder="Mín"
            [ngModel]="minPrice"
            (ngModelChange)="onMinPriceChange($event)"
            class="w-14 text-xs bg-transparent outline-none text-on-surface"
          />
          <span class="text-outline">-</span>
          <input
            type="number"
            min="0"
            placeholder="Máx"
            [ngModel]="maxPrice"
            (ngModelChange)="onMaxPriceChange($event)"
            class="w-14 text-xs bg-transparent outline-none text-on-surface"
          />
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

  @Input() categories: string[] = ['Vestidos', 'Zapatillas', 'Chaquetas', 'Bolsos', 'Vintage', 'Punto', 'Sudaderas', 'Pantalones'];
  @Input() brands: string[] = ['Nike', "Levi's", 'Zara', 'Carhartt', 'Sézane', 'Adidas', 'Ralph Lauren', 'Vintage'];
  @Input() conditions: string[] = ['Nuevo con etiquetas', 'Muy bueno', 'Bueno', 'Satisfactorio'];
  @Input() sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', '38', '40', '42', 'Única'];

  @Output() filterChange = new EventEmitter<Partial<FilterCriteria>>();
  @Output() reset = new EventEmitter<void>();

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

  onMinPriceChange(val: any) {
    const parsed = val === '' || val === null ? null : Number(val);
    this.minPrice = parsed;
    this.filterChange.emit({ minPrice: parsed });
  }

  onMaxPriceChange(val: any) {
    const parsed = val === '' || val === null ? null : Number(val);
    this.maxPrice = parsed;
    this.filterChange.emit({ maxPrice: parsed });
  }

  onSortChange(combined: string) {
    const [sortBy, order] = combined.split(':');
    this.sortBy = sortBy || 'createdAt';
    this.order = (order === 'asc' ? 'asc' : 'desc');
    this.filterChange.emit({ sortBy: this.sortBy, order: this.order });
  }
}
