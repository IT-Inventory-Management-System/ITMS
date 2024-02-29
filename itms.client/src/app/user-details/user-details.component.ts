
import { EmployeeService } from '../shared/services/Employee.service';
import { DisplayDetailsService } from '../shared/services/display-details.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() userDetails: any;
  @Input() laptopDetails: any;
  @Input() softwareDetails: any;
  @Input() accessoriesDetails: any;
  showRevokeAlert: { [userId: string]: boolean } = {};
  showAssignAsset: boolean = true;

  constructor(private updateExitProcessInitiationService: EmployeeService, private displayingDetailsService: DisplayDetailsService, private employeeService: EmployeeService) {
    this.resetDropdown();
  }

  ngOnChanges() {
    console.log(this.userDetails);
  }

  ngOnInit(): void {
    this.showUserDetails();
    if (this.userDetails) {
      console.log(this.userDetails);
      this.userDetails.forEach((user: { id: string | number; }) => {
        this.showRevokeAlert[user.id] = false;
      });
    }
  }
  showUserDetails() {

  }

  onInitiateExitProcess(userId: string) {
    this.userDetails.exitProcessInitiated= true;
    this.showAssignAsset = false; 
  }

  onRetrieveExitProcess(userId: string) {
    this.userDetails.exitProcessInitiated = false;
    this.showAssignAsset = true;
    this.updateExitProcessInitiation();
  }

  isOptionsVisible: boolean = false;

  //CHANGES
  selectedItem: string = 'laptop';
  resetDropdown() {
    this.isOptionsVisible = false;
    this.showAssignAsset = true;
  }
 

  selectItem(item: string) {
    this.selectedItem = item;
  }
  updateExitProcessInitiation() {
    const body = {
      employeeId: this.userDetails.id,
      exitProcessInitiated: false
    };

    this.updateExitProcessInitiationService.UpdateExitProcessInitiation(body).subscribe(
      response => {
        console.log('Exit process updated successfully:', response);
        // Handle success, if needed
      },
      error => {
        console.error('Error updating exit process:', error);
        // Handle error
      }
    );
  }
}
  
