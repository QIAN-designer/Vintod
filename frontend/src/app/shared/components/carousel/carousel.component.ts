import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  template: `
    <div class="w-full">
      <div class="flex items-end justify-between mb-4 gap-4">
        <div>
          @if (badge) {
            <div class="inline-flex items-center gap-1 text-secondary font-label-md text-label-md uppercase tracking-wider mb-1">
              <span class="material-symbols-outlined text-[16px]">{{ badgeIcon }}</span>
              <span>{{ badge }}</span>
            </div>
          }
          @if (title) {
            <h2 class="font-headline-md text-headline-md text-on-surface font-bold">{{ title }}</h2>
          }
          @if (subtitle) {
            <p class="font-body-sm text-body-sm text-outline">{{ subtitle }}</p>
          }
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            (click)="scrollLeft()"
            class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
            aria-label="Anterior"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button
            type="button"
            (click)="scrollRight()"
            class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
            aria-label="Siguiente"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>

      <div
        #scrollContainer
        class="flex items-stretch gap-4 overflow-x-auto scroll-smooth scrollbar-none pb-2 pt-1"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CarouselComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() badge = '';
  @Input() badgeIcon = 'verified';
  @Input() scrollStep = 360;

  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollBy({ left: -this.scrollStep, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollBy({ left: this.scrollStep, behavior: 'smooth' });
    }
  }
}
