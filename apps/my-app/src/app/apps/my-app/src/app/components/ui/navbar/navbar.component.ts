import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@avans-nx-workshop/frontend/features/features';
@Component({
  selector: 'avans-nx-workshop-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    const currentUser = this.authService.getCurrentUser();
    console.log('Current user:', currentUser);
    return !!currentUser;
  }

  logout(): void {
    this.authService.logout(); // als je een aparte logout-methode hebt
    this.router.navigate(['/login']);
  }
}