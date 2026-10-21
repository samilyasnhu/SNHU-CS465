import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() deleteRequested = new EventEmitter<string>();

  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) { }

  public editTrip(): void {
    localStorage.setItem('tripCode', this.trip.code);
    this.router.navigate(['/edit-trip']);
  }

  public deleteTrip(): void {
    if (confirm(`Delete ${this.trip.name}?`)) {
      this.deleteRequested.emit(this.trip.code);
    }
  }

  public isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }

}
