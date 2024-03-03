
import { EmployeeService } from '../shared/services/Employee.service';
import { DisplayDetailsService } from '../shared/services/display-details.service';
import { Component, Input, SimpleChanges } from '@angular/core';

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
  archiveBanner: boolean=false;
  showRevokeAlert: { [userId: string]: boolean } = {};
  showAssignAsset: boolean = true;
  storedUser: any;

  constructor(private updateExitProcessInitiationService: EmployeeService, private displayingDetailsService: DisplayDetailsService, private employeeService: EmployeeService) {
    this.resetDropdown();
  }

  //CHANGED HERE 
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userDetails']) {
      this.resetDropdown(); //THIS IS THE CHANGE
      this.archiveBannerFunction();
      this.showUserDetails();
      //if (this.userDetails) {
      //  console.log(this.userDetails);
      //  this.userDetails.forEach((user: { id: string | number; }) => {
      //    this.showRevokeAlert[user.id] = false;
      //  });
      //}
    }
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
  archiveBannerFunction() {
    this.archiveBanner = this.userDetails.isArchived === true && this.calculateDaysDifference(this.userDetails.updatedAtUtc) < 30;
  }
  calculateDaysDifference(updatedAtUtc: string): number {
    const currentDate = new Date();
    const updatedAt = new Date(updatedAtUtc);
    const differenceInTime = currentDate.getTime() - updatedAt.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    return Math.abs(Math.round(differenceInDays)); // Return absolute value of days
  }

  showUserDetails() {

  }
  changeArchiveBanner(value: boolean) {
    this.archiveBanner = value;
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
     this.storedUser = localStorage.getItem("user");
    const body = {
      employeeId: this.userDetails.id,
      updatedBy: JSON.parse(this.storedUser).id,
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
  
