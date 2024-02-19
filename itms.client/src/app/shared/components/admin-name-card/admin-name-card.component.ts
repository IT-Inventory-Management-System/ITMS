import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-name-card',
  templateUrl: './admin-name-card.component.html',
  styleUrls: ['./admin-name-card.component.css']
})
export class AdminNameCardComponent {
  @Input() adminDetail: any = {}; // Change this line
}
