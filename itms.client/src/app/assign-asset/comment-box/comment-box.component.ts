import { Component, EventEmitter, Output, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent {
  @Output() CommentBox: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  inputText: string = '';

  onInputChange(event: any): void {
    console.log("comment",event.target.value);
    this.inputText = event.target.value;
    this.CommentBox.emit(this.inputText);
  }
}
