import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, {
      params,
    });
  }

  post<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`);
  }

  patch<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, data);
  }
}
