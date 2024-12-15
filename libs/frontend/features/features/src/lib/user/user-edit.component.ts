import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']

})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute, 
    private router: Router 
  ) {
    this.userForm = this.fb.group({
      _id: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      gender: [''],
      profileImgUrl: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('_id'); 
    if (id) {
      this.userService.getUserById(id).subscribe(
        (user: User) => {
          this.userForm.patchValue({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: '',
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
      this.loading = false;
    }
  }

onSubmit(): void {
  if (this.userForm.valid && this.userForm.value._id) {
    const updatedUser: User = {
      _id: this.userForm.value._id,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password || undefined,
      role: this.userForm.value.role,
      gender: this.userForm.value.gender,
      profileImgUrl: this.userForm.value.profileImgUrl,
    };

    this.userService.updateUser(updatedUser).subscribe(
      (response) => {
        console.log('Gebruiker succesvol bijgewerkt:', response);
        this.router.navigate(['/userlist']); // Ga naar gebruikerslijst
      },
      (error) => {
        console.error('Fout bij het bijwerken van de gebruiker:', error);
      }
    );
  } else {
    console.error('Formulier is ongeldig of ID ontbreekt!');
  }
}
}