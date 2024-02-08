import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accessories-revoke',
  templateUrl: './accessories-revoke.component.html',
  styleUrls: ['./accessories-revoke.component.css']
})
export class AccessoriesRevokeComponent {
  @Input() accessoriesDetails: any;
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
