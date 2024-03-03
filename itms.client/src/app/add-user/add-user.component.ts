import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../shared/services/Employee.service';
import { DataService } from '../shared/services/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() selectedLocation: any;

  //deviceForm: FormGroup;
  showErrorMessage: boolean = false;
  previousDisabled: boolean = true;
  addAnotherClicked: boolean = false;
  userAddedCount = 0;
  locationId: string = '';

  curr: any = 0;
  idx: any = 0;
  list: FormGroup[] = [];
  res: any = [];
  userForm: FormGroup;
  //userForm: FormGroup[] = [];

  constructor(private formBuilder: FormBuilder, private empService: EmployeeService, private deviceService: DataService, private toastr: ToastrService) { }


  getDeviceLocation() {
    this.deviceService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            this.deviceService.locationId = this.locationId;
            //alert(this.locationId);
            break;
          }
        }
      },
      (error) => {
        console.log("User not found");
      });
  }



  ngOnInit(): void {
    this.getDeviceLocation();
    this.addUserForm();

  }






  addUserForm(): void {

    //this.userForm.push(this.createUserForm());
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cgiId: ['', Validators.required],
      //location: [this.locationId]
    });
  }

  previous(): void {
    if (this.idx <= 1) {
      this.idx--;
      this.previousDisabled = true;
      return;
    }
    if (this.idx == this.curr) {
      this.list.push(this.userForm);
    }
    this.idx--;
    this.userForm = this.list[this.idx];
  }

  cancel(): void {
    this.previousDisabled = true;
    this.idx = 0;
    this.curr = 0;
    this.list = [];
    this.res = [];
  }

  addNew(): void {
    if (this.idx == this.curr) {
      this.list.push(this.userForm);
    }
    this.previousDisabled = false;
    this.curr++;
    this.idx = this.curr;
    this.addUserForm();
  }

  addAnother(): void {
    if (this.idx != this.curr) {
      //this.idx = this.curr;
      this.addNew();
      //this.userForm = this.list[this.curr];
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
      console.log(this.list[i].get("firstName"));
      const formValue = this.list[i].value;

      console.log("selected location", this.selectedLocation)
      const formValueWithLocation = { ...formValue, location: this.selectedLocation };

      this.res.push(formValueWithLocation);

      console.log(formValueWithLocation);
      //this.res.push(this.list[i].value);
      //console.log(this.list[i].value);
    }


    if (this.res.length > 0) {
      this.empService.postUsers(this.res).subscribe(
        response => {
          console.log('Post successful', response);
          this.toastr.success("Data posted successfully");
        },
        error => {
          console.error('Error posting data', error);
          this.toastr.error("Error in posting data");
        }
      );
    }
    this.res = [];
    this.list = [];
    this.ngOnInit();
    this.addUserForm();
    this.idx = 0;
    this.curr = 0;
    this.userAddedCount = 0;

  }

}
