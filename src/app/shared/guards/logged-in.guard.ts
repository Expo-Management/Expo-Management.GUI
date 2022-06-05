import { AuthGuardService } from '../services/auth-guard.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { PersonalInformationService } from '../services/personal-information.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private personalInfo: PersonalInformationService,
    private authGuardService: AuthGuardService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.authGuardService.getToken()) {
      if (this.personalInfo.getRole() == "Admin") {
        this.router.navigate(['/administrator']);
      } else if (this.personalInfo.getRole() == "Judge") {
        this.router.navigate(['/judges']);
      } else {
        this.router.navigate(['/student']);
      }
    }
    return !this.authGuardService.getToken();
  }
  
}
