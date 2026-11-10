import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductQueryParams, Brand, Category } from '../models/marketplace.model';
import { ApiResponse, PaginationMeta } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private productsUrl = `${this.apiUrl}/products`;

  // Signals reactivas en ShopService
  private productsSignal = signal<Product[]>([]);
  private categoriesSignal = signal<Category[]>([]);
  private brandsSignal = signal<Brand[]>([]);
  private hostsSignal = signal<any[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  private lastUrlSignal = signal<string>('');
  private paginationSignal = signal<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 1
  });

  // Exposición de Signals de solo lectura y computadas
  readonly products = this.productsSignal.asReadonly();
  readonly categories = this.categoriesSignal.asReadonly();
  readonly brands = this.brandsSignal.asReadonly();
  readonly hosts = this.hostsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly lastUrl = this.lastUrlSignal.asReadonly();
  readonly pagination = this.paginationSignal.asReadonly();
  readonly totalProducts = computed(() => this.paginationSignal().total || this.productsSignal().length);

  /**
   * Construye la URL con formato ?key=value&key=value
   */
  buildUrl(endpointUrl: string, params?: Record<string, any>): string {
    if (!params) return endpointUrl;
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all') {
        searchParams.set(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${endpointUrl}?${queryString}` : endpointUrl;
  }

  /**
   * Obtiene productos con soporte de AbortSignal (AbortController) y actualiza Signals
   */
  async getShopProducts(
    params?: ProductQueryParams,
    signal?: AbortSignal
  ): Promise<ApiResponse<Product[]>> {
    const url = this.buildUrl(this.productsUrl, params as Record<string, any>);
    this.lastUrlSignal.set(url);
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        signal,
      });

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }

      const res: ApiResponse<Product[]> = await response.json();
      const items = res.data || [];
      this.productsSignal.set(items);

      if (res.pagination) {
        this.paginationSignal.set(res.pagination);
      } else {
        this.paginationSignal.set({
          total: items.length,
          page: Number(params?.page) || 1,
          limit: Number(params?.limit) || 8,
          totalPages: 1
        });
      }

      this.loadingSignal.set(false);
      return res;
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        this.errorSignal.set(err?.message || 'Error al cargar el catálogo de la tienda');
        this.loadingSignal.set(false);
      }
      throw err;
    }
  }

  /**
   * Carga las categorías, marcas y hosts desde el backend actualizando Signals
   */
  async loadCatalogMetadata(): Promise<void> {
    try {
      const [catsRes, brandsRes, profilesRes] = await Promise.all([
        firstValueFrom(this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/categories?active=true`)),
        firstValueFrom(this.http.get<ApiResponse<Brand[]>>(`${this.apiUrl}/brands?active=true`)),
        firstValueFrom(this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/profiles?limit=10`))
      ]);

      if (catsRes?.data) this.categoriesSignal.set(catsRes.data);
      if (brandsRes?.data) this.brandsSignal.set(brandsRes.data);
      if (profilesRes?.data) this.hostsSignal.set(profilesRes.data);
    } catch {
      // Silencioso en caso de fallo de metadatos secundarios
    }
  }
}
