import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private toast: ToastrService) { }
  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
