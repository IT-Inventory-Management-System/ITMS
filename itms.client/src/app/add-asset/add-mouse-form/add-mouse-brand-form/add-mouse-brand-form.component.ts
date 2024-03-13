import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../../../app/shared/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-mouse-brand-form',
  templateUrl: './add-mouse-brand-form.component.html',
  styleUrls: ['./add-mouse-brand-form.component.css']
})
export class AddMouseBrandFormComponent {
  deviceForm: FormGroup;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Input() selectedmedium: string;
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  showMessage = false;
  UserId: any;
  userDataJSON: any;

  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.createForm();
    this.setCategoryId();
    this.setmedium();
    this.userDataJSON = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var userData = JSON.parse(this.userDataJSON);

    // Access the 'id' property of the userData object
    this.UserId = userData.id;
  }
  dropdownValues: any[] = [];


  createForm() {
    this.deviceForm = this.fb.group({
      brand: [''],
      isWired: [''],
      categoryId: [''],
      createdBy: [''],
      createdAtUtc: [''],
      updatedBy: [''],
      updatedAtUtc: [''],
      isArchived: [false]
    });
  }
  setCategoryId() {
    this.dataService.getCategories().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].categories.length; j++) {
            if (data[i].categories[j].name == 'Mouse') {
              this.deviceForm.get('categoryId')?.setValue(data[i].categories[j].id);
            }
          }
        }
      },
      (error) => {
        console.log(error);
      });
  }

  onSubmit() {
    this.deviceForm.get('createdBy')?.setValue(this.UserId);
    this.deviceForm.get('updatedBy')?.setValue(this.UserId);
    this.deviceForm.get('createdAtUtc')?.setValue(new Date().toISOString());
    this.deviceForm.get('updatedAtUtc')?.setValue(new Date().toISOString());
  


    if (this.deviceForm.valid && this.showErrorMessage == false && this.showMessage==false) {

      console.log(this.deviceForm.value);

      this.dataService.postDeviceModel(this.deviceForm.value).subscribe(
        response => {
          this.formSubmitted.emit();

          console.log('Post successful', response);
          this.toastr.success("Data posted successfully");
        },
        error => {
          console.error('Error posting data', error);
          this.toastr.error("Error in posting data")
        }
      );
    }
    else {
      this.showMessage = true;
    }
  }

  setmedium() {


    if (this.selectedmedium == "wired") {
      this.deviceForm.get('isWired')?.setValue(1);
    }
    else {
      this.deviceForm.get('isWired')?.setValue(0);
    }
  }

  loadMouseBrand() {
    this.dataService.getMouseBrand().subscribe(
      (data) => {
        if (this.selectedmedium === 'wired') {

          this.dropdownValues = data.filter(item => item.iswired == 1);
        } else if (this.selectedmedium === 'wireless') {
          this.dropdownValues = data.filter(item => item.iswired == 0);

        }
        else {
          this.dropdownValues = data;
        }
        console.log(data);
      },
      (error) => {
        console.error('Error fetching device data', error);
      }
    );
  }

  updateBrand(event: any) {
    this.loadMouseBrand();
     
    this.showErrorMessage = false;

    const inputValue = event.target.value.toLowerCase();
    
    for (var i = 0; i < this.dropdownValues.length; i++) {
      if (this.dropdownValues[i].brand.toLowerCase() === inputValue) {
        this.showErrorMessage = true;
        this.errorMessage = 'Brand already exists.';
        break; 
      }
     

    }
  }
  hideErrorMessage() {
    this.showMessage = false;
  }
 
}
