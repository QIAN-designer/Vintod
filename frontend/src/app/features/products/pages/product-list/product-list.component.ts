import { Component, OnInit, inject } from "@angular/core";
import { ProductsStore } from "../../../../core/store/products.store";
import { EmptyStateComponent } from "../../../../shared/components/empty-state/empty-state.component";
import { ErrorStateComponent } from "../../../../shared/components/error-state/error-state.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ProductSkeletonComponent } from "../../components/product-skeleton/product-skeleton.component";

@Component({
    selector: "app-product-list",
    standalone: true,
    imports: [ProductCardComponent, ProductSkeletonComponent, EmptyStateComponent, ErrorStateComponent],
    template: `
        <div>
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">Novedades</h1>
                <p class="mt-1 text-sm text-gray-500">Descubre las últimas prendas añadidas a Vintod.</p>
            </div>

            @if (store.error()) {
                <app-error-state [message]="store.error()!" (retry)="loadProducts()"></app-error-state>
            } @else if (store.loading()) {
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    @for (i of [1, 2, 3, 4, 5, 6, 7, 8]; track i) {
                        <app-product-skeleton></app-product-skeleton>
                    }
                </div>
            } @else {
                @if (store.visibleProducts().length === 0) {
                    <app-empty-state></app-empty-state>
                } @else {
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        @for (product of store.visibleProducts(); track product._id) {
                            <app-product-card [product]="product"></app-product-card>
                        }
                    </div>
                }
            }
        </div>
    `,
})
export class ProductListComponent implements OnInit {
    store = inject(ProductsStore);

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.store.loadProducts();
    }
}
