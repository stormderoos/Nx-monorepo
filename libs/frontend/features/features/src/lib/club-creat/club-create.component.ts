import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubService } from '../club.service';
import { ICreateClub, IPlayer } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-club-create',
  templateUrl: './club-create.component.html',
  styleUrls: ['./club-create.component.css'],
})
export class ClubCreateComponent implements OnInit {
  clubForm: FormGroup;
  error: string | null = null;
  players: IPlayer[] = [];
  selectedPlayerId: string | null = null;
  addedPlayers: string[] = [];  
  addedPlayersDetails: { id: string, firstName: string, lastName: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private router: Router
  ) {
    this.clubForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      logoUrl: [
        'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        Validators.required,
      ],
      selectedPlayerId: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    this.clubService.getPlayers().subscribe({
      next: (players) => {
        this.players = players;
      },
      error: (err) => {
        this.error = 'Failed to load players.';
        console.error(err);
      },
    });
  }

  onSubmit(): void {
    if (this.clubForm.invalid) {
      return;
    }

    const newClub: Omit<ICreateClub, 'id'> = {
      name: this.clubForm.value.name,
      location: this.clubForm.value.location,
      logoUrl: this.clubForm.value.logoUrl,
      players: this.addedPlayers,  // Send the list of added players
    };

    this.clubService.createClub(newClub).subscribe({
      next: () => {
        this.router.navigate(['/clubs']);
      },
      error: (err) => {
        this.error = 'Failed to create club. Please try again.';
        console.error(err);
      },
    });
  }

  onPlayerChange(): void {
    alert(`Selected Player ID: ${this.selectedPlayerId}`);
  }

  addPlayerToClub(): void {
    const selectedPlayerId = this.clubForm.get('selectedPlayerId')?.value;
  
    if (!selectedPlayerId) {
      this.error = 'Please select a player.';
      return;
    }
    
    if (selectedPlayerId) {
      this.error = 'player added';
    }
  
    if (this.addedPlayers.includes(selectedPlayerId)) {
      this.error = 'Player is already added to the club.';
      return;
    }
  
    const selectedPlayer = this.players.find((p) => p._id === selectedPlayerId);
    if (selectedPlayer) {
      this.addedPlayers.push(selectedPlayer._id);
      this.addedPlayersDetails.push({
        id: selectedPlayer._id,
        firstName: selectedPlayer.firstName,
        lastName: selectedPlayer.lastName,
      });
    } else {
      this.error = 'Player not found. Please select a valid player.';
    }
  
    this.clubForm.get('selectedPlayerId')?.setValue(null);
    this.error = null;
  }

  removePlayerFromClub(playerId: string): void {
    this.addedPlayers = this.addedPlayers.filter(id => id !== playerId);
    this.addedPlayersDetails = this.addedPlayersDetails.filter(player => player.id !== playerId);
  }
}