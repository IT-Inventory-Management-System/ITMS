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


  list: FormGroup[] = [];
  res: any = [];
  userForm: FormGroup;
  //userForm: FormGroup[] = [];

  idx: any = 0;
  //devices: any;

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

  //createUserForm(): FormGroup {
  //  // Create a new userForm FormGroup with form controls and validators
  //  return this.formBuilder.group({
  //    firstName: ['', Validators.required],
  //    lastName: ['', Validators.required],
  //    email: ['', [Validators.required, Validators.email]],
  //    cgiId: ['', Validators.required]
  //  });
  //}

  //initializeForm(): void {
  //  this.userForm = this.formBuilder.group({
  //    firstName: ['', Validators.required],
  //    lastName: ['', Validators.required],
  //    email: ['', [Validators.required, Validators.email]],
  //    cgiId: ['', Validators.required]
  //  });
  //}

  //initializeForm(): void {

  //  this.deviceForm = this.formBuilder.group({
  //    devices: this.formBuilder.array([])
  //  });
  //}

  //addDevice(): void {
  //  const deviceGroup = this.formBuilder.group({
  //    deviceName: ['', Validators.required],
  //    brand: ['', Validators.required],
  //    modelNo: ['', Validators.required],
  //    ram: ['', Validators.required],
  //    processor: ['', Validators.required],
  //    storage: ['', Validators.required]
  //  });
  //  (this.deviceForm.get('devices') as FormArray).push(deviceGroup);
  //  //this.devices.push(deviceGroup);
  //}

  //get devices() {
  //  return (this.deviceForm.get('devices') as FormArray);
  //}




  previous(): void {

  }

  cancel(): void {
    this.previousDisabled = true;
  }

  addNew(): void {
    this.list.push(this.userForm);
    this.addUserForm();
  }

  addAnother(): void {
    this.addNew();
    this.addAnotherClicked = true;
    this.previousDisabled = false;
  }

  onSubmit(): void {
    this.addNew();
    for (let i = 0; i < this.list.length; i++) {
      this.res.push(this.list[i].value);
      console.log(this.list[i].value);
    }



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

