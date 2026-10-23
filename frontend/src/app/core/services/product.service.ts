import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../models/marketplace.model';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/products`;

  getProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(this.baseUrl);
  }

  getDeletedProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.baseUrl}/deleted`);
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

