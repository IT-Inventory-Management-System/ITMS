import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../shared/services/Employee.service';

@Component({
  selector: 'app-software-details',
  templateUrl: './software-details.component.html',
  styleUrls: ['./software-details.component.css']
})
export class SoftwareDetailsComponent implements OnChanges {
  @Input() userId: any;
  softwareDetails: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;

  mostRecentSoftware: any; // Add this variable

  constructor(private employeeService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userId'].currentValue !== changes['userId'].previousValue) {
      // Check if userId changed and call API only if it's a different value
      if (this.userId) {
        this.getSoftware(this.userId);
      }
    }
  }

  getSoftware(userId: any):void {
    this.employeeService.getSoftware(userId)
      .subscribe((data) => {
        this.softwareDetails = this.filterSoftware(data);
        console.log(this.softwareDetails);
      },
        (error) => {
          console.error('Error fetching Accessories details:', error);
        });
    //try {
    //  this.softwareDetails = await this.employeeService.getSoftware(this.userId).toPromise();
    //  this.mostRecentSoftware = this.softwareDetails[0];
    //  console.log(this.softwareDetails);
     
    //} catch (error) {
    //  console.error('Error fetching software details:', error);
     
    //}
  }

  filterSoftware(data: any[]): any[] {
    const softwareMap = new Map();
    for (const software of data) {
      if (!softwareMap.has(software.softwareAllocationId) || software.updatedAtUtc !== null) {
        softwareMap.set(software.softwareAllocationId, software);
      }
    }
    return Array.from(softwareMap.values());
  }

  //isMostRecent(software: any): boolean {
    
  //  return software === this.mostRecentSoftware;
  //}
}
