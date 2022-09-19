import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonalInformationService } from '../services/personal-information.service';

@Injectable({
  providedIn: 'root'
})
export class JudgeAccessGuard implements CanActivate {
  constructor(
    private userInfoService: PersonalInformationService,
    private route: Router
  ) {}

  canActivate(): boolean {
    return this.isJudge();
  }

  isJudge(): boolean {
    const user_role = this.userInfoService.getRole()!;

    if (user_role === 'Judge') {
      return true;
    } 
    const role_route = user_role === 'Admin' ? 'administrator' : 'student'

    this.route.navigate([role_route]);
    return false;
  }
}
