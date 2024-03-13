import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() category: string = '';
  showErrorMessage = false;
  dropdownValues: any[] = [];
  errorMessage: string = '';
  showMessage = false;

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
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();


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
    this.loadMouseBrand();
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



    if (this.deviceForm.valid && this.showErrorMessage == false && this.showMessage == false) {

      console.log(this.deviceForm.value);

      this.dataService.postMonitorBrand(this.deviceForm.value).subscribe(
        response => {

          console.log('Post successful', response);
          this.toastr.success("Data posted successfully");
          this.formSubmitted.emit();

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
  loadMouseBrand() {
    const input = {
      categoryName: this.category
    };
    
    console.log("Selected Options:", this.selectedOptions);

    this.dataService.getAllBrands(input).subscribe(
      (data) => {
        console.log("Original Data:", data);
        this.dropdownValues = [];
        for (var i = 0; i < data.length; i++) {
          if (this.selectedOptions.HDMI == data[i].isHDMI && this.selectedOptions.VGA == data[i].isVGA && this.selectedOptions.DVI == data[i].isDVI) {
            this.dropdownValues.push(data[i]);
          }

        }

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
