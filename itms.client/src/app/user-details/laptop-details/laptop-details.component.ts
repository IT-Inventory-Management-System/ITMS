import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../shared/services/Employee.service';
import { Router } from '@angular/router';  // Import Angular Router

@Component({
  selector: 'app-laptop-details',
  templateUrl: './laptop-details.component.html',
  styleUrls: ['./laptop-details.component.css']
})
export class LaptopDetailsComponent implements OnChanges {
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;

  laptopDetails: any;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userId'].currentValue !== changes['userId'].previousValue) {
      
      if (this.userId) {
       
        this.getDevices(this.userId);
      }
    }
  }

  getDevices(userId: any): void {
    this.employeeService.getDevices(userId)
      .subscribe((data) => {
        this.laptopDetails = data;
        console.log(this.laptopDetails);
       
      }, (error) => {
        console.error('Error fetching laptop details:', error);
       
      });
  }

  navigateToDeviceDetails(cygId: string): void {
  
    this.router.navigate(['/inventory'], { queryParams: { cygId: cygId } });
  }

}
