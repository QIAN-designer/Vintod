import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product, ProductQueryParams } from '../models/marketplace.model';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  buildUrl(endpointUrl: string, params?: Record<string, any>): string {
    if (!params) return endpointUrl;
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all') {
        searchParams.set(key, String(value));
      }
    });
    const qs = searchParams.toString();
    return qs ? `${endpointUrl}?${qs}` : endpointUrl;
  }

  getProducts(params?: ProductQueryParams): Observable<ApiResponse<Product[]>> {
    const url = this.buildUrl(`${this.baseUrl}/products`, params as Record<string, any>);
    return this.http.get<ApiResponse<Product[]>>(url);
  }

  getDeletedProducts(params?: Record<string, any>): Observable<ApiResponse<Product[]>> {
    const url = this.buildUrl(`${this.baseUrl}/products/deleted`, params);
    return this.http.get<ApiResponse<Product[]>>(url);
  }

  getProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/products/${id}`);
  }

  getProductBySlug(slug: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/products/slug/${slug}`);
  }

  createProduct(product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.baseUrl}/products`, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.baseUrl}/products/${id}`, product);
  }

  patchProduct(id: string, product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(`${this.baseUrl}/products/${id}`, product);
  }

  activateProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(`${this.baseUrl}/products/${id}/activate`, {});
  }

  deactivateProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(`${this.baseUrl}/products/${id}/deactivate`, {});
  }

  deleteProduct(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/products/${id}`);
  }

  restoreProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.baseUrl}/products/${id}/restore`, {});
  }
}
