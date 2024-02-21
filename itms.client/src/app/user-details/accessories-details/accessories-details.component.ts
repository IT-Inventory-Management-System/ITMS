import { Component, Input, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../shared/services/Employee.service';

@Component({
  selector: 'app-accessories-details',
  templateUrl: './accessories-details.component.html',
  styleUrls: ['./accessories-details.component.css']
})
export class AccessoriesDetailsComponent {
  @Input() userId: any;
  @Input() accessoriesDetails: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;

  MostRecentAccessory: any; 

  constructor(private employeeService: EmployeeService) { }

  //ngOnChanges(changes: SimpleChanges): void {
  //  if (changes['userId'] && changes['userId'].currentValue !== changes['userId'].previousValue) {
      
  //    if (this.userId) {
  //      this.getAccessories(this.userId);

  //    }
  //  }
  //}

  //getAccessories(userId: any): void {
  //  this.employeeService.getDevices(userId)
  //    .subscribe((data: any) => {
  //      this.accessoriesDetails = data.accessories;
  //      console.log(this.accessoriesDetails);
  //    },
  //      (error) => {
  //        console.error('Error fetching Accessories details:', error);

  //      });
    //try {
    //  this.accessoriesDetails = await this.employeeService.getAccessories(this.userId).toPromise();
    //  this.MostRecentAccessory = this.accessoriesDetails[0];
    //  console.log(this.accessoriesDetails);
      
    //} catch (error) {
    //  console.error('Error fetching software details:', error);
     
    //}
  

  //filterAccessories(data: any[]): any[] {
  //  const accessoryMap = new Map();
  //  for (const accessory of data) {
  //    if (!accessoryMap.has(accessory.deviceId) || accessory.updatedAtUtc !== null) {
  //      accessoryMap.set(accessory.deviceId, accessory);
  //    }
  //  }
  //  return Array.from(accessoryMap.values());
  //}

  //isMostRecent(accessory: any): boolean {
   
  //  return accessory === this.MostRecentAccessory;
  //}
}
