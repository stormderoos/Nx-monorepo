import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserIdentity, ICreateUser } from '@avans-nx-workshop/shared/api'; // Voeg het IUserIdentity-model toe
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: ICreateUser): Observable<IUserIdentity> {
    return this.http.post<IUserIdentity>(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<IUserIdentity> {
    return this.http.post<{ token: string; user: IUserIdentity }>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem('user', JSON.stringify(response.user)); 
      }),
      map((response) => response.user) 
    );
  }

  getCurrentUser(): IUserIdentity | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}