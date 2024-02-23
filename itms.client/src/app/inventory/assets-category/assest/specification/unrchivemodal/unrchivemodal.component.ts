import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-unrchivemodal',
  templateUrl: './unrchivemodal.component.html',
  styleUrls: ['./unrchivemodal.component.css']
})
export class UnrchivemodalComponent {
  @Input() cygid: any;
  deviceForm: FormGroup;
  UserId: any;
  @Output() modalClosed = new EventEmitter<void>(); 

  userDataJSON: any;
  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.createForm();
    this.userDataJSON = localStorage.getItem('user');
    var userData = JSON.parse(this.userDataJSON);

     this.UserId = userData.id;

  }

  createForm() {
    this.deviceForm = this.fb.group({
      cygid: [''],
      createdBy: [''],
      updatedBy: [''],
      description: [''],
    });
  }

  onclick() {
    this.deviceForm.get('cygid')?.setValue(this.cygid);
    this.deviceForm.get('createdBy')?.setValue(this.UserId);
    this.deviceForm.get('updatedBy')?.setValue(this.UserId);
    console.log(this.deviceForm.value);

    this.dataService.UpdateDeviceStatusToNotAssigned(this.deviceForm.value)
      .subscribe(response => {
        if (response) {
          console.log("posted successfully");
        } else {
          console.error("error in posting data");
        }
      }, error => {
        console.error('Error updating status', error);
      });
    window.location.reload();
  }
  closemodal() {
    const archiveModal = document.getElementById('unarchive');
    if (archiveModal)
      archiveModal.style.display = 'none';
    this.deviceForm.get('description')?.setValue('');

    this.modalClosed.emit(); // Assuming you have a method in dataService to set the selected option

  }

}
