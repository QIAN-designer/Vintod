import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface HostItem {
  id: string;
  name: string;
  rating: string | number;
  sales: number;
  avatar: string;
  bio: string;
  city?: string;
  itemsCount: number;
  isFollowing?: boolean;
  previewImgs?: string[];
}

@Component({
  selector: 'app-host-card',
  standalone: true,
  template: `
    <div class="bg-surface rounded-2xl p-space-md shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-space-md min-w-[300px] sm:min-w-[340px] h-full border border-outline-variant/20">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-3 cursor-pointer" (click)="selectHost.emit(host)">
          <div class="relative shrink-0">
            <img [src]="host.avatar" [alt]="host.name" class="w-12 h-12 rounded-full object-cover" />
            <span class="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-surface"></span>
          </div>
          <div>
            <div class="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight hover:text-primary transition-colors">
              {{ host.name }}
            </div>
            <div class="flex items-center gap-1 text-outline font-label-md text-label-md">
              <span class="material-symbols-outlined text-[14px] text-tertiary" style="font-variation-settings: 'FILL' 1;">star</span>
              <span class="text-on-surface font-semibold">{{ host.rating }}</span>
              <span>({{ host.sales }} ventas)</span>
              @if (host.city) {
                <span>· {{ host.city }}</span>
              }
            </div>
          </div>
        </div>
        <button
          type="button"
          (click)="onFollowClick($event)"
          class="px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 cursor-pointer shrink-0"
          [class.bg-surface-container-high]="!host.isFollowing"
          [class.text-on-surface]="!host.isFollowing"
          [class.bg-secondary]="host.isFollowing"
          [class.text-on-secondary]="host.isFollowing"
        >
          {{ host.isFollowing ? 'Siguiendo' : 'Seguir' }}
        </button>
      </div>

      <p class="font-body-sm text-body-sm text-on-surface-variant italic line-clamp-2">
        "{{ host.bio }}"
      </p>

      @if (host.previewImgs && host.previewImgs.length > 0) {
        <div class="grid grid-cols-3 gap-2">
          @for (img of host.previewImgs; track img) {
            <div
              (click)="selectHost.emit(host)"
              class="aspect-square rounded-xl overflow-hidden bg-surface-container cursor-pointer"
            >
              <img [src]="img" [alt]="host.name" class="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          }
        </div>
      }

      <div class="flex items-center justify-between pt-space-xs text-outline font-label-md text-label-md border-t border-outline-variant/20">
        <span>Envía en menos de 24h</span>
        <button
          type="button"
          (click)="selectHost.emit(host)"
          class="text-primary font-bold hover:underline cursor-pointer"
        >
          {{ host.itemsCount }} disponibles →
        </button>
      </div>
    </div>
  `
})
export class HostCardComponent {
  @Input({ required: true }) host!: HostItem;
  @Output() followToggle = new EventEmitter<HostItem>();
  @Output() selectHost = new EventEmitter<HostItem>();

  onFollowClick(event: Event) {
    event.stopPropagation();
    this.host.isFollowing = !this.host.isFollowing;
    this.followToggle.emit(this.host);
  }
}
