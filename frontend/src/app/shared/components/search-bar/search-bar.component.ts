import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="relative w-full">
      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
        <span class="material-symbols-outlined text-[20px]">search</span>
      </div>
      <input
        type="text"
        [placeholder]="placeholder"
        [ngModel]="searchTerm"
        (ngModelChange)="onSearchChange($event)"
        (keyup.enter)="emitImmediate()"
        class="block w-full pl-10 pr-10 py-2.5 text-sm bg-surface-container-low border border-outline-variant/40 rounded-full text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface transition-all"
      />
      @if (searchTerm) {
        <button
          type="button"
          (click)="clear()"
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface cursor-pointer"
          title="Borrar búsqueda"
        >
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      }
    </div>
  `
})
export class SearchBarComponent implements OnDestroy {
  @Input() placeholder = 'Buscar ropa, marcas o artículos...';
  @Input() searchTerm = '';
  @Input() debounceMs = 350;
  @Output() searchChange = new EventEmitter<string>();

  private debounceTimer: any = null;

  onSearchChange(val: string) {
    this.searchTerm = val;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    if (this.debounceMs > 0) {
      this.debounceTimer = setTimeout(() => {
        this.searchChange.emit(this.searchTerm);
      }, this.debounceMs);
    } else {
      this.searchChange.emit(this.searchTerm);
    }
  }

  emitImmediate() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.searchChange.emit(this.searchTerm);
  }

  clear() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.searchTerm = '';
    this.searchChange.emit('');
  }

  ngOnDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}
