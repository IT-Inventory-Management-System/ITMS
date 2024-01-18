import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-currentdevice',
  templateUrl: './currentdevice.component.html',
  styleUrls: ['./currentdevice.component.css']
})
export class CurrentdeviceComponent {
  @Input() device:any
}
