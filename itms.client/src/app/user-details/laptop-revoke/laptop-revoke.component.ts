import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-laptop-revoke',
  templateUrl: './laptop-revoke.component.html',
  styleUrls: ['./laptop-revoke.component.css']
})
export class LaptopRevokeComponent {
  @Input() laptopDetails: any;
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;


  openModal(modalId: string) {
    const modelDiv = document.getElementById(modalId);
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModal(modalId: string) {
    const modelDiv = document.getElementById(modalId);
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
}
