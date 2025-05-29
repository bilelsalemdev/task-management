import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiResponse, ApiService } from './api.service';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private api: ApiService, private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.getToken();
    if (token) {
      // In a real app, you might want to validate the token or fetch user data
      const user = this.getUserFromToken(token);
      this.currentUserSubject.next(user);
    }
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<ApiResponse<AuthResponse>> {
    return this.api
      .post<AuthResponse>('auth/login', credentials)
      .pipe(
        tap((response) => {
          this.setAuthState(response.data);
        })
      );
  }

  register(userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Observable<ApiResponse<AuthResponse>> {
    return this.api
      .post<AuthResponse>('auth/register', userData)
      .pipe(
        tap((response) => {
          this.setAuthState(response.data);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setAuthState(authData: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authData.access_token);
    this.currentUserSubject.next(authData.user);
  }

  private getUserFromToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      };
    } catch (e) {
      console.error('Error parsing token', e);
      return null;
    }
  }
}
