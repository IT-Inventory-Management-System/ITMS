import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lastdate',
  templateUrl: './lastdate.component.html',
  styleUrls: ['./lastdate.component.css']
})
export class LastdateComponent {
  @Input() singlesoftware: any;
}
