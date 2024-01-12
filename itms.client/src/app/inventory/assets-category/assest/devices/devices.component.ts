import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {
  DeviceData: any[] = [];
  Cygid = this.DeviceData;
  showArchiveOnly: boolean = false;
  ArchivedData: any[] = [];
  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.showDevices();
  }


  showDevices() {
    this.dataService.getDevices().subscribe(
      (data) => {
        this.DeviceData = data;
        console.log(data)
      });
  }

  showArchivedDevices() {
    this.dataService.getArchivedDevices()
      .subscribe(data => {
        this.DeviceData = data;
        console.log(data);
      });
  }


}
