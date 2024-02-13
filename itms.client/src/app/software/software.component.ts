import { Component, Directive, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})



export class SoftwareComponent {
  selectedView: string = 'card';
}
