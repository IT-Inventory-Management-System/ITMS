import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Injectable({
  providedIn: 'root',
})

export class LoginRedirectGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
