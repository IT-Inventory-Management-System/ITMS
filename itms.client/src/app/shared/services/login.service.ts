import { Injectable } from '@angular/core';
import { ConfigServiceService } from './config-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = this.config.apiUrl;
  private loggedIn = false;
  private userPayload: any;

  constructor(private http: HttpClient, private config: ConfigServiceService, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  authenticate(userLoginDto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Login/authenticate', userLoginDto);
  }

  signOut() {
    //localStorag.clear();
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);

  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodedToken() {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken()!);
  }

  getFirstNameFromToken() {
    if (this.userPayload) return this.userPayload.firstName;
  }

  getLastNameFromToken() {
    if (this.userPayload) return this.userPayload.lastName;
  }


  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }



}
