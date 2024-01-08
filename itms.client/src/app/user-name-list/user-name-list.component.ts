import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-name-list',
  templateUrl: './user-name-list.component.html',
  styleUrls: ['./user-name-list.component.css']
})
export class UserNameListComponent {
  @Input() cgiid: string;
  @Input() firstName: string;
  @Input() lastName: string;

}
