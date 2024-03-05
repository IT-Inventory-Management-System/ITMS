import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DataService } from '../../../../../shared/services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-unassignable-modal',
  templateUrl: './unassignable-modal.component.html',
  styleUrls: ['./unassignable-modal.component.css']
})
export class UnassignableModalComponent {
  @Input() cygid: any;
  @Output() modalClosed = new EventEmitter<void>();
  deviceForm: FormGroup;
  UserId: any;
  userDataJSON: any;
  ShowErrorMessage: boolean = false;
  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.createForm();
    this.userDataJSON = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var userData = JSON.parse(this.userDataJSON);

    // Access the 'id' property of the userData object
    this.UserId = userData.id;

    // Alert the value of the 'id' property
  }
  createForm() {
    this.deviceForm = this.fb.group({
      cygid: [''],
      createdBy: [''],
      updatedBy: [''],
      description: [''],
      isUnassignable: true
    });
  }


  onclick() {

    this.deviceForm.get('cygid')?.setValue(this.cygid);
    this.deviceForm.get('createdBy')?.setValue(this.UserId);
    this.deviceForm.get('updatedBy')?.setValue(this.UserId);

    if (this.deviceForm.valid) {
      console.log(this.deviceForm.value);



      this.dataService.setDeviceUnassignable(this.deviceForm.value).subscribe(response => {
          if (response) {
            console.log("Unassigned Device successfully");

          } else {
            console.error("error in posting data");
          }
        }

          , error => {
            console.error('Error updating status', error);
          });
    }


  }

  handleSelectionChange() {
    const archiveModal = document.getElementById('unassignable');

    if (this.deviceForm.valid && archiveModal) {
      archiveModal.style.display = 'block';
      window.location.reload();

    }
    else {
      this.ShowErrorMessage = true;
    }
  }
  hideErrorMessage() {
    this.ShowErrorMessage = false;

  }
  closemodal() {
    const archiveModal = document.getElementById('unassignable');
    if (archiveModal)
      archiveModal.style.display = 'none';
    this.deviceForm.get('description')?.setValue('');

    this.modalClosed.emit(); // Assuming you have a method in dataService to set the selected option

  }
}
