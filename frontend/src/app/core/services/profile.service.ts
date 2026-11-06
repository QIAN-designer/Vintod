import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserProfile } from '../auth/auth.models';

export interface ProfileApiResponse {
  success: boolean;
  data: UserProfile;
  error?: {
    message: string;
    statusCode?: number;
  } | string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/profiles`;

  getMyProfile(): Observable<ProfileApiResponse> {
    return this.http.get<ProfileApiResponse>(`${this.baseUrl}/me`);
  }

  getProfileByUsername(username: string): Observable<ProfileApiResponse> {
    return this.http.get<ProfileApiResponse>(`${this.baseUrl}/u/${username}`);
  }

  getProfileByUserId(userId: string): Observable<ProfileApiResponse> {
    return this.http.get<ProfileApiResponse>(`${this.baseUrl}/${userId}`);
  }

  updateProfile(userId: string, data: Partial<UserProfile>): Observable<ProfileApiResponse> {
    return this.http.patch<ProfileApiResponse>(`${this.baseUrl}/${userId}`, data);
  }
}

