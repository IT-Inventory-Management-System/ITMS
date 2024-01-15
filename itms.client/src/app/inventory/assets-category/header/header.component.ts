import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  Archiveddevices: any[];

  constructor(private deviceService: DataService) { }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.deviceService.getArchivedDevices()
        .subscribe(data => {
          this.deviceService.Archiveddevices=data
          this.Archiveddevices = data;
          console.log(this.Archiveddevices);
        });
    } else {
      this.Archiveddevices = [];
    }
  }
}


