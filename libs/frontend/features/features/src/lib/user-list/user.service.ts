import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  profileImgUrl: string;
}

@Injectable({
  providedIn: 'root', // Zorgt ervoor dat de service globaal beschikbaar is
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // De API URL voor de backend

  constructor(private http: HttpClient) {}

  // Haal de gebruikers op en map de results naar de juiste array
  getUsers(): Observable<User[]> {
    return this.http.get<{ results: User[] }>(this.apiUrl).pipe(
      map(response => response.results) // Mappen naar de 'results' array
    );
  }
}