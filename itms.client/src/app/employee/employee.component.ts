import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  
  selectedUser: any; // Variable to store selected user details
  isLoading: boolean = true; 

 
  onUserDetailsClicked(userDetails: any) {
    this.selectedUser = userDetails;
  }
  
  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
