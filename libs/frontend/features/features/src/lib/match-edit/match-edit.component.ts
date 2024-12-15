import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../match.service';  // Assuming a MatchService exists
import { IMatch } from '@avans-nx-workshop/shared/api';  // Import IMatch

@Component({
  selector: 'avans-nx-workshop-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css'],
})
export class MatchEditComponent implements OnInit {
  matchForm: FormGroup;
  loading = true;
  errorMessage: string | null = null; // To hold error messages

  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,  // Assuming you have a service for matches
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize form with validation
    this.matchForm = this.fb.group({
      _id: [''],
      homeTeamId: ['', Validators.required],
      awayTeamId: ['', Validators.required],
      homeScore: [null, [Validators.min(0)]], // home score can be null or a number
      awayScore: [null, [Validators.min(0)]], // away score can be null or a number
      matchDate: ['', Validators.required],
      location : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const matchId = this.route.snapshot.paramMap.get('_id');
    if (matchId) {
      this.fetchMatchDetails(matchId);
    } else {
      this.errorMessage = 'Match ID is missing.';
      this.loading = false;
    }
  }

  fetchMatchDetails(matchId: string): void {
    this.loading = true;
    this.matchService.getMatchById(matchId).subscribe({
      next: (match: IMatch) => {
        this.matchForm.patchValue({
          _id: match._id,
          homeTeamId: match.home_club_id,
          awayTeamId: match.away_club_id,
          homeScore: match.score_home ?? null, // Set to null if not available
          awayScore: match.score_away ?? null, // Set to null if not available
          matchDate: match.date,
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching match details:', err);
        this.errorMessage = 'Failed to load match details. Please try again later.';
        this.loading = false;
      },
    });
  }
  onSubmit(): void {
    this.errorMessage = null;
  
    if (this.matchForm.valid && this.matchForm.value._id) {
        const matchDate = new Date('2024-12-19T12:00:00Z');  // Dit is een Date instance

        const updatedMatch: IMatch = {
            _id: this.matchForm.value._id,
            location: this.matchForm.value.location,
            home_club_id: this.matchForm.value.homeTeamId,
            away_club_id: this.matchForm.value.awayTeamId,
            score_home: this.matchForm.value.homeScore,
            score_away: this.matchForm.value.awayScore,
            date: matchDate,
        };
    
        this.matchService.updateMatch(updatedMatch).subscribe(
            (response) => {
            this.router.navigate(['/matches']);  // Navigate to the match list after update
            },
            (error) => {
            this.errorMessage = this.matchForm.value.matchDate ;
            }
        );
    } else {
      console.error('Form is invalid or ID is missing!');
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}