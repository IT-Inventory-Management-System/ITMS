import { Component } from '@angular/core';

@Component({
  selector: 'app-add-software-form',
  templateUrl: './add-software-form.component.html',
  styleUrls: ['./add-software-form.component.css']
})
export class AddSoftwareFormComponent {

  title = 'ITApp';
  isFormOpen: boolean = false;
  showPassword = false;
  model: any;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleSoftwareForm() {
    this.isFormOpen = !this.isFormOpen;
  }

}
