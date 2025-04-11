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
      selectedPlayerId: [''], 
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

  // Getter die alleen spelers retourneert zonder clubId (dus spelers die nog niet in een club zitten)
  get availablePlayers(): IPlayer[] {
    return this.players.filter(player => !player.clubId || player.clubId === '');
  }

  onSubmit(): void {
    if (this.clubForm.invalid) {
      return;
    }

    const newClub: Omit<ICreateClub, '_id'> = {
      name: this.clubForm.value.name,
      location: this.clubForm.value.location,
      logoUrl: this.clubForm.value.logoUrl,
      players: this.addedPlayers,  // De lijst van toegevoegde speler-ID's
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

  addPlayerToClub(): void {
    const selectedPlayerId = this.clubForm.get('selectedPlayerId')?.value;
  
    if (!selectedPlayerId) {
      this.error = 'Please select a player.';
      return;
    }
  
    // Zoek de geselecteerde speler in de volledige spelerslijst
    const selectedPlayer = this.players.find((p) => p._id === selectedPlayerId);
    if (selectedPlayer) {
      // Controleer of de speler al een club heeft
      if (selectedPlayer.clubId && selectedPlayer.clubId !== '') {
        this.error = 'Deze speler zit al in een club en kan niet worden toegevoegd.';
        return;
      }
  
      // Controleer nogmaals of de speler al is toegevoegd in de huidige club
      if (this.addedPlayers.includes(selectedPlayer._id)) {
        this.error = 'Player is already added to the club.';
        return;
      }
  
      // Voeg speler toe aan de arrays
      this.addedPlayers.push(selectedPlayer._id);
      this.addedPlayersDetails.push({
        id: selectedPlayer._id,
        firstName: selectedPlayer.firstName,
        lastName: selectedPlayer.lastName,
      });
    } else {
      this.error = 'Player not found. Please select a valid player.';
      return;
    }
  
    this.clubForm.get('selectedPlayerId')?.setValue(null);
    this.error = null;
  }

  removePlayerFromClub(playerId: string): void {
    this.addedPlayers = this.addedPlayers.filter(id => id !== playerId);
    this.addedPlayersDetails = this.addedPlayersDetails.filter(player => player.id !== playerId);
  }
}