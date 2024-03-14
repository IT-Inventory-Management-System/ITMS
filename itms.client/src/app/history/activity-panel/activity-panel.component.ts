import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AdminDetailService } from '../../shared/services/admin-detail.service';

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

  @Input() CYGID: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('CYGID' in changes) {
      if (this.CYGID == null) {
      this.getAdminLogs(null, this.selectedAdmin.locationId);
      //alert("chnaged"+ this.CYGID);
      }
    }
  }

  localizeDateStr(date_to_convert_str: string): string {
    const date_to_convert = new Date(date_to_convert_str);
    const local_offset = date_to_convert.getTimezoneOffset() * 60 * 1000;
    const local_time = date_to_convert.getTime() - local_offset;
    const local_date = new Date(local_time);
    return local_date.toString();
  }

  toggleInputTypeTo(type: string) {
    const inputElement = document.querySelector('#purchaseDate');
    if (inputElement) {
      inputElement.setAttribute('type', type);
    }
  }
  toggleCheckboxTo(value: string) {
    this.purchseDate = new Date(value);
    var formattedDate = '';
    if (value !== '') {
      formattedDate = this.purchseDate.toISOString().split('T')[0];
    }
   // console.log(formattedDate);
    this.filteredLogs(this.selectedAdmin.id, this.selectedAdmin.locationId, formattedDate);
  }

  ngOnInit() {
    this.adminDetailService.selectedAdmin$.subscribe((admin) => {
      if (admin) {
        this.selectedAdmin = admin;
        this.getAdminLogs(admin.id, admin.locationId);
      }
    });
  }


  filteredLogs(employeeId: any, locationId: any, filterdate:any) {
    const body = {
      locationName: locationId,
      employeeId: employeeId,
      date: filterdate
    };
    //console.log("REQUEST BODY : ", body);
    this.adminDetailService.getFilteredLogs(body).subscribe(
      data => {
      //  console.log("ADMIN LOGS : ", data);
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
   // console.log("REQUEST BODY : ", body);
    this.adminDetailService.getLogs(employeeId, locationId).subscribe(
      data => {
      // console.log("ADMIN LOGS : ", data);
        this.admindata = data;
      },
      error => {
        console.error('Error fetching logs data', error);
      }
    );
  }

}
