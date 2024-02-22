import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-comments',
  templateUrl: './new-comments.component.html',
  styleUrls: ['./new-comments.component.css']
})
export class NewCommentsComponent {
  deviceForm: FormGroup;
 
  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.createForm();
    this.setCreatedBy();
    this.deviceDetails();
  }
  createForm() {
    this.deviceForm = this.fb.group({
      description: [''],
      createdBy: [''],
      createdAtUtc: [''],
      deviceId:['']
    });
  }
  setCreatedBy() {
    this.dataService.getFirstUser().subscribe(
      (data) => {
        this.deviceForm.get('createdBy')?.setValue(data.id);
      },
      (error) => {
        console.log("User not found");
      });
  }

  onSubmit() {
    this.deviceForm.get('createdAtUtc')?.setValue(new Date().toISOString());
    this.deviceForm.get('deviceId')?.setValue(this.dataService.DeviceDetails?.id);
    if (this.deviceForm.get('description')?.value) {
      if (this.deviceForm.valid) {
        console.log(this.deviceForm.value);
        this.dataService.postComments(this.deviceForm.value).subscribe(
          response => {
            console.log('Post successful', response);
            this.deviceForm.reset();
            this.setCreatedBy();
            this.toastr.success("Comment added successfully");
          },
          error => {
            console.error('Error posting data', error);
            this.toastr.error("Error in posting comment")
          }
        );
      }
    } 
  }

  get deviceDetails() {
    //console.log(this.isArchived);
    return this.dataService.DeviceDetails;
  }

}
