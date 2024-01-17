import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-software-component',
  templateUrl: './software-component.component.html',
  styleUrls: ['./software-component.component.css']
})
export class SoftwareComponentComponent {
  @Input() softwareData: any;
}
