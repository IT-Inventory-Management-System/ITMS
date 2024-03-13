import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-accessory-brand-form',
  templateUrl: './add-accessory-brand-form.component.html',
  styleUrls: ['./add-accessory-brand-form.component.css']
})
export class AddAccessoryBrandFormComponent {
  deviceForm: FormGroup;
  @Input() category: string = '';
  //showErrorMessage = false;
  //dropdownValues: any[] = [];
  //errorMessage: string = '';
  //showMessage = false;

  UserId: any;
  userDataJSON: any;
  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.createForm();
    this.setCategoryId();
    this.userDataJSON = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var userData = JSON.parse(this.userDataJSON);

    // Access the 'id' property of the userData object
    this.UserId = userData.id;
  }

  createForm() {
    this.deviceForm = this.fb.group({
      createdBy: [''],
      updatedBy: [''],
      brand: [''],
      categoryId: [''],
    });
  }
  setCategoryId() {
    this.dataService.getCategories().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].categories.length; j++) {
            if (data[i].categories[j].name == this.category) {
              this.deviceForm.get('categoryId')?.setValue(data[i].categories[j].id);
            }
          }
        }
      },
      (error) => {
        console.log(error);
      });
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  onSubmit() {

    //this.deviceForm.get('createdAtUtc')?.setValue(new Date().toISOString());
    //this.deviceForm.get('updatedAtUtc')?.setValue(new Date().toISOString());



    
    this.deviceForm.get('createdBy')?.setValue(this.UserId);
    this.deviceForm.get('updatedBy')?.setValue(this.UserId);
      console.log(this.deviceForm.value);

    this.dataService.postCommonBrand(this.deviceForm.value).subscribe(
        response => {

          console.log('Post successful', response);
          this.toastr.success("Data posted successfully");
        },
        error => {
          console.error('Error posting data', error);
          this.toastr.error("Error in posting data")
        }
      );
   
  }
}
