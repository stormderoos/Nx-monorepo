import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchService } from '../match.service';
import { PlayerService } from '../player.service';
import { ClubService } from '../club.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMatch, IPlayer, IClub } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css'],
})
export class MatchEditComponent implements OnInit {
  matchForm: FormGroup;
  clubs: IClub[] = [];
  homePlayers: IPlayer[] = [];
  awayPlayers: IPlayer[] = [];
  loadingClubs = false;
  loadingPlayers = false;
  matchId: string | null = null;
  match: IMatch | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,
    private playerService: PlayerService,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.matchForm = this.fb.group({
      _id: [''],
      homeTeamId: ['', Validators.required],
      awayTeamId: ['', Validators.required],
      homeScore: [null, [Validators.min(0)]],
      awayScore: [null, [Validators.min(0)]],
      matchDate: ['', Validators.required],
      location: ['', Validators.required],
      scorers: [[], Validators.required],
      assisters: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.matchId = this.route.snapshot.paramMap.get('id');
    if (this.matchId) {
      this.loadMatchData(this.matchId);
    } else {
      console.error('Match ID is missing');
    }
  }

  loadMatchData(matchId: string): void {
    this.matchService.getMatchById(matchId).subscribe({
      next: (match) => {
        this.match = match;
        this.matchForm.patchValue({
          _id: match._id,
          homeTeamId: match.home_club_id,
          awayTeamId: match.away_club_id,
          homeScore: match.score_home ?? null,
          awayScore: match.score_away ?? null,
          matchDate: match.date,
          location: match.location,
          scorers: match.scorers ?? [],
          assisters: match.assisters ?? [],
        });

        this.loadClubsAndPlayers();
      },
      error: (err) => {
        console.error('Error loading match data:', err);
      }
    });
  }

  loadClubsAndPlayers(): void {
    this.loadingClubs = true;
    this.clubService.getClubs().subscribe({
      next: (clubs) => {
        this.clubs = clubs;
        this.loadingClubs = false;
        this.loadPlayersForTeam('home');
        this.loadPlayersForTeam('away');
      },
      error: (err) => {
        console.error('Error loading clubs:', err);
        this.loadingClubs = false;
      }
    });
  }

  loadPlayersForTeam(team: 'home' | 'away'): void {
    const teamId = this.matchForm.get(`${team}TeamId`)?.value;
    console.log(`Loading players for ${team} team with ID:`, teamId);
    if (teamId) {
      this.loadingPlayers = true;
      this.playerService.getPlayersByClub(teamId).subscribe({
        next: (players) => {
          console.log(`Players loaded for ${team} team:`, players);
          if (team === 'home') {
            this.homePlayers = players;
          } else {
            this.awayPlayers = players;
          }
          this.loadingPlayers = false;
        },
        error: (err) => {
          console.error(`Error loading ${team} players:`, err);
          this.loadingPlayers = false;
        }
      });
    } else {
      console.log(`Geen teamId aanwezig voor ${team} team.`);
    }
  }

  // Nieuwe methode voor scorers
  onScorersChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValues = Array.from(selectElement.selectedOptions).map((option) => option.value);
    this.matchForm.get('scorers')?.setValue(selectedValues);
  }

  // Nieuwe methode voor assisters
  onAssistersChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValues = Array.from(selectElement.selectedOptions).map((option) => option.value);
    this.matchForm.get('assisters')?.setValue(selectedValues);
  }

  onSubmit(): void {
    if (this.matchForm.invalid) {
      this.matchForm.markAllAsTouched();
      return;
    }

    const formValue = { ...this.matchForm.value };
    const updatedMatch: IMatch = {
      ...formValue,
      scorers: formValue.scorers,
      assisters: formValue.assisters,
    };

    this.matchService.updateMatch(updatedMatch).subscribe({
      next: (match) => {
        console.log('Match updated:', match);
        this.router.navigate(['/matches']);
      },
      error: (err) => {
        console.error('Error updating match:', err);
      }
    });
  }
}