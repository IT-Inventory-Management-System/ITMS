import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, Output, ViewChild, ViewContainerRef, EventEmitter } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
import { ArchiveModalComponent } from '../specification/archive-modal/archive-modal.component';


@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})

export class SpecificationComponent {
  @Input() isArchived: any;
  @Output() modelClicked = new EventEmitter<string>();
  currentStatus: any;

  selectedOption: string = 'Active';

  constructor(private dataService: DataService) {
     
  }

  selectModel(modelName: string) {
    console.log(modelName);
    this.modelClicked.emit(modelName);
  }
 
  get deviceDetails() {
    //console.log(this.isArchived);
    return this.dataService.DeviceDetails;
  }

  ngOnInit() {
    console.log("STATUS : ", this.deviceDetails?.status);
  }
 

  handleSelectionChange(selectedOption: string) {
    const archiveModal = document.getElementById('exampleModa');
    const unarchiveModal = document.getElementById('unarchive');
    const unassignable = document.getElementById('unassignable');

    if (selectedOption === 'Archive' && archiveModal) {
      archiveModal.classList.add('show');
      archiveModal.style.display = 'block';
    } else if (selectedOption === 'Unarchive' && unarchiveModal) {
      unarchiveModal.classList.add('show');
      unarchiveModal.style.display = 'block';
    }
    else if (selectedOption === 'Unassignable' && unassignable) {
      unassignable.classList.add('show');
      unassignable.style.display = 'block';
    }
  }
 
  handleModalClosed() {
  this.selectedOption = 'Active';
}

}
