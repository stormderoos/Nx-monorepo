import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from '../club.service';
import { IClub } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css'],
})
export class ClubListComponent implements OnInit {
  clubs: IClub[] = [];
  loading = false;
  error: string | null = null;

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.fetchClubs();
  }

  fetchClubs(): void {
    this.loading = true;
    this.error = null;

    this.clubService.getClubs().subscribe({
      next: (data: IClub[]) => {
        this.clubs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
        this.error = 'Failed to load clubs. Please try again later.';
        this.loading = false;
      },
    });
  }

  goToClubDetails(clubId: string): void {
    this.router.navigate([`/clubs/${clubId}`]);
  }
}