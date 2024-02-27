import { Component } from '@angular/core';
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

  constructor(private adminDetailService: AdminDetailService) { }


  ngOnInit() {
    this.adminDetailService.selectedAdmin$.subscribe((admin) => {
      this.selectedAdmin = admin;
      console.log("selectedadmin", this.selectedAdmin);
      this.getAdminLogs(admin.id, admin.locationId);
    });
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
