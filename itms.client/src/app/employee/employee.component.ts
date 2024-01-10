import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  
  selectedUser: any; // Variable to store selected user details

  // Function to handle user details clicked event
  onUserDetailsClicked(userDetails: any) {
    this.selectedUser = userDetails;
  }

}
