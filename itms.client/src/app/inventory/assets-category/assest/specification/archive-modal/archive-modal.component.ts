import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-archive-modal',
  templateUrl: './archive-modal.component.html',
  styleUrls: ['./archive-modal.component.css']
})
export class ArchiveModalComponent {
  @Input() cygid: any;
}
