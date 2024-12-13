import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { ClubService } from '../club.service';
import { Router } from '@angular/router';
import { IMatch, IClub } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-match',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
})
export class MatchListComponent implements OnInit {
  matches: IMatch[] = [];
  clubs: IClub[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private matchService: MatchService,
    private clubService: ClubService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMatches();
    this.fetchClubs();
  }

  fetchMatches(): void {
    this.loading = true;
    this.matchService.getMatches().subscribe({
      next: (data: IMatch[]) => {
        if (!Array.isArray(data)) {
          console.error('Invalid response format:', data);
          this.error = 'Invalid response format.';
          this.loading = false;
          return;
        }
        this.matches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching matches:', err);
        this.error = 'Failed to load matches. Please try again later.';
        this.loading = false;
      },
    });
  }

  fetchClubs(): void {
    this.clubService.getClubs().subscribe({
      next: (data: IClub[]) => {
        this.clubs = data;
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
        this.error = 'Failed to load clubs. Please try again later.';
      },
    });
  }

  getClubNameById(clubId: string): string {
    const club = this.clubs.find(c => c._id === clubId);
    return club ? club.name : 'Unknown Club';
  }

  getClubLogoById(clubId: string): string {
    const club = this.clubs.find(c => c._id === clubId);
    return club ? club.logoUrl : 'default-logo-url'; // Geef een default logo terug als het logo niet beschikbaar is
  }

  editMatch(matchId: string): void {
    // Voeg logica toe om een wedstrijd te bewerken
    console.log('Editing match with ID:', matchId);
  }

  getClubLocationById(clubId: string): string {
    const club = this.clubs.find(c => c._id === clubId);
    return club ? club.location : 'Unknown Location';
  }


  addMatch(): void {
    this.router.navigate(['/matches/create']); // Navigeer naar de pagina voor match creatie
  }
  
  deleteMatch(matchId: string): void {
    // Voeg logica toe om een wedstrijd te verwijderen
    this.matchService.deleteMatch(matchId).subscribe(() => {
      this.fetchMatches(); // Laad opnieuw de lijst met wedstrijden na verwijdering
    });
  }
}