import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataService } from '../../../app/shared/services/data.service';


@Component({
  selector: 'app-add-device-form',
  templateUrl: './add-device-form.component.html',
  styleUrls: ['./add-device-form.component.css']
})
export class AddDeviceFormComponent implements OnInit {

  addDeviceForm: FormGroup;
  // cygIds: FormArray;
  errorMessage: string;
  showErrorMessage = false;
  dropdownValues: any[] = [];
  selectedOS: string = '';
  warrantyMonth: number;
  warrantyYear: number;
 
  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.dropdownValues = [];
  }

  currentStep: number = 1;

  ngOnInit(): void {
    this.loadDropdownValues();
    this.createForm();
    this.setCreatedBy();
    this.setlocationId();
    this.setStatus();
  }

  createForm() {
    this.addDeviceForm = this.fb.group({
      deviceModelId: ['', Validators.required],
      isChecked: [true],
      qty: [0, Validators.required],
      purchasedOn: ['', Validators.required],
      warrantyDate: [null, Validators.required],
      serialNumberList: this.fb.array([]),
      cygIdsList: this.fb.array([]),
      createdBy: [''],
      createdAtUtc: [''],
      isArchived: [false],
      locationId: [''],
      status: ['']
    });
  }

  get serialNumbers() {
    return this.addDeviceForm.get('serialNumberList') as FormArray;
  }

  get cygIds() {
    return this.addDeviceForm.get('cygIdsList') as FormArray;
  }

  updateSerialNumber(index: number, event: Event) {
    this.hideErrorMessage();
    const value = (event.target as HTMLInputElement).value;
    this.serialNumbers.at(index).setValue(value);
  }

  updateCygId(index: number, event: Event) {
    this.hideErrorMessage();
    const value = (event.target as HTMLInputElement).value;
    this.cygIds.at(index).setValue(value);
  }

  setCreatedBy() {
    this.dataService.getFirstUser().subscribe(
      (data) => { 
        this.addDeviceForm.get('createdBy')?.setValue(data.id);
      },
      (error) => {
        console.log("User not found");
      });
  }

  setlocationId() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')){
            this.addDeviceForm.get('locationId')?.setValue(data[i].id);
            break;
          }
        }
        
      },
      (error) => {
        console.log("User not found");
      });
  }

  setStatus() {
    this.dataService.getStatus().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == 'Not Assigned') {
            this.addDeviceForm.get('status')?.setValue(data[i].id);
            break;
          }
        }

      },
      (error) => {
        console.log("User not found");
      });
  }


  loadDropdownValues() {
    this.dataService.getDeviceModel().subscribe(
      (data) => {
        if (this.selectedOS) {
          this.dropdownValues = data.filter(item => item.osName === this.selectedOS);
        } else {
          // If no OS selected, show all devices
          this.dropdownValues = data;
        }
        console.log(data);
      },
      (error) => {
        console.error('Error fetching dropdown values', error);
      }
    );
  }

  updateWarrantyDate() {
    const month = this.warrantyMonth;
    const year = this.warrantyYear;

    if (month !== null && year !== null) {
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
      const warrantyDate = new Date(year, month, 1);
      this.addDeviceForm.get('warrantyDate')?.setValue(warrantyDate.toISOString());
    }
  }

  checkSerialNumber(): boolean {
    const serialNumbersArray = this.serialNumbers.controls.map((control) => control.value);
    const isValid = serialNumbersArray.every((serialNumber) => serialNumber.trim() !== '');

    return isValid;
  }

  checkCygIds(): boolean {
    const cygIdsArray = this.cygIds.controls.map((control) => control.value);
    const isValid = cygIdsArray.every((cygId) => cygId.trim() !== '');

    return isValid;
  }

  onSubmit() {

    this.addDeviceForm.get('createdAtUtc')?.setValue(new Date().toISOString());

    if (this.checkSerialNumber() && this.checkCygIds()) {
      console.log(this.addDeviceForm.value);

      this.dataService.postDevice(this.addDeviceForm.value).subscribe(
        response => {
          console.log('Data Posted successfully', response);
          this.resetform();
        },
        error => {
          console.error('Error posting data', error);
        }
      );
    }
    else {
      this.showErrorMessage = true;
      this.errorMessage = 'All Fields are Required';
    }

  }

  counterValue: number = 0;

  get counterValues(): number[] {
    return Array.from({ length: this.counterValue }, (_, i) => i + 1);
  }

  increment() {
    this.counterValue++;
    this.addDeviceForm.patchValue({
      qty: this.counterValue
    });
  }

  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;
      this.addDeviceForm.patchValue({
        qty: this.counterValue
      });
    }
  }

  showDeviceDetailsForm = false;

  toggleDeviceDetailsForm() {
    this.showDeviceDetailsForm = !this.showDeviceDetailsForm;
  }


  setWarrantyMonth(event: any): void {
    this.showErrorMessage = false;
    const selectedMonth = parseInt(event.target.value, 10);

    if (selectedMonth > 0 && selectedMonth < 13) {
      this.warrantyMonth = selectedMonth;
    } else {
      this.showErrorMessage = true;
      this.errorMessage = 'Invalid warranty month';
    }
  }

  setWarrantyYear(event: any): void {
    this.showErrorMessage = false;
    const selectedYear = parseInt(event.target.value, 10);
    const currentYear = new Date().getFullYear();
    if (selectedYear >= currentYear) {
      this.warrantyYear = selectedYear;
    } else {
      this.showErrorMessage = true;
      this.errorMessage = 'Invalid warranty year';
    }
  }

  nextValidation(): boolean {
    var isDeviceId = this.addDeviceForm.get('deviceModelId')?.value != '';
    var isQuantity = this.counterValue > 0;
    var isPurchasedOn = this.addDeviceForm.get('purchasedOn')?.value != '';
    var isWarrantyDate = this.addDeviceForm.get('warrantyDate')?.value != null;
    console.log(isDeviceId && isQuantity && isPurchasedOn && isWarrantyDate);
    return isDeviceId && isQuantity && isPurchasedOn && isWarrantyDate;
  }


  next() {
    if (this.warrantyMonth && this.warrantyYear) {
      this.updateWarrantyDate();
    }

    if (this.nextValidation() == true) {
      this.hideErrorMessage();
      this.currentStep++;
      if (this.serialNumbers.length == 0) {
        for (let i = 0; i < this.counterValues.length; i++) {
          this.serialNumbers.push(this.fb.control('', Validators.required));
          this.cygIds.push(this.fb.control('', Validators.required));
        }
      }
    }
    else {
      this.showErrorMessage = true;
      this.errorMessage = 'All Fields are Required';
      //console.log(this.addDeviceForm.valid);
      //console.log(this.addDeviceForm);
    }
  }

  previous() {
    this.currentStep--;
  }

  hideErrorMessage() {
    this.showErrorMessage = false;
  }
  resetform() {

    this.addDeviceForm.reset();
    this.setCreatedBy();
    this.setlocationId();
    this.setStatus();
    this.counterValue = 0;
    this.currentStep = 1;
    
  }
 }
