import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../shared/services/user-store.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private userstore: UserStoreService, private toastr: ToastrService) {
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
          const tokenPayload = this.loginService.decodedToken();
          this.userstore.setFirstNameFromStore(tokenPayload.firstName);
          this.userstore.setLastNameFromStore(tokenPayload.lastName);
          this.userstore.setRoleFromStore(tokenPayload.role);
          this.userstore.setLocationNameFromStore(tokenPayload.locationName);
          const user = {
            id: tokenPayload.id,
            firstName: tokenPayload.firstName,
            lastName: tokenPayload.lastName,
            cgiid: tokenPayload.cgiid,
            role: tokenPayload.role,
            locationId: tokenPayload.locationId,
            locationName: tokenPayload.locationName
          }
          this.toastr.success("Logged In Successfully");

          localStorage.setItem("user", JSON.stringify(user));
          this.router.navigate(['dashboard']);
        },
        (error) => {
          this.toastr.error("Error in Login");
          console.error('Authentication failed:', error);
        }
      );

    }

    else {
      console.error('Invalid Email Format');
    }
  }

}
