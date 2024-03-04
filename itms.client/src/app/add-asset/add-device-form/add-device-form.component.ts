import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataService } from '../../../app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-device-form',
  templateUrl: './add-device-form.component.html',
  styleUrls: ['./add-device-form.component.css']
})
export class AddDeviceFormComponent implements OnInit {

  addDeviceForm: FormGroup;
  currentCygIdIndex: number | null = null;
  currentSerialIndex: number | null = null;

  // cygIds: FormArray;
  errorMessage: string;
  showErrorMessage = false;
  dropdownValues: any[] = [];
  selectedOS: string = '';
  warrantyMonth: number;
  warrantyYear: number;
  deviceData: any[] = [];
  locationId: string = '';
  showExistMessage: boolean = false;
  invalidSerialIndices: number[] = [];
  invalidCygIndices: number[] = [];
  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService) {
    this.dropdownValues = [];
  }

  currentStep: number = 1;

  ngOnInit(): void {
    //console.log('selectedos : ', this.selectedOS);
    this.getlaptopids();
    this.loadDropdownValues();
    //this.loadDeviceData();

    this.createForm();
    this.setCreatedBy();
    this.setlocationId();
    this.setStatus();

  }

  createForm() {
    this.addDeviceForm = this.fb.group({
      deviceModelId: [null, Validators.required],
      isChecked: [true],
      qty: [0, Validators.required],
      purchasedOn: [null, Validators.required],
      warrantyDate: [null, Validators.required],
      serialNumberList: this.fb.array([]),
      cygIdsList: this.fb.array([]),
      createdBy: [''],
      updatedBy: [''],
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

    if (this.validateSerialno(value, index)) {
      // Remove index from the invalidSerialIndices array if it exists
      const invalidIndexIndex = this.invalidSerialIndices.indexOf(index);
      if (invalidIndexIndex !== -1) {
        this.invalidSerialIndices.splice(invalidIndexIndex, 1);
      }

      this.serialNumbers.at(index).setValue(value);
    } else {
      // Add index to the invalidSerialIndices array if it's not already there
      if (!this.invalidSerialIndices.includes(index)) {
        this.invalidSerialIndices.push(index);
      }

      this.showExistMessage = true;
      this.errorMessage = 'CYG Id already exists or is repeated in current quantity.';
    }
  }
  updateCygId(index: number, event: Event) {
    this.hideErrorMessage();
    const value = (event.target as HTMLInputElement).value;

    if (this.validateCygId(value, index)) {
      // Remove index from the invalidCygIndices array if it exists
      const invalidIndexIndex = this.invalidCygIndices.indexOf(index);
      if (invalidIndexIndex !== -1) {
        this.invalidCygIndices.splice(invalidIndexIndex, 1);
      }

      this.cygIds.at(index).setValue(value);
    } else {
      // Add index to the invalidCygIndices array if it's not already there
      if (!this.invalidCygIndices.includes(index)) {
        this.invalidCygIndices.push(index);
      }

      this.showExistMessage = true;
      this.errorMessage = 'CYG Id already exists or is repeated in current quantity.';
    }
  }


  setCreatedBy() {
    this.dataService.getFirstUser().subscribe(
      (data) => { 
        this.addDeviceForm.get('createdBy')?.setValue(data.id);
        this.addDeviceForm.get('updatedBy')?.setValue(data.id);
      },
      (error) => {
        console.log("User not found");
      });
  }

  setPurchaseDate(event : any) {
    this.addDeviceForm.get('purchasedOn')?.setValue(event.target.value);
  }

  getDeviceLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            //alert(this.locationId);
            this.getlaptopids();
            break;
          }
        }
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

  getlaptopids() {
    this.dataService.getLaptopIDs().subscribe(
      (data) => {
        this.deviceData = data;

        console.log(this.deviceData);
        

      },
      (error) => {
        console.log(error);
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
    //console.log(this.selectedOS);
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

  //loadDeviceData() {
  //  this.dataService.getDevicesCyg(this.locationId).subscribe(
  //    (data) => {
  //      this.deviceData = data;
  //    },
  //    (error) => {
  //      console.error('Error fetching device data', error);
  //    }
  //  );
  //}

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
  const isExisting = serialNumbersArray.some(serialNumber => this.deviceData.some(device => device.serialNumber === serialNumber));
  const isValid = serialNumbersArray.every((serialNumber) => serialNumber.trim() !== '' && !isExisting);

  return isValid;
}

checkCygIds(): boolean {
  const cygIdsArray = this.cygIds.controls.map((control) => control.value);
  const isExisting = cygIdsArray.some(cygId => this.deviceData.some(device => device.cygId === cygId));
  const isValid = cygIdsArray.every((cygId) => cygId.trim() !== '' && !isExisting);

  return isValid;
}

  validateCygId(cygid: string, currentIndex: number): boolean {
    const cygIdsArray = this.cygIds.controls.map((control) => control.value);
    const isExisting = this.deviceData.some((device) => device.cygid === cygid);
    const isRepeated = cygIdsArray.filter((id, index) => id === cygid && index !== currentIndex).length > 0;
    return !isExisting && !isRepeated;
  }

  validateSerialno(serialNumber: string, currentIndex: number): boolean {
    const serialNumbersArray = this.serialNumbers.controls.map((control) => control.value);
    const isExisting = this.deviceData.some(device => device.serialNumber === serialNumber);
    const isRepeated = serialNumbersArray.filter((number, index) => number === serialNumber && index !== currentIndex).length > 0;
    return !isExisting && !isRepeated;
  }


  onSubmit() {

    this.addDeviceForm.get('createdAtUtc')?.setValue(new Date().toISOString());

    if (this.checkSerialNumber() && this.checkCygIds() && this.showErrorMessage == false) {
      console.log(this.addDeviceForm.value);

      this.dataService.postDevice(this.addDeviceForm.value).subscribe(
        response => {
          console.log('Data Posted successfully', response);
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
      this.errorMessage = 'Fields marked with an asterisk (*) are required.';
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
    var isDeviceId = this.addDeviceForm.get('deviceModelId')?.value != null;
    var isQuantity = this.counterValue > 0;
    var isPurchasedOn = this.addDeviceForm.get('purchasedOn')?.value != '';
    var isWarrantyDate = this.addDeviceForm.get('warrantyDate')?.value != null;
    console.log(this.addDeviceForm.value);
    console.log("check : ", isDeviceId && isQuantity && isPurchasedOn && isWarrantyDate);
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
      this.errorMessage = 'Fields marked with an asterisk (*) are required.';
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

    this.createForm();
    this.setCreatedBy();
    this.setlocationId();
    this.setStatus();
    this.counterValue = 0;
    this.currentStep = 1;
    
  }
  onFormSubmitted() {
    this.showDeviceDetailsForm = false;
    this.ngOnInit();
  }
  checkShowErrorMessage() {
    if (this.addDeviceForm.get('deviceModelId')?.value) {
      this.showErrorMessage = false;
    } else {
      this.showErrorMessage = true;
    }
  }
  checkShowError() {
    if (this.addDeviceForm.get('purchasedOn')?.value) {
      this.showErrorMessage = false;
    } else {
      this.showErrorMessage = true;
    }
  }
  checkMonth() {
    if (this.addDeviceForm.get('warrantyMonth')?.value) {
      this.showErrorMessage = false;
    } else {
      this.showErrorMessage = true;
    }
  }
 }
