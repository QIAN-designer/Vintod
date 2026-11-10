import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface LocationItem {
  id: string;
  name: string;
  slug?: string;
  country?: string;
  subtitle?: string;
  img: string;
  itemsCount?: string | number;
}

@Component({
  selector: 'app-location-card',
  standalone: true,
  template: `
    <div
      (click)="selectLocation.emit(location)"
      class="group relative min-w-[220px] sm:min-w-[250px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer bg-surface-container"
    >
      <img
        [src]="location.img"
        [alt]="location.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>

      <div class="absolute top-3 left-3 bg-surface/90 backdrop-blur-xs text-on-surface px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px] text-primary">location_on</span>
        <span>{{ location.country || 'Hub Circular' }}</span>
      </div>

      <div class="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
        <div>
          <h3 class="font-headline-sm text-lg font-extrabold leading-tight group-hover:text-secondary-fixed transition-colors">
            {{ location.name }}
          </h3>
          <p class="text-xs text-white/80">{{ location.subtitle || 'Envíos rápidos disponibles' }}</p>
        </div>
        @if (location.itemsCount) {
          <span class="text-xs font-bold bg-primary/90 text-on-primary px-2.5 py-1 rounded-full shrink-0">
            {{ location.itemsCount }}
          </span>
        }
      </div>
    </div>
  `
})
export class LocationCardComponent {
  @Input({ required: true }) location!: LocationItem;
  @Output() selectLocation = new EventEmitter<LocationItem>();
}
