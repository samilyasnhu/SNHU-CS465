import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, RouterLink, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message = '';

  constructor(
    private tripDataService: TripDataService,
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getTrips();
  }

  public getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (foundTrips) => {
        this.trips = foundTrips;
        this.message = '';
      },
      error: () => {
        this.message = 'Unable to load trips. Check that the Express server is running.';
      }
    });
  }

  public deleteTrip(tripCode: string): void {
    this.tripDataService.deleteTrip(tripCode).subscribe({
      next: () => this.getTrips(),
      error: () => this.message = 'Unable to delete the trip.'
    });
  }

  public isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }

}
