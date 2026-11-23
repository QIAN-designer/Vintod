import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  template: `
    <div class="relative w-full group/carousel">
      <!-- Contenedor scrollable horizontal con soporte táctil y smooth scroll -->
      <div
        #scrollContainer
        class="flex items-stretch gap-4 overflow-x-auto scroll-smooth py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <ng-content></ng-content>
      </div>

      <!-- Controles laterales circulares con flechas de desplazamiento -->
      @if (showControls) {
        <button
          type="button"
          (click)="scrollLeft()"
          class="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-md text-slate-700 hover:text-slate-900 hover:bg-white active:scale-95 flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100"
          aria-label="Desplazar a la izquierda"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>

        <button
          type="button"
          (click)="scrollRight()"
          class="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-md text-slate-700 hover:text-slate-900 hover:bg-white active:scale-95 flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100"
          aria-label="Desplazar a la derecha"
        >
          <span class="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      }
    </div>
  `
})
export class CarouselComponent {
  @Input() scrollStep = 300;
  @Input() showControls = true;

  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLDivElement>;

  scrollLeft(): void {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollBy({ left: -this.scrollStep, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollBy({ left: this.scrollStep, behavior: 'smooth' });
    }
  }
}
