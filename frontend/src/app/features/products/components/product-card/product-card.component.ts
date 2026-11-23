import { Component, Input, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../core/models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
  @Input({ required: true }) product!: Product;

  private defaultFallback = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=80';
  imageUrl = signal<string>(this.defaultFallback);

  isFavorite = signal(false);
  favCount = signal(Math.floor(Math.random() * 40) + 12);

  fontVariationSettings = computed(() => {
    return this.isFavorite() ? "'FILL' 1" : "'FILL' 0";
  });

  ngOnInit(): void {
    if (this.product?.image) {
      this.imageUrl.set(this.product.image);
    }
  }

  onImageError(): void {
    this.imageUrl.set(this.defaultFallback);
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const current = this.isFavorite();
    this.isFavorite.set(!current);
    this.favCount.update(c => (!current ? c + 1 : Math.max(0, c - 1)));
  }
}
