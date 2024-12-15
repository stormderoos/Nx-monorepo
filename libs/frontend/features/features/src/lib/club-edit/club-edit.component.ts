import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from '../club.service';  // Assuming you have a ClubService
import { IClub, IPlayer } from '@avans-nx-workshop/shared/api';  // Import IClub and IPlayer interfaces
import { PlayerService } from '../player.service';  // Assuming you have a PlayerService to fetch players
import { Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css'],
})
export class ClubEditComponent implements OnInit {
  clubForm: FormGroup;
  loading = true;
  players: IPlayer[] = [];
  errorMessage: string | null = null;  // Add this line to handle errors

  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private playerService: PlayerService,  // Assuming you have a player service
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clubForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      location: ['', Validators.required],
      logoUrl: ['', Validators.required],
      players: [[]],  // players will be an array of player IDs
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    if (id) {
      this.clubService.getClubById(id).subscribe(
        (club: IClub) => {
          this.clubForm.patchValue({
            _id: club._id,
            name: club.name,
            location: club.location,
            logoUrl: club.logoUrl,
            players: club.players || [],  // Populate players
          });

          // Fetch player details (to populate a dropdown or list of players)
          this.clubService.getPlayersByClub(club._id).subscribe(
            (players: IPlayer[]) => {
              this.players = players;
              this.loading = false;
            },
            (error) => {
              console.error('Error fetching players:', error);
              this.loading = false;
              this.errorMessage = 'Failed to load players. Please try again later.';
            }
          );
        },
        (error) => {
          console.error('Error fetching club:', error);
          this.loading = false;
          this.errorMessage = 'Failed to load club details. Please try again later.';
        }
      );
    } else {
      console.error('ID parameter is missing in the route!');
      this.loading = false;
      this.errorMessage = 'Club ID is missing from the URL.';
    }
  }

  onSubmit(): void {
    this.errorMessage = null;  // Reset error message on submit attempt
  
    if (this.clubForm.valid && this.clubForm.value._id) {
      const updatedClub: IClub = {
        _id: this.clubForm.value._id,
        name: this.clubForm.value.name,
        location: this.clubForm.value.location,
        logoUrl: this.clubForm.value.logoUrl,
        players: this.clubForm.value.players || [],
      };
  
      this.clubService.updateClub(updatedClub).subscribe(
        (response) => {
          console.log('Club successfully updated:', response);
          this.router.navigate(['/clubs']);
        },
        (error) => {
          console.error('Error updating club:', error);
  
          // Check if the error is an object and extract a meaningful message
          if (error instanceof Error) {
            this.errorMessage = error.message || 'An unexpected error occurred';
          } else if (typeof error === 'object' && error !== null) {
            // If the error is an object, try to extract the message
            this.errorMessage = error['message'] || 'An unknown error occurred';
          } else {
            // If it's a string, just show it
            this.errorMessage = error;
          }
        }
      );
    } else {
      console.error('Form is invalid or ID is missing!');
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}