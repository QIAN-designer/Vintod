import { Component, Input, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../core/models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  isFavorite = signal(false);
  favCount = signal(Math.floor(Math.random() * 40) + 12);

  fontVariationSettings = computed(() => {
    return this.isFavorite() ? "'FILL' 1" : "'FILL' 0";
  });

  toggleFavorite(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const current = this.isFavorite();
    this.isFavorite.set(!current);
    this.favCount.update(c => (!current ? c + 1 : Math.max(0, c - 1)));
  }
}
