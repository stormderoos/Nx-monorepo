import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../club.service';
import { IClub, IPlayer } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css'],
})
export class ClubDetailComponent implements OnInit {
  club: IClub | null = null;
  players: IPlayer[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clubService: ClubService
  ) {}

  ngOnInit(): void {
    const clubId = this.route.snapshot.paramMap.get('id');
    if (clubId) {
        this.fetchClubDetails(clubId);
    } else {
        this.error = 'Club ID not found.';
    }
  }

  fetchClubDetails(clubId: string): void {
    this.loading = true;

    this.clubService.getClubById(clubId).subscribe({
      next: (data: IClub) => {
        this.club = data;

        if (this.club.players?.length) {
          this.fetchPlayersDetails(clubId);
        } else {
          this.loading = false;
        }        
      },
      error: (err) => {
        console.error('Error fetching club details:', err);
        this.error = 'Failed to load club details. Please try again later.';
        this.loading = false;
      },
    });
  }

  fetchPlayersDetails(clubId: string): void {
    this.clubService.getPlayersByClub(clubId).subscribe({
      next: (data: IPlayer[]) => {
        this.players = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching players:', err);
        this.error = 'Failed to load players.';
        this.loading = false;
      },
    });
  }

  goToPlayerDetails(playerId: string): void {
    this.router.navigate([`/players/${playerId}`]);
  }
}