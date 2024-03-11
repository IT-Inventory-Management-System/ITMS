import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userLoginDto = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.loginService.authenticate(userLoginDto).subscribe(
        (response: any) => {
          console.log('Token:', response.token);
          this.loginService.storeToken(response.token);
          this.router.navigate(['dashboard']);
        },
        (error) => {
          console.error('Authentication failed:', error);
        }
      );

    }

    else {
      console.error('Invalid Email Format');
    }
  }

}
