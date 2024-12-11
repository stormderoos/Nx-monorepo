import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubService } from '../club.service';
import { ICreateClub } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-club-create',
  templateUrl: './club-create.component.html',
  styleUrls: ['./club-create.component.css'],
})
export class ClubCreateComponent {
  clubForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private router: Router
  ) {
    // Initialiseer het formulier met de velden
    this.clubForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      logoUrl: [
        'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        Validators.required,
      ], // Standaard afbeelding als placeholder
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
    };

    // Maak een nieuwe club aan via de service
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
}