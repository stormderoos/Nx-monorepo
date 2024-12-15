import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPlayer } from '@avans-nx-workshop/shared/api'; 

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/api/players'; 

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<IPlayer[]> {
    return this.http.get<{ results: IPlayer[] }>(this.apiUrl).pipe(
      map(response => response.results) 
    );
  }

  getPlayerById(id: string): Observable<IPlayer> {
    return this.http.get<{ results: IPlayer }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.results)
    );
  }

  addPlayer(player: Omit<IPlayer, 'id'>): Observable<IPlayer> {
    return this.http.post<IPlayer>(this.apiUrl, player);
  }

  updatePlayer(player: IPlayer): Observable<IPlayer> {
    return this.http.put<IPlayer>(`${this.apiUrl}/${player._id}`, player);
  }

  deletePlayer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}