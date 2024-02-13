import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  //deviceForm: FormGroup;
  showErrorMessage: boolean = false;

  
  list: FormGroup[] = [];
  userForm: FormGroup;
  //userForm: FormGroup[] = [];

  idx: any = 0;
  //devices: any;

  constructor(private formBuilder: FormBuilder) { }

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
  
    alert("previous");
  }

  cancel(): void {
    alert("cancel");
  }

  addNew(): void {
    this.list.push(this.userForm);
    this.addUserForm();
  }

  addAnother(): void {
    this.addNew();
    alert("add");
  }

  onSubmit(): void {
    this.addNew();
    for (let i=0; i < this.list.length; i++) {
      console.log(this.list[i].value);
    }
    this.list = [];
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
}
