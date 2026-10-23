import { Component } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-create-page',
  standalone: true,
  imports: [ProductFormComponent],
  template: `
    <div class="py-6">
      <app-product-form mode="create"></app-product-form>
    </div>
  `
})
export class ProductCreatePageComponent {}

