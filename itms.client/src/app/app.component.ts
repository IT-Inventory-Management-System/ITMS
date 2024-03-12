import { Component } from '@angular/core';
import { DataService } from './shared/services/data.service';
import { LoginService } from './shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'common-layout';

  constructor(private dataService: DataService, private loginService: LoginService, private router: Router) {
    this.dataService.getFirstUser().subscribe(
      (data) => {
        localStorage.setItem("user", JSON.stringify(data));
      },
      (error) => {
        console.log("User not found");
      });
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  isLoginPage(): boolean {
    return this.router.url === '/login'; // Adjust '/login' to match your login route
  }

}
