import { Component, Input } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unrchivemodal',
  templateUrl: './unrchivemodal.component.html',
  styleUrls: ['./unrchivemodal.component.css']
})
export class UnrchivemodalComponent {
  @Input() cygid: any;

  constructor(private dataService: DataService, private router: Router) { }

  onclick() {
    const archiveDto = {
      cygid: this.cygid
    };
    console.log('archive' + archiveDto);

    this.dataService.UpdateDeviceStatusToNotAssigned(archiveDto)

      .subscribe(response => {
        if (response) {
          console.log(`Device with cygid ${archiveDto.cygid} status updated to Not Assigned.`);





        } else {
          console.error(`Device with cygid ${archiveDto.cygid} not found or status update failed.`);
          // Handle the case where the device is not found or status update fails
        }
      }, error => {
        console.error('Error updating status', error);
        // Handle the error
      });
    window.location.reload();
  }

}
