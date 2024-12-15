import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ICreateUser, UserRole } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profileImgUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      role: [UserRole.Fan, Validators.required],
      gender: ['Unknown', Validators.required], 
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user: ICreateUser = this.registerForm.value;

      this.authService.register(user).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = 'Registratie mislukt. Probeer opnieuw.';
        },
      });
    }
  }
}