import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-software-name',
  templateUrl: './software-name.component.html',
  styleUrls: ['./software-name.component.css']
})
export class SoftwareNameComponent {
  @Input() softwareData: any;
}
