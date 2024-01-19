import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assign-laptop',
  templateUrl: './assign-laptop.component.html',
  styleUrls: ['./assign-laptop.component.css']
})
export class AssignLaptopComponent {
  @Input() LaptopOptions: any[] = [];
  @Output() LaptopOptionSelected: EventEmitter<any> = new EventEmitter();
  @Output() LaptopComment: EventEmitter<any> = new EventEmitter();
  @Input() ControlNameSelectedLaptop: FormGroup;

  SelectedLaptopVersion: any;
  LaptopSearchBoxOptionSelected(event: any): void {
    //console.log('LaptopSearchBoxOptionSelected', event);
    this.SelectedLaptopVersion = event;
    this.LaptopOptionSelected.emit(event);
  }
  CommentBox(event: any): void {
    console.log('LaptopCommentBox', event);
    this.LaptopComment.emit(event);
  }
}
