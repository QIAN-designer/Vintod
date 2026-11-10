import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    @if (totalPages > 1) {
      <nav class="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-outline-variant/25 mt-6" aria-label="Paginación">
        <div class="text-xs text-outline">
          Mostrando página <strong class="text-on-surface">{{ currentPage }}</strong> de
          <strong class="text-on-surface">{{ totalPages }}</strong>
          ({{ total }} artículos en total)
        </div>

        <div class="flex items-center gap-1.5">
          <button
            type="button"
            [disabled]="currentPage <= 1"
            (click)="selectPage(currentPage - 1)"
            class="px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-container-low text-on-surface hover:bg-surface-container disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined text-[16px]">chevron_left</span>
            <span>Anterior</span>
          </button>

          @for (p of pages(); track p) {
            <button
              type="button"
              (click)="selectPage(p)"
              class="w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer"
              [class.bg-primary]="p === currentPage"
              [class.text-on-primary]="p === currentPage"
              [class.shadow-xs]="p === currentPage"
              [class.bg-surface-container-low]="p !== currentPage"
              [class.text-on-surface]="p !== currentPage"
              [class.hover:bg-surface-container]="p !== currentPage"
            >
              {{ p }}
            </button>
          }

          <button
            type="button"
            [disabled]="currentPage >= totalPages"
            (click)="selectPage(currentPage + 1)"
            class="px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-container-low text-on-surface hover:bg-surface-container disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Siguiente</span>
            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </nav>
    }
  `
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() total = 0;
  @Input() limit = 8;
  @Output() pageChange = new EventEmitter<number>();

  pages(): number[] {
    const result: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  selectPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.pageChange.emit(page);
  }
}
