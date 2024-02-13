import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-software-revoke',
  templateUrl: './software-revoke.component.html',
  styleUrls: ['./software-revoke.component.css']
})
export class SoftwareRevokeComponent {
  @Input() softwareDetails: any;
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
