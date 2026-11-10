import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product, ProductQueryParams, Brand, Category } from '../models/marketplace.model';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/products`;
  private apiUrl = environment.apiUrl;

  /**
   * Construye una URL completa añadiendo los query params válidos
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
   * Petición GET con soporte nativo para AbortSignal (AbortController) y buildUrl
   */
  async fetchProductsWithSignal(
    params?: ProductQueryParams,
    signal?: AbortSignal
  ): Promise<ApiResponse<Product[]>> {
    const url = this.buildUrl(this.baseUrl, params as Record<string, any>);
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal,
    });
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }
    return response.json();
  }

  /**
   * Alias compatible con nomenclatura getEvents(queryParams, signal)
   */
  getEvents(
    params?: ProductQueryParams,
    signal?: AbortSignal
  ): Promise<ApiResponse<Product[]>> {
    return this.fetchProductsWithSignal(params, signal);
  }

  getProducts(params?: ProductQueryParams, signal?: AbortSignal): Observable<ApiResponse<Product[]>> {
    const url = this.buildUrl(this.baseUrl, params as Record<string, any>);

    if (signal) {
      return new Observable<ApiResponse<Product[]>>(observer => {
        const sub = this.http.get<ApiResponse<Product[]>>(url).subscribe({
          next: res => observer.next(res),
          error: err => observer.error(err),
          complete: () => observer.complete(),
        });

        const onAbort = () => {
          sub.unsubscribe();
          observer.complete();
        };

        if (signal.aborted) {
          sub.unsubscribe();
          observer.complete();
        } else {
          signal.addEventListener('abort', onAbort, { once: true });
        }

        return () => {
          signal.removeEventListener('abort', onAbort);
          sub.unsubscribe();
        };
      });
    }

    return this.http.get<ApiResponse<Product[]>>(url);
  }

  getBrands(params?: Record<string, any>): Observable<ApiResponse<Brand[]>> {
    const url = this.buildUrl(`${this.apiUrl}/brands`, params);
    return this.http.get<ApiResponse<Brand[]>>(url);
  }

  getCategories(params?: Record<string, any>): Observable<ApiResponse<Category[]>> {
    const url = this.buildUrl(`${this.apiUrl}/categories`, params);
    return this.http.get<ApiResponse<Category[]>>(url);
  }

  getProfiles(params?: Record<string, any>): Observable<ApiResponse<any[]>> {
    const url = this.buildUrl(`${this.apiUrl}/profiles`, params);
    return this.http.get<ApiResponse<any[]>>(url);
  }

  getDeletedProducts(params?: Record<string, any>): Observable<ApiResponse<Product[]>> {
    const url = this.buildUrl(`${this.baseUrl}/deleted`, params);
    return this.http.get<ApiResponse<Product[]>>(url);
  }

  getProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/${id}`);
  }

  getProductBySlug(slug: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/slug/${slug}`);
  }

  createProduct(product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(this.baseUrl, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.baseUrl}/${id}`, product);
  }

  patchProduct(id: string, product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(`${this.baseUrl}/${id}`, product);
  }

  activateProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(`${this.baseUrl}/${id}/activate`, {});
  }

  deactivateProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(`${this.baseUrl}/${id}/deactivate`, {});
  }

  deleteProduct(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }

  restoreProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.baseUrl}/${id}/restore`, {});
  }
}
