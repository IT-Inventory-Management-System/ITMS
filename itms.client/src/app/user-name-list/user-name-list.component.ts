import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'user-name-list',
  templateUrl: './user-name-list.component.html',
  styleUrls: ['./user-name-list.component.css']
})
export class UserNameListComponent {
  @Input() cgiid: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() isSelected: boolean; // Add this line

  @Output() userSelected = new EventEmitter<UserNameListComponent>(); // Update the type here

  showDetails() {
    this.userSelected.emit(this);
  }

}
