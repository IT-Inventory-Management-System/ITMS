import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { UserStoreService } from '../shared/services/user-store.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageAccessGuard implements CanActivate {
  constructor(private loginService: LoginService, private userStore: UserStoreService) { }

  canActivate(): Observable<boolean> {
    return this.userStore.getRoleFromStore().pipe(
      switchMap((val) => {
        const loggedInUserRole = val || this.loginService.getRoleFromToken();
        if (this.loginService.isLoggedIn() && loggedInUserRole === 'Superadmin') {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }
}
