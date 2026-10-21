import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  tripForm = this.formBuilder.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    length: ['', Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required]
  });
  message = '';
  private tripCode = '';

  constructor(
    private formBuilder: FormBuilder,
    private tripDataService: TripDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tripCode = localStorage.getItem('tripCode') || '';

    if (!this.tripCode) {
      this.message = 'Select a trip from the listing to edit.';
      return;
    }

    this.tripDataService.getTrip(this.tripCode).subscribe({
      next: (trip) => this.tripForm.patchValue({ ...trip, start: this.formatDate(trip.start) }),
      error: () => this.message = 'The trip could not be found.'
    });
  }

  public onSubmit(): void {
    if (this.tripForm.invalid) {
      this.tripForm.markAllAsTouched();
      return;
    }

    this.tripDataService.updateTrip(this.tripForm.getRawValue() as Trip).subscribe({
      next: () => {
        localStorage.removeItem('tripCode');
        this.router.navigate(['/']);
      },
      error: () => this.message = 'The trip could not be updated.'
    });
  }

  private formatDate(date: string): string {
    return date ? date.substring(0, 10) : '';
  }

}
