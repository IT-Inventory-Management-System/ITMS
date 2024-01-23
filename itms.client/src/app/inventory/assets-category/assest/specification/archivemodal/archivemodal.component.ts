import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-archivemodal',
  templateUrl: './archivemodal.component.html',
  styleUrls: ['./archivemodal.component.css']
})
export class ArchivemodalComponent {
  @Input() modalTitle: string = 'Default Title';
  @Input() modalBodyText: string = 'Default body text';

  closeModal() {
    // Implement logic to close the modal
    console.log('Closing modal...');
  }

  saveChanges() {
    // Implement logic to save changes
    console.log('Saving changes...');
  }
}
