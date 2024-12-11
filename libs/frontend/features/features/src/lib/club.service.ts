import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IClub } from '@avans-nx-workshop/shared/api';
import { IPlayer } from '@avans-nx-workshop/shared/api';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createClub(club: Omit<IClub, 'id'>): Observable<IClub> {
    return this.http.post<IClub>(`${this.baseUrl}/clubs`, club);
  }

  addPlayerToClub(player: Omit<IPlayer, 'id'>): Observable<IPlayer> {
    return this.http.post<IPlayer>(`${this.baseUrl}/players`, player);
  }
  getClubs(): Observable<IClub[]> {
    return this.http.get<{results : IClub[]}>(`${this.baseUrl}/clubs`).pipe(
      map(response => response.results ));
  }

  getClubById(id: number): Observable<IClub> {
    return this.http.get<IClub>(`${this.baseUrl}/clubs/${id}`);
  }

  getPlayersByClub(clubId: number): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(`${this.baseUrl}/clubs/${clubId}/players`);
  }

  updateClub(id: number, updatedClub: Partial<IClub>): Observable<IClub> {
    return this.http.put<IClub>(`${this.baseUrl}/clubs/${id}`, updatedClub);
  }

  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clubs/${id}`);
  }
}