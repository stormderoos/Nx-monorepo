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
  

  goToPlayerDetails(playerId: string): void {
    this.router.navigate([`/players/${playerId}`]);
  }
}