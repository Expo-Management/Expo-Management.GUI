import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PersonalInformationService } from '../services/personal-information.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate {
  constructor(
    private userInfoService: PersonalInformationService,
    private route: Router
  ) {}

  canActivate(): boolean {
    return this.isAdmin();
  }

  isAdmin(): boolean {
    const user_role = this.userInfoService.getRole()!;

    if (user_role === 'Admin') {
      return true;
    } else if (user_role === null || user_role === undefined) {
      this.route.navigate(['auth/login']);
      return false;
    }
    
    const role_route = user_role === 'User' ? 'student' : 'judges'

    this.route.navigate([role_route]);
    return false;
  }
  
}
