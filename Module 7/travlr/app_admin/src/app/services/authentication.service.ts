import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  public getCurrentUser(): User {
    const payload = JSON.parse(atob(this.getToken().split('.')[1]));
    return { email: payload.email, name: payload.name };
  }

  public login(user: User, password: string): Observable<AuthResponse> {
    return this.tripDataService.login(user, password).pipe(
      tap((response) => this.saveToken(response.token))
    );
  }

  public register(user: User, password: string): Observable<AuthResponse> {
    return this.tripDataService.register(user, password).pipe(
      tap((response) => this.saveToken(response.token))
    );
  }
}
