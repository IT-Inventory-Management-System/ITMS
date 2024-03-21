import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataService} from '../../../app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { SelectedCountryService } from '../../shared/services/selected-country.service';

@Component({
  selector: 'app-add-mouse-form',
  templateUrl: './add-mouse-form.component.html',
  styleUrls: ['./add-mouse-form.component.css']
})

export class AddMouseFormComponent {
  UserId: any;
  userDataJSON: any;
  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService, private selectedCountryService: SelectedCountryService) {
    
  }

  ngOnInit(): void {
    this.getCgi();
    this.createForm();
    //this.setlocationId();
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.setlocationId();
    });
    this.setStatus();
    this.userDataJSON = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var userData = JSON.parse(this.userDataJSON);

    // Access the 'id' property of the userData object
    this.UserId = userData.id;
  }
  addDeviceForm: FormGroup;
  showErrorMessage = false;
  dropdownValues: any[] = [];
  currentStep: number = 1;
  laststoredcgi: number;
  showDeviceDetailsForm = false;
  selectedmedium: string='';

  toggleDeviceDetailsForm() {
    this.showDeviceDetailsForm = !this.showDeviceDetailsForm;
  }
  counterValue: number = 0;

  get counterValues(): number[] {
    return Array.from({ length: this.counterValue }, (_, i) => i + 1);
  }

  setlocationId() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.addDeviceForm.get('locationId')?.setValue(data[i].id);
            break;
          }
        }

      },
      (error) => {
        console.log("User not found");
      });
  }
  increment() {
    this.counterValue++;
    const ele = this.counterValue;
    this.pushValueIntoDeviceId('CGI-MOU ' + (this.laststoredcgi + ele));
    this.addDeviceForm.patchValue({
      qty: this.counterValue
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
  createForm() {
    this.addDeviceForm = this.fb.group({
      deviceModelId: [null, Validators.required],
      qty: [0, Validators.required],
      purchaseddate: ['', Validators.required],
      warrantydate: [null],
      deviceId: this.fb.array([]),
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      isArchived: [false],
      locationId: [''],
      status: [''],
      updatedAt:['']

    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = '' + (today.getMonth() + 1);
    let day = '' + today.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

 
  PurchasedDate(): string {
   var isPurchasedOn = this.addDeviceForm.get('purchaseddate')?.value != '';
    if (isPurchasedOn) {
      return this.addDeviceForm.get('purchaseddate')?.value;
    }
    return '';
}

  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;
      this.addDeviceForm.patchValue({
        qty: this.counterValue
      });
      // If you also want to remove the corresponding value from deviceId array when decrementing
      const deviceIdArray = this.addDeviceForm.get('deviceId') as FormArray;
      deviceIdArray.removeAt(deviceIdArray.length - 1);
    }
  }
  nextValidation(): boolean {
    var isDeviceId = this.addDeviceForm.get('deviceModelId')?.value != null;
    var isQuantity = this.counterValue > 0;
    var isPurchasedOn = this.addDeviceForm.get('purchaseddate')?.value != '';
   // var isWarrantyDate = this.addDeviceForm.get('warrantydate')?.value != null;
    return isDeviceId && isQuantity && isPurchasedOn ;
  }
  next() {
   
    if (this.nextValidation() == true) {
      this.hideErrorMessage();
      this.currentStep++;
    }
    else {
      this.showErrorMessage = true;
    }
  
  }


  previous() {
    this.currentStep--;
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
        //console.log(data);
      },
      (error) => {
        console.error('Error fetching device data', error);
      }
    );
  }

  getCgi() {
    this.dataService.getCGIID().subscribe(
      (data) => {
        this.laststoredcgi= parseInt(data[0]?.cgiid, 10);
        //console.log(this.laststoredcgi);
      },
      (error) => {
        console.error('Error fetching device data', error);

      }
    )
  }
  onFormSubmitted() {
    this.showDeviceDetailsForm = false;
    this.ngOnInit();
    this.loadMouseBrand();
  }

  onSubmit() {
    this.addDeviceForm.get('createdBy')?.setValue(this.UserId);
    this.addDeviceForm.get('updatedBy')?.setValue(this.UserId);
    this.addDeviceForm.get('createdAt')?.setValue(new Date().toISOString());
    this.addDeviceForm.get('updatedAt')?.setValue(new Date().toISOString());

    if (this.addDeviceForm.valid && this.showErrorMessage == false) {
      //console.log(this.addDeviceForm.value);

      this.dataService.postMouse(this.addDeviceForm.value).subscribe(
        response => {
          //console.log('Data Posted successfully', response);
          this.toastr.success("Data Posted SuccessFully");
          this.resettingform();

        },
        error => {
          console.error('Error posting data', error);
          this.toastr.error("Error in posting data");
        }
      );
    }
    else {
      this.showErrorMessage = this.addDeviceForm.invalid;

    }

  }
  pushValueIntoDeviceId(value: string) {
    const deviceIdArray = this.addDeviceForm.get('deviceId') as FormArray;
    deviceIdArray.push(this.fb.control(value));
  }

  resettingform() {
    this.addDeviceForm.reset();
    this.counterValue = 0;
    this.selectedmedium = '';
    this.currentStep = 1;

    this.ngOnInit();


  }
  hideErrorMessage() {
    this.showErrorMessage = false;
  }

}
