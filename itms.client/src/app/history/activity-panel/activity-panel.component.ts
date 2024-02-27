import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminDetailService } from '../../shared/services/admin-detail.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-activity-panel',
  templateUrl: './activity-panel.component.html',
  styleUrls: ['./activity-panel.component.css']
})
export class ActivityPanelComponent {
  selectedAdmin: any;
    admindata: any;
  purchseDate: Date | null;
  constructor(private adminDetailService: AdminDetailService) { }
  @ViewChild('filterInput') toInput!: ElementRef<HTMLInputElement>;

  toggleInputTypeTo(type: string) {
    const inputElement = document.querySelector('#purchaseDate');
    if (inputElement) {
      inputElement.setAttribute('type', type);
    }
  }
  toggleCheckboxTo(value: string) {
    this.purchseDate = new Date(value);
    const formattedDate = this.purchseDate.toISOString().split('T')[0];
    console.log(formattedDate);
    this.filteredLogs(this.selectedAdmin.id, this.selectedAdmin.locationId, formattedDate);
  }

  ngOnInit() {
    this.adminDetailService.selectedAdmin$.subscribe((admin) => {
      this.selectedAdmin = admin;
      console.log("selectedadmin", this.selectedAdmin);
      this.getAdminLogs(admin.id, admin.locationId);
    });
  }

  filteredLogs(employeeId: any, locationId: any, filterdate:any) {
    const body = {
      locationName: locationId,
      employeeId: employeeId,
      date: filterdate
    };
    console.log("REQUEST BODY : ", body);
    this.adminDetailService.getFilteredLogs(body).subscribe(
      data => {
        console.log("ADMIN LOGS : ", data);
        this.admindata = data;
      },
      error => {
        console.error('Error fetching logs data', error);
      }
    );
  }


  getAdminLogs(employeeId : any, locationId : any ) {
    const body = {
      locationName : locationId,
      employeeId: employeeId
    };
    console.log("REQUEST BODY : ", body);
    this.adminDetailService.getLogs(employeeId, locationId).subscribe(
      data => {
        console.log("ADMIN LOGS : ", data);
        this.admindata = data;
      },
      error => {
        console.error('Error fetching logs data', error);
      }
    );
  }

}
