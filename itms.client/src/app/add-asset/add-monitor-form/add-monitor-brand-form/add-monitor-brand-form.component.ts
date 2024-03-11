import { Component, Input } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-monitor-brand-form',
  templateUrl: './add-monitor-brand-form.component.html',
  styleUrls: ['./add-monitor-brand-form.component.css']
})
export class AddMonitorBrandFormComponent {
  deviceForm: FormGroup;

  UserId: any;
  userDataJSON: any;
  @Input() selectedOptions: { HDMI: boolean, VGA: boolean, DVI: boolean };
  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService) {

  }
  createForm() {
    this.deviceForm = this.fb.group({
      isHDMI: [''],
      isVGA: [''],
      isDVI: [''],
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
            if (data[i].categories[j].name == 'Monitor') {
              this.deviceForm.get('categoryId')?.setValue(data[i].categories[j].id);
            }
          }
        }
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnChanges(): void{
    console.log(this.selectedOptions);

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

  setFormValuesBasedOnSelectedOptions() {
    if (this.selectedOptions) {
      this.deviceForm.get('isHDMI')?.setValue(this.selectedOptions.HDMI);
      this.deviceForm.get('isVGA')?.setValue(this.selectedOptions.VGA);
      this.deviceForm.get('isDVI')?.setValue(this.selectedOptions.DVI);
    }
  }

  onSubmit() {
    this.setFormValuesBasedOnSelectedOptions();

    this.deviceForm.get('createdBy')?.setValue(this.UserId);
    this.deviceForm.get('updatedBy')?.setValue(this.UserId);



    if (this.deviceForm.valid) {

      console.log(this.deviceForm.value);

      this.dataService.postMonitorBrand(this.deviceForm.value).subscribe(
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

}
