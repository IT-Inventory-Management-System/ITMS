import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './devices/devices.component';
@Component({
  selector: 'app-assest',
  templateUrl: './assest.component.html',
  styleUrls: ['./assest.component.css']
})
export class AssestComponent {
  isArchived: boolean = false;
  selectedItem: any;
  selectedView: string='table';

  @ViewChild('appDevices') appDevices: DevicesComponent;
  constructor(private deviceService: DataService) { }

    dropdownItems = [
    { id: "Windows", name: 'Windows Laptop' },
    { id: "Mac", name: 'Macbook' },
   
  ];

  onCheckboxChange(event: any) {
    if (event.target.checked == true) {
      this.appDevices.showArchivedDevices();
    } else {
      this.appDevices.showDevices();
    }
  }
}
