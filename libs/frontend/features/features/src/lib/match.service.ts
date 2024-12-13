import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IMatch } from '@avans-nx-workshop/shared/api';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMatches(): Observable<IMatch[]> {
    return this.http.get<{ results: IMatch[] }>(`${this.baseUrl}/matches`).pipe(
        map(response => response.results)
    );
  }

  getMatchById(id: string): Observable<IMatch> {
    return this.http.get<IMatch>(`${this.baseUrl}/matches/${id}`);
  }

  createMatch(match: Omit<IMatch, 'id'>): Observable<IMatch> {
    return this.http.post<IMatch>(`${this.baseUrl}/matches`, match);
  }

  updateMatch(id: string, match: Partial<IMatch>): Observable<IMatch> {
    return this.http.put<IMatch>(`${this.baseUrl}/matches/${id}`, match);
  }

  deleteMatch(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/matches/${id}`);
  }
}