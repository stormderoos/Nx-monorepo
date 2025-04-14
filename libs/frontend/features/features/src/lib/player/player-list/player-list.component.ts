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

  // Aangepaste onSearch functie voor Neo4j stat retrieval
  onSearch(): void {
    // Reset geselecteerde speler en stat
    this.selectedPlayer = null;
    this.selectedPlayerStats = null;

    if (!this.searchTerm.trim()) {
      return;
    }

    // Filter spelers op basis van firstName en lastName
    const matchingPlayers = this.players.filter((player) =>
      (player.firstName + ' ' + player.lastName)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );

    // Als er precies één match is, haal de stats via Neo4j op
    if (matchingPlayers.length === 1) {
      this.selectedPlayer = matchingPlayers[0];
      this.playerService.getPlayerStatsFromNeo4J(this.selectedPlayer._id).subscribe({
        next: (stats) => {
          this.selectedPlayerStats = stats;
        },
        error: (err) => {
          console.error('Error fetching player stats from Neo4j:', err);
        },
      });
    } else {
      // Geen of meerdere spelers gevonden: toon een melding of laat de stats weg
      console.warn('Geen unieke match gevonden voor de ingevoerde naam.');
    }
  }

  goToPlayerDetails(playerId: string): void {
    this.router.navigate([`/players/${playerId}`]);
  }
}