import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent {
  @Input() device: any;

  @Output() selectedDevice = new EventEmitter<string>();

  onDeviceClick() {
    this.selectedDevice.emit(this.device);
  }

  

}
