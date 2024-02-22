import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-exit-process',
  templateUrl: './exit-process.component.html',
  styleUrls: ['./exit-process.component.css']
})
export class ExitProcessComponent {
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;
  @Input() laptopDetails: any;
  @Input() accessoriesDetails: any;

  @Output() initiateExitProcess: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  onInitiateExitProcess() {
    this.initiateExitProcess.emit();
  }
  //closeForm(): void {
    
  //}
}
