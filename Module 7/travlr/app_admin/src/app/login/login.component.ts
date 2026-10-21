import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { name: '', email: '', password: '' };
  formError = '';

  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) { }

  public onLoginSubmit(): void {
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required.';
      return;
    }

    const user: User = {
      name: this.credentials.name,
      email: this.credentials.email
    };

    this.authentication.login(user, this.credentials.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.formError = 'Login failed. Check your email and password.'
    });
  }
}
