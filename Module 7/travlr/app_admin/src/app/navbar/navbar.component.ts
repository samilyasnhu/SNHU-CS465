import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) { }

  public isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }

  public logout(): void {
    this.authentication.logout();
    this.router.navigate(['/']);
  }
}
