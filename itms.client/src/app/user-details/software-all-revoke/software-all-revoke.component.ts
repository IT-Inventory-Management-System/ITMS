import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-software-all-revoke',
  templateUrl: './software-all-revoke.component.html',
  styleUrls: ['./software-all-revoke.component.css']
})
export class SoftwareAllRevokeComponent {
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;
  @Input() softwareDetails: any;
}
