import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from '../club.service';
import { IPlayer } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
})
export class PlayerDetailComponent implements OnInit {
  player: IPlayer | null = null;
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private clubService: ClubService) {}

  ngOnInit(): void {
    const playerId = this.route.snapshot.paramMap.get('id');
    if (playerId) {
      this.fetchPlayerDetails(playerId);
    } else {
      this.error = 'Player ID not found.';
    }
  }

  fetchPlayerDetails(playerId: string): void {
    this.loading = true;
    this.error = null;

    this.clubService.getPlayerById(playerId).subscribe({
      next: (data: IPlayer) => {
        this.player = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching player details:', err);
        this.error = 'Failed to load player details. Please try again later.';
        this.loading = false;
      },
    });
  }
}