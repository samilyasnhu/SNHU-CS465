import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authentication: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthRequest = request.url.endsWith('/login') || request.url.endsWith('/register');
    const isProtectedMethod = ['POST', 'PUT', 'DELETE'].includes(request.method);

    if (this.authentication.isLoggedIn() && isProtectedMethod && !isAuthRequest) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.authentication.getToken()}` }
      });
    }

    return next.handle(request);
  }
}
