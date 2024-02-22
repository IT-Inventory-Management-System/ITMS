import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exit-process',
  templateUrl: './exit-process.component.html',
  styleUrls: ['./exit-process.component.css']
})
export class ExitProcessComponent {

  constructor(private modalService: NgbModal) { }

  openModal(content: any): void {
    this.modalService.open(content, { centered: true });  // Open the modal
  }

  closeForm(): void {
    this.modalService.dismissAll();  // Close the modal
  }
}
