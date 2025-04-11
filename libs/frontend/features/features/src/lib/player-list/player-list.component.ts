import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { IPlayer } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit {
  players: IPlayer[] = [];
  loading = false;
  error: string | null = null;

  // Eigenschappen voor de zoekfunctie
  searchTerm = '';
  selectedPlayer: IPlayer | null = null;
  selectedPlayerStats: { goals: number; assists: number } | null = null;

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPlayers();
  }

  fetchPlayers(): void {
    this.loading = true;
    this.error = null;

    this.playerService.getPlayers().subscribe({
      next: (data: IPlayer[]) => {
        this.players = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching players:', err);
        this.error = 'Failed to load players. Please try again later.';
        this.loading = false;
      },
    });
  }

  // Functie die de speler statische ophaalt als er een match is
  onSearch(): void {
    // Reset de geselecteerde speler en stat
    this.selectedPlayer = null;
    this.selectedPlayerStats = null;

    if (!this.searchTerm.trim()) {
      return;
    }

    // Filter spelers op basis van de ingevoerde naam (bestaande uit firstName en lastName)
    const matchingPlayers = this.players.filter((player) =>
      (player.firstName + ' ' + player.lastName)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );

    // Als er precies één speler is die matcht, haal dan zijn statistieken op
    if (matchingPlayers.length === 1) {
      this.selectedPlayer = matchingPlayers[0];
      this.playerService.getPlayerStats(this.selectedPlayer._id).subscribe({
        next: (stats) => {
          this.selectedPlayerStats = stats;
        },
        error: (err) => {
          console.error('Error fetching player stats:', err);
          // Je kunt hier een foutmelding tonen als gewenst
        },
      });
    } else {
      // Indien er geen of meerdere spelers matchen, kun je feedback geven (bijv. melding of weglaten van stat weergave)
      // Voor dit voorbeeld tonen we enkel de stats als er een eenduidige match is.
      console.warn('Geen unieke match gevonden voor de ingevoerde naam.');
    }
  }

  goToPlayerDetails(playerId: string): void {
    this.router.navigate([`/players/${playerId}`]);
  }
}