import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../user-list/user.service';

@Component({
  selector: 'avans-nx-workshop-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    // Initialiseer het formulier met lege waardes
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      gender: [''],
      profileImgUrl: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('_id'); // Haal de user ID uit de route
    if (id) {
      this.userService.getUserById(id).subscribe(
        (user: User) => {
          // Vul het formulier met de opgehaalde user-data
          this.userForm.patchValue({
            username: user.username,
            email: user.email,
            password: '', // Laat het wachtwoordveld leeg of vul met een placeholder
            role: user.role,
            gender: user.gender,
            profileImgUrl: user.profileImgUrl,
          });
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching user:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('ID parameter is missing in the route!');
      this.loading = false;
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulier ingediend:', this.userForm.value);
      // Roep een service aan om de wijzigingen op te slaan
      this.userService.updateUser(this.userForm.value).subscribe(
        (response) => {
          console.log('Gebruiker succesvol bijgewerkt:', response);
        },
        (error) => {
          console.error('Fout bij het bijwerken van de gebruiker:', error);
        }
      );
    }
  }
}