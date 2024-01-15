import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-device',
  templateUrl: './current-device.component.html',
  styleUrls: ['./current-device.component.css']
})
export class CurrentDeviceComponent {
  @Input() device: any;

 
}
