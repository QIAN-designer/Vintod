import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ReviewAuthor {
  id: string;
  username: string;
  avatarUrl?: string | null;
  city?: string | null;
}

export interface UserReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
  author: ReviewAuthor;
}

export interface UserReviewsSummary {
  targetUserId: string;
  ratingAverage: number;
  ratingCount: number;
  distribution: Record<number, number>;
  reviews: UserReview[];
}

export interface ReviewsApiResponse {
  success: boolean;
  data: UserReviewsSummary;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/reviews`;

  private httpOptions = {
    withCredentials: true,
  };

  getMyReviews(): Observable<ReviewsApiResponse> {
    return this.http.get<ReviewsApiResponse>(`${this.baseUrl}/me`, this.httpOptions);
  }

  getUserReviews(userId: string): Observable<ReviewsApiResponse> {
    return this.http.get<ReviewsApiResponse>(
      `${this.baseUrl}/user/${userId}`,
      this.httpOptions
    );
  }

  createReview(
    userId: string,
    payload: { rating: number; comment: string }
  ): Observable<{ success: boolean; data: { review: UserReview; ratingAverage: number; ratingCount: number } }> {
    return this.http.post<{
      success: boolean;
      data: { review: UserReview; ratingAverage: number; ratingCount: number };
    }>(`${this.baseUrl}/user/${userId}`, payload, this.httpOptions);
  }
}
