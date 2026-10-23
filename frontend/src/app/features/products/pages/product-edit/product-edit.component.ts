import { Component, Input } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-edit-page',
  standalone: true,
  imports: [ProductFormComponent],
  template: `
    <div class="py-6">
      <app-product-form [id]="id" mode="edit"></app-product-form>
    </div>
  `
})
export class ProductEditPageComponent {
  @Input() id!: string;
}

