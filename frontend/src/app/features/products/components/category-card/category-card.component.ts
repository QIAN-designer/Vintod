import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface CategoryCardItem {
  id: string;
  name: string;
  slug?: string;
  count: string;
  img: string;
}

@Component({
  selector: 'app-category-card',
  standalone: true,
  template: `
    <div
      (click)="selectCategory.emit(category.name)"
      class="group flex flex-col bg-surface-container-low hover:bg-surface-container rounded-2xl overflow-hidden p-space-xs transition-all shadow-xs hover:shadow-md cursor-pointer min-w-[175px] sm:min-w-[195px]"
      [class.ring-2]="active"
      [class.ring-primary]="active"
    >
      <div class="aspect-square w-full rounded-xl overflow-hidden bg-surface-container-highest relative">
        <img
          [src]="category.img"
          [alt]="category.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div class="py-space-sm px-space-xs text-center">
        <span class="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors block font-bold">
          {{ category.name }}
        </span>
        <span class="font-body-sm text-body-sm text-outline">{{ category.count }}</span>
      </div>
    </div>
  `
})
export class CategoryCardComponent {
  @Input({ required: true }) category!: CategoryCardItem;
  @Input() active = false;
  @Output() selectCategory = new EventEmitter<string>();
}
