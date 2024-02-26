import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accesoriesname',
  templateUrl: './accesoriesname.component.html',
  styleUrls: ['./accesoriesname.component.css']
})
export class AccesoriesnameComponent {

  @Input() accessories: any

}
