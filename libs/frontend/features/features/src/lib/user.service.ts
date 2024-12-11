import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string; // Include password field
    role: string;
    gender: string;   // Include gender field
    profileImgUrl: string;
}

@Injectable({
  providedIn: 'root', // Global availability
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Your API URL

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<{ results: User[] }>(this.apiUrl).pipe(
      map(response => response.results) // Map the results array from the response
    );
  }

  // Fetch a single user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<{ results: User }>(`${this.apiUrl}/${id}`).pipe(
      map((response) => response.results) // Transformeer de response als deze een 'data'-object bevat
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user._id}`, user); // Zorg dat dit overeenkomt met je backend API
  }
}