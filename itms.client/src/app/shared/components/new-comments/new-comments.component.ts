import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-new-comments',
  templateUrl: './new-comments.component.html',
  styleUrls: ['./new-comments.component.css']
})
export class NewCommentsComponent {
  deviceForm: FormGroup;
  commentsData: any[] = [];
 
  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.createForm();
    this.setCreatedBy();
    /*this.deviceDetails();*/
    this.dataService.buttonClicked$.subscribe(() => {
      // Call getComments whenever the button is clicked
      if (this.dataService.DeviceDetails && this.dataService.DeviceDetails.id) {
        this.getComments(this.dataService.DeviceDetails.id);
      }
    });
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
            //this.getComments();
            this.deviceForm.reset();
            this.setCreatedBy();
            this.getComments(this.dataService.DeviceDetails.id);
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

  getComments(deviceId: any) {
    this.dataService.getAllComments(deviceId).subscribe(
      (data) => {
        this.commentsData = data;
        console.log("comments : ", this.commentsData);
        this.changeDateFormat();
      },
      error => {
        console.error('Error fetching comments: ', error);
      }
    );
  }

  get deviceDetails() {
    //console.log(this.isArchived);
    return this.dataService.DeviceDetails;
  }

  changeDateFormat() {

    for (var i = 0; i < this.commentsData.length; i++) {
      const date = new Date(this.commentsData[i].updatedDate);
      this.commentsData[i].updatedDate = formatDate(date, 'dd-MM-yyyy', 'en-US');
      for (var j = 0; j < this.commentsData[i].comments.length; j++) {
        const time = new Date(this.commentsData[i].comments[j].createdAtUtc);
        this.commentsData[i].comments[j].createdAtUtc = formatDate(time, 'hh:mm a', 'en-US');
      }
    }
  }

}
