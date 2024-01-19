import { Component, Input, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../shared/services/Employee.service';

@Component({
  selector: 'app-accessories-details',
  templateUrl: './accessories-details.component.html',
  styleUrls: ['./accessories-details.component.css']
})
export class AccessoriesDetailsComponent {
  @Input() userId: any;
  accessoriesDetails: any;
  MostRecentAccessory: any; // Add this variable

  constructor(private employeeService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userId'].currentValue !== changes['userId'].previousValue) {
      // Check if userId changed and call API only if it's a different value
      this.getAccessories();
    }
  }

  async getAccessories(): Promise<void> {
    try {
      this.accessoriesDetails = await this.employeeService.getAccessories(this.userId).toPromise();
      this.MostRecentAccessory = this.accessoriesDetails[0];
      console.log(this.accessoriesDetails);
      // Additional handling/logic for software details
    } catch (error) {
      console.error('Error fetching software details:', error);
      // Handle error as needed
    }
  }

  isMostRecent(accessory: any): boolean {
    // Check if the software is the most recent one
    return accessory === this.MostRecentAccessory;
  }
}
