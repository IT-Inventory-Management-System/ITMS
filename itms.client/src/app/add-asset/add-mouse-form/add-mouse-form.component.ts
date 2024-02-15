import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataService} from '../../../app/shared/services/data.service';

@Component({
  selector: 'app-add-mouse-form',
  templateUrl: './add-mouse-form.component.html',
  styleUrls: ['./add-mouse-form.component.css']
})

export class AddMouseFormComponent {
  constructor(private dataService: DataService, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.getCgi();
    this.createForm();
    this.setCreatedBy();
    this.setlocationId();
    this.setStatus();
  }
  addDeviceForm: FormGroup;

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
      deviceModelId: [null],
      qty: [1],
      purchaseddate: [''],
      warrantydate: [null],
      deviceId: this.fb.array(["cyg123"]),
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      isArchived: [false],
      locationId: [''],
      status: [''],
      updatedAt:['']

    });
  }

  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;
    
    }
  }
  next() {
   

      this.currentStep++;
        
  
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
        console.log(data);
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
        console.log(this.laststoredcgi);
      },
      (error) => {
        console.error('Error fetching device data', error);

      }
    )
  }
  onFormSubmitted() {
    this.showDeviceDetailsForm = false;
    this.ngOnInit();
  }

  onSubmit() {

    this.addDeviceForm.get('createdAt')?.setValue(new Date().toISOString());
    this.addDeviceForm.get('updatedAt')?.setValue(new Date().toISOString());
    this.addDeviceForm.get('purchaseddate')?.setValue(new Date().toISOString());
    this.addDeviceForm.get('warrantydate')?.setValue(new Date().toISOString());

      console.log(this.addDeviceForm.value);

      this.dataService.postMouse(this.addDeviceForm.value).subscribe(
        response => {
          console.log('Data Posted successfully', response);

        },
        error => {
          console.error('Error posting data', error);
        }
      );
    
  

  }

}
