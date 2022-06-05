import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authGuardService: AuthGuardService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (!this.authGuardService.getToken()) {
      this.router.navigate(['/auth/login']);
    }
    return this.authGuardService.getToken();
  }  
}
