import { Component, Input, signal, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    if (this.product?.image) {
      this.imageUrl.set(this.product.image);
    }
  }

  onImageError(): void {
    this.imageUrl.set(this.defaultFallback);
  }
}
