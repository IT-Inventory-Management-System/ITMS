import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-software-form',
  templateUrl: './add-software-form.component.html',
  styleUrls: ['./add-software-form.component.css']
})
export class AddSoftwareFormComponent {
  SoftwareForm: FormGroup;

  dropdownValues: any[] = [];
  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.dropdownValues = [];
  }

  ngOnInit(): void {
    this.loadDropdownValues();
    this.createForm();

  }
  createForm() {
    this.SoftwareForm = this.fb.group({
      softwareId: ['', Validators.required],
      activationKey: ['', Validators.required],
      purchasedDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      qty: [0, Validators.required],
      assignedTo: [null],
      assignedBy: [null],
      assigndate: [null],
      locationId: ['5BA1C78A-BE30-4256-85DA-85BCCE0108B6'],
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

  selectedTypeName: string = 'Perpetual';
  onSubmit() {



    console.log(this.SoftwareForm.value);

    this.dataService.postSoftwaredata(this.SoftwareForm.value).subscribe(
      response => {
        console.log('Post successful', response);
      },
      error => {
        console.error('Error posting data', error);
      }
    );

  }
 
  dynamicChanges(event: any): void {
    const selectedValue = event.target.value;
    const [typeName, softwareId] = selectedValue.split('@');
    this.selectedTypeName = typeName;
    // Now you have the typeName and softwareId, and you can use them as needed
    this.SoftwareForm.get('softwareId')?.setValue(softwareId);
  }

}
