import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent {
  @Input() Cygid: string = '';

  constructor() {
    console.log(this.Cygid);
  }

}
