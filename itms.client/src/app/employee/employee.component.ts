import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from '../shared/services/Employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  
  selectedUser: any; // Variable to store selected user details
  isLoading: boolean = true; 
  userDetails: any
  laptopDetails: any;
  softwareDetails: any;
  accessoriesDetails: any;
  //archive users
  showArchiveUsers: boolean = false;


  constructor(private employeeService: EmployeeService) {

  }

  onUserDetailsClicked(userDetails: any) {
    this.selectedUser = userDetails;
    
    this.getDevices(userDetails.id);
  }

  getDevices(userId: any): void {
    this.employeeService.getDevices(userId)
      .subscribe(
        (data: any) => {
         
          this.laptopDetails = data.laptop;
          this.softwareDetails = data.software;
          this.accessoriesDetails = data.accessories;
          console.log(this.laptopDetails);
          console.log(this.softwareDetails);
          console.log(this.accessoriesDetails);
        },
        (error) => {
          console.error('Error fetching laptop details:', error);
        }
      );
  }

  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  onShowArchiveUsersChanged(event: any): void {
    const checked = event.target.checked;
    this.showArchiveUsers = checked;
  }
}
