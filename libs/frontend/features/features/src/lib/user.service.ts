import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IUser, ICreateUser} from '@avans-nx-workshop/shared/api'

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string; 
    role: string;
    gender: string;   
    profileImgUrl: string;
}

@Injectable({
  providedIn: 'root', 
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  
  getUsers(): Observable<User[]> {
    return this.http.get<{ results: User[] }>(this.apiUrl).pipe(
      map(response => response.results) 
    );
  }

  // Fetch a single user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<{ results: User }>(`${this.apiUrl}/${id}`).pipe(
      map((response) => response.results) 
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user._id}`, user); // Gebruik `_id`
  }

  createUser(user: ICreateUser): Observable<IUser> {
      return this.http.post<IUser>(`${this.apiUrl}`, user);
  }
}