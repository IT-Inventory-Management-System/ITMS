import { Component } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {
  DeviceData: any[] = [];

  constructor(private dataService: DataService) {
    this.DeviceData = [];
  }

  ngOnInit(): void {
    this.showDevices();
  }

  showDevices() {
    this.dataService.getDevices().subscribe(
      (data) => {
        this.DeviceData = data;
        console.log(this.DeviceData);
      },
      (error) => {
        console.log(error);
      }
    )
  }


}
