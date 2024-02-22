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
        },
        error => {
          console.error('Error posting data', error);
        }
      );
    }
    this.res = [];
    this.list = [];
    this.ngOnInit();
    this.addUserForm();
    this.idx = 0;
    this.userAddedCount = 0;

  }
}

