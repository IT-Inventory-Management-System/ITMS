import { Component, Input } from '@angular/core';

import { DataService } from '../../../../../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive-modal',
  templateUrl: './archive-modal.component.html',
  styleUrls: ['./archive-modal.component.css']
})
export class ArchiveModalComponent {
  @Input() cygid: any;

  constructor(private dataService: DataService, private router: Router ) { }

  onclick() {
    const archiveDto = {
      cygid:this.cygid
    };
    console.log('archive' + archiveDto);

    this.dataService.UpdateDeviceStatusToDiscarded(archiveDto)
    
      .subscribe(response => {
        if (response) {
          console.log(`Device with cygid ${archiveDto.cygid} status updated to discarded.`);
          
        } else {
          console.error(`cygid ${archiveDto.cygid} already assigned`);
          // Handle the case where the device is not found or status update fails
        }
      }, error => {
        console.error('Error updating status', error);
        // Handle the error
      });
    window.location.reload();
  }
}


