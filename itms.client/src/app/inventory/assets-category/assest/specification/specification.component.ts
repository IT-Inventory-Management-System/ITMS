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



  constructor(private dataService: DataService) { }


 
  get deviceDetails() {
    //console.log(this.isArchived);
    return this.dataService.DeviceDetails;
  }

 
  

}
