import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPlayer } from '@avans-nx-workshop/shared/api'; // Zorg ervoor dat dit pad correct is

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/api/players'; // Je API URL

  constructor(private http: HttpClient) {}

  // Alle spelers ophalen
  getPlayers(): Observable<IPlayer[]> {
    return this.http.get<{ results: IPlayer[] }>(this.apiUrl).pipe(
      map(response => response.results) // Map de `results` array van de API response
    );
  }

  // Speler ophalen op basis van ID
  getPlayerById(id: string): Observable<IPlayer> {
    return this.http.get<{ results: IPlayer }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.results) // Map de enkele speler uit de API response
    );
  }

  // Nieuwe speler toevoegen
  addPlayer(player: Omit<IPlayer, 'id'>): Observable<IPlayer> {
    return this.http.post<IPlayer>(this.apiUrl, player);
  }

  // Bestaande speler bijwerken
  updatePlayer(id: string, updatedPlayer: Partial<Omit<IPlayer, 'id'>>): Observable<IPlayer> {
    return this.http.put<IPlayer>(`${this.apiUrl}/${id}`, updatedPlayer);
  }

  // Speler verwijderen
  deletePlayer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}