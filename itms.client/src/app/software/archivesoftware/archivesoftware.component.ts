import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-archivesoftware',
  templateUrl: './archivesoftware.component.html',
  styleUrls: ['./archivesoftware.component.css']
})
export class ArchivesoftwareComponent {
  isarchivedclicked: boolean = false;
  @Input() singlesoftware: any = null;
 

  @Output() archiveClicked: EventEmitter<any> = new EventEmitter<any>();
 
  onarchive() {
    console.log(this.isarchivedclicked);
    this.isarchivedclicked = true;
    
    this.archiveClicked.emit(this.isarchivedclicked);
    setTimeout(() => {
      this.isarchivedclicked = false;
    }, 0);
  }


  



  }
 
  


