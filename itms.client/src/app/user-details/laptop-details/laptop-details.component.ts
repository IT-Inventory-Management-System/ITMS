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

  //isLost: boolean = false;
  //Selectedvalue: any;
  laptopDetails: any;

  constructor(private employeeService: EmployeeService, private router: Router) { }
  //ngOnInit() {
   
  //  this.Selectedvalue = localStorage.getItem('Selectedvalue');
  //}
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
       
        this.laptopDetails = this.filterLaptops(data);
        console.log(this.laptopDetails);
       
      }, (error) => {
        console.error('Error fetching laptop details:', error);
       
      });
  }

  filterLaptops(data: any[]): any[] {
    const laptopMap = new Map();
    for (const laptop of data) {
      if (!laptopMap.has(laptop.deviceId) || laptop.updatedAtUtc !== null) {
        laptopMap.set(laptop.deviceId, laptop);
      }
    }
    return Array.from(laptopMap.values());
  }

  navigateToDeviceDetails(cygId: string): void {
  
    this.router.navigate(['/inventory'], { queryParams: { cygId: cygId } });
  }

  //handleReasonSelected(selectedReason: string, deviceId: any) {
    
  //  const laptop = this.laptopDetails.find((l: { deviceId: any; }) => l.deviceId === deviceId);
  //  if (laptop) {
  //    laptop.selectedReason = selectedReason;
  //  }
  //  localStorage.setItem('Selectedvalue', selectedReason);
  //  this.Selectedvalue = selectedReason;
    
  //}



}
