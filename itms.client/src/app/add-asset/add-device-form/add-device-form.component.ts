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
      createdBy: ['B294E91E-37D6-4E55-8A14-6EA0D4D8DD0E'],
      createdAtUtc: [''],
      isArchived: [false],
      locationId: ['32ACEEE5-0664-4E21-B6A7-C5447336F5B2'],
      status: ['F408D1DA-E5B0-4644-9554-802E7666F075']
    });
  }

  get serialNumbers() {
    return this.addDeviceForm.get('serialNumberList') as FormArray;
  }

  get cygIds() {
    return this.addDeviceForm.get('cygIdsList') as FormArray;
  }

  updateSerialNumber(index: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.serialNumbers.at(index).setValue(value);
  }

  updateCygId(index: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.cygIds.at(index).setValue(value);
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
      this.addDeviceForm.get('warrantyDate')?.setValue(warrantyDate);
    }
  }


  onSubmit() {

    this.addDeviceForm.get('createdAtUtc')?.setValue(new Date().toISOString());
    //this.addDeviceForm.get('updatedAtUtc')?.setValue(new Date().toISOString());
    this.updateWarrantyDate();

    console.log(this.addDeviceForm.value);

    this.dataService.postDevice(this.addDeviceForm.value).subscribe(
      response => {
        console.log('Data Posted successfully', response);
      },
      error => {
        console.error('Error posting data', error);
      }
    );

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
    this.warrantyMonth = event.target.value;
  }

  setWarrantyYear(event: any): void {
    this.warrantyYear = event.target.value;
  }


  next() {
    //console.log(this.currentStep);
    this.currentStep++;
    for (let i = 0; i < this.counterValues.length; i++) {
      this.serialNumbers.push(this.fb.control('', Validators.required));
      this.cygIds.push(this.fb.control('', Validators.required));
    }
  }

  previous() {
    this.currentStep--;
  }

 }
