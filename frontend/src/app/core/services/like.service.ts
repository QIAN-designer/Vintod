import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';

export interface ProductLikeStatus {
  productId: string;
  likesCount: number;
  likedByMe: boolean;
}

export interface LikeApiResponse {
  success: boolean;
  data: ProductLikeStatus & {
    like?: {
      id: string;
      userId: string;
      productId: string;
      createdAt: string;
    };
  };
}

export interface MyFavoritesApiResponse {
  success: boolean;
  data: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/likes`;

  private httpOptions = {
    withCredentials: true,
  };

  getMyFavorites(): Observable<MyFavoritesApiResponse> {
    return this.http.get<MyFavoritesApiResponse>(
      `${this.baseUrl}/me`,
      this.httpOptions
    );
  }

  getProductLikes(productId: string): Observable<LikeApiResponse> {
    return this.http.get<LikeApiResponse>(
      `${this.baseUrl}/product/${productId}`,
      this.httpOptions
    );
  }

  likeProduct(productId: string): Observable<LikeApiResponse> {
    return this.http.post<LikeApiResponse>(
      `${this.baseUrl}/product/${productId}`,
      {},
      this.httpOptions
    );
  }

  unlikeProduct(productId: string): Observable<LikeApiResponse> {
    return this.http.delete<LikeApiResponse>(
      `${this.baseUrl}/product/${productId}`,
      this.httpOptions
    );
  }
}
