import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
import { ArchiveModalComponent } from '../specification/archive-modal/archive-modal.component';


@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})

export class SpecificationComponent {
  @Input() isArchived: any;

 
  selectedOption: string = 'Active'; // Initially selected option


  constructor(private dataService: DataService) { }


 
  get deviceDetails() {
    //console.log(this.isArchived);
    return this.dataService.DeviceDetails;
  }

 

  handleSelectionChange(selectedOption: string) {
    const archiveModal = document.getElementById('exampleModa');
    const unarchiveModal = document.getElementById('unarchive');

    if (selectedOption === 'Archive' && archiveModal) {
      archiveModal.classList.add('show');
      archiveModal.style.display = 'block';
    } else if (selectedOption === 'Unarchive' && unarchiveModal) {
      unarchiveModal.classList.add('show');
      unarchiveModal.style.display = 'block';
    }
  }
 
  handleModalClosed() {
  this.selectedOption = 'Active';
}

}
