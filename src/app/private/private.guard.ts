import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PrivateGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = true;

    if (!isAuthenticated) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
