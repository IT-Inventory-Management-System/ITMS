import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../shared/services/Employee.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  //deviceForm: FormGroup;
  showErrorMessage: boolean = false;
  previousDisabled: boolean = true;
  addAnotherClicked: boolean = false;
  userAddedCount = 0;

  curr: any = 0;
  idx: any = 0;
  list: FormGroup[] = [];
  res: any = [];
  userForm: FormGroup;
  //userForm: FormGroup[] = [];

  constructor(private formBuilder: FormBuilder, private empService: EmployeeService) { }

  ngOnInit(): void {
    //this.initializeForm();
    this.addUserForm();
  }




  

  addUserForm(): void {
    // Initialize a new userForm FormGroup and push it to the userForms array

    //this.userForm.push(this.createUserForm());
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cgiId: ['', Validators.required]
    });
  }

  previous(): void {
    if (this.idx == this.curr) {
      this.list.push(this.userForm);
    }
    this.idx--;
    this.userForm = this.list[this.idx];
  }

  cancel(): void {
    this.previousDisabled = true;
    this.idx = 0;
    this.list = [];
    this.res = [];
  }

  addNew(): void {
    this.list.push(this.userForm);
    this.curr++;
    this.idx = this.curr;
    this.addUserForm();
  }

  addAnother(): void {
    if (this.idx != this.curr) {
      this.idx = this.curr;
      this.userForm = this.list[this.curr];

      //this.curr++;
      //this.idx = this.curr;
      //this.addUserForm();
    } else {
      this.addNew();
      this.addAnotherClicked = true;
      this.previousDisabled = false;
      this.userAddedCount++;
    }
  }

  onSubmit(): void {
    this.addNew();
    for (let i = 0; i < this.list.length; i++) {
      this.res.push(this.list[i].value);
      console.log(this.list[i].value);
    }


    if (this.res.length > 0) {
      this.empService.postUsers(this.res).subscribe(
        response => {
          console.log('Post successful', response);
          this.res = [];
          this.list = [];
          //this.deviceForm.reset();
          //this.selectedRam = null;
          //this.selectedStorage = null;
          //this.formSubmitted.emit();
          //this.toastr.success("Data posted successfully");
        },
        error => {
          console.error('Error posting data', error);
          //this.toastr.error("Error in posting data");
        }
      );
    }
    this.userAddedCount = 0;

  }

  //console.log('User forms submitted:', this.userForm.map(form => form.value));
  //alert("hello");
  //console.log(this.userForm.value.firstName);
  //console.log(this.userForm.value.lastName);
  //console.log(this.userForm.value.email);
  //console.log(this.userForm.value.cgiId);

  //this.devices.controls.forEach(deviceGroup => {
  //  console.log('Device Data:', deviceGroup.value);
  //});

  //if (this.userForm.valid) {
  //  const formValues = this.userForm.value;
  //  console.log('Form submitted with values:', formValues);
  //} else {
  //  // Handle form validation errors
  //}
}

