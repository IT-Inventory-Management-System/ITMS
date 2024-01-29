import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-software-form',
  templateUrl: './add-software-form.component.html',
  styleUrls: ['./add-software-form.component.css']
})
export class AddSoftwareFormComponent {
  SoftwareForm: FormGroup;
  showErrorMessage = false;

  dropdownValues: any[] = [];
  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService) {
    this.dropdownValues = [];
  }

  ngOnInit(): void {
    this.loadDropdownValues();
    this.createForm();
    this.setlocationId();

  }
  createForm() {
    this.SoftwareForm = this.fb.group({
      softwareId: [null, Validators.required],
      activationKey: [null, Validators.required],
      purchasedDate: [null, Validators.required],
      expiryDate: [null, Validators.required],
      qty: [null, Validators.required],
      assignedTo: [null],
      assignedBy: [null],
      assigndate: [null],
      locationId: [''],
    });
  }

  setlocationId() {
    if (!localStorage.getItem('selectedCountry')) {
      localStorage.setItem('selectedCountry','India');
    }
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.SoftwareForm.get('locationId')?.setValue(data[i].id);
            break;
          }
        }

      },
      (error) => {
        console.log("User not found");
      });
  }

  loadDropdownValues() {
    this.dataService.getSoftwares().subscribe(
      (data) => {
        this.dropdownValues = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching software values', error);
      }
    );
  }

  title = 'ITApp';
  isFormOpen: boolean = false;
  showPassword = false;
  model: any;

  counterValue: number = 0;

  get counterValues(): number[] {
    return Array.from({ length: this.counterValue }, (_, i) => i + 1);
  }

  increment() {
    this.counterValue++;
    this.SoftwareForm.patchValue({
      qty: this.counterValue
    });
  }

  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;
      this.SoftwareForm.patchValue({
        qty: this.counterValue
      });
    }
  }
  counterValue2: number = 0;

  get counterValues2(): number[] {
    return Array.from({ length: this.counterValue2 }, (_, i) => i + 1);
  }

  increment2() {
    this.counterValue2++;
    this.SoftwareForm.patchValue({
      qty: this.counterValue2
    });
  }

  decrement2() {
    if (this.counterValue2 > 0) {
      this.counterValue2--;
      this.SoftwareForm.patchValue({
        qty: this.counterValue2
      });
    }
  }
  counterValue3: number = 0;

  get counterValues3(): number[] {
    return Array.from({ length: this.counterValue3 }, (_, i) => i + 1);
  }

  increment3() {
    this.counterValue3++;
    this.SoftwareForm.patchValue({
      qty: this.counterValue3
    });
  }

  decrement3() {
    if (this.counterValue3 > 0) {
      this.counterValue3--;
      this.SoftwareForm.patchValue({
        qty: this.counterValue3
      });
    }
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleSoftwareForm() {
    this.isFormOpen = !this.isFormOpen;
  }
  onFormSubmitted() {
    // This method will be called when the form in app-add-software-model is submitted
    // Set isFormOpen to false to hide the form
   
    this.isFormOpen = false;
    this.ngOnInit();
  }

  selectedTypeName: string = 'Perpetual';

  checkForm() {

    if (this.selectedTypeName == 'Perpetual') {
      return this.SoftwareForm.get('purchasedDate')?.value != null && this.SoftwareForm.get('activationKey')?.value != null && this.SoftwareForm.get('qty')?.value != null;
    }

    else if (this.selectedTypeName == 'Validity') {
      return this.SoftwareForm.get('purchasedDate')?.value != null && this.SoftwareForm.get('activationKey')?.value != null && this.SoftwareForm.get('qty')?.value != null && this.SoftwareForm.get('expiryDate')?.value != null;
    }

    return this.SoftwareForm.get('purchasedDate')?.value != null && this.SoftwareForm.get('qty')?.value != null && this.SoftwareForm.get('expiryDate')?.value != null;
  }

  onSubmit() {

    if (this.checkForm()) {


      console.log(this.SoftwareForm.value);

      this.dataService.postSoftwaredata(this.SoftwareForm.value).subscribe(
        response => {
          console.log('Post successful', response);
          console.log('Before toastr call');
          
          this.hideErrorMessage();
          this.resetform();
          this.toastr.success("Data posted successfully");
        },
        error => {
          console.error('Error posting data', error);
          this.toastr.error("Error in posting Data");
        }
      );
    }
    else {
      this.showErrorMessage = true;

    }

  }
 
  dynamicChanges(event: any): void {
    
    const selectedValue = event;
    //console.log(selectedValue);

    const [typeName, softwareId] = selectedValue.split('@');

    this.selectedTypeName = typeName;

    
    // Now you have the typeName and softwareId, and you can use them as needed
    this.SoftwareForm.get('softwareId')?.setValue(softwareId);
  }
  hideErrorMessage() {
    this.showErrorMessage = false;
  }
  resetform() {
    this.SoftwareForm.reset();
    this.setlocationId();
    this.counterValue = 0;
    this.counterValue2 = 0;
    this.counterValue3 = 0;
  }



}
