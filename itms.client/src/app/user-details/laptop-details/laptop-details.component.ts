



import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../shared/services/Employee.service';

@Component({
  selector: 'app-laptop-details',
  templateUrl: './laptop-details.component.html',
  styleUrls: ['./laptop-details.component.css']
})
export class LaptopDetailsComponent implements OnChanges {
  @Input() userId: any;
  laptopDetails: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userId'].currentValue !== changes['userId'].previousValue) {
      // Check if userId changed and call API only if it's a different value
      this.getDevices();
    }
  }

  getDevices(): void {
    this.employeeService.getDevices(this.userId)
      .subscribe((data) => {
        this.laptopDetails = data;
        console.log(this.laptopDetails);
        // Additional handling/logic for laptop details
      }, (error) => {
        console.error('Error fetching laptop details:', error);
        // Handle error as needed
      });
  }
}
