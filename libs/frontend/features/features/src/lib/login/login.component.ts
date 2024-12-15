import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
                console.log('Logged in as:', response);
                this.router.navigate(['/secure']); 
            },
            error: (error) => {
                console.error('Login error:', error);
                this.errorMessage = 'Login mislukt. Probeer opnieuw.';
            },
        });
    }
}
}