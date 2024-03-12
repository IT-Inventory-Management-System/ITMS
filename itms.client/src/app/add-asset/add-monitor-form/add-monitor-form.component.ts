import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-monitor-form',
  templateUrl: './add-monitor-form.component.html',
  styleUrls: ['./add-monitor-form.component.css']
})
export class AddMonitorFormComponent {
  currentStep: number = 1;
  ifChecked: boolean = false;
  ifCheck: boolean = false;
  showDeviceDetailsForm: boolean=false;
  iCheck: boolean = false;
  laststoredcgi: number;
  dropdownValues: any[] = [];
  UserId: any;
  userDataJSON: any;
  selectedStorage: string | null = null;
  counterValue: number = 0;
  @Input() category: string = '';
  selectedOptions = { HDMI: false, VGA: false, DVI: false };
  deviceForm: FormGroup;

  ngOnInit(): void{
    
    this.getCgi();
    this.setStatus();
    this.setlocationId();
    this.createForm(); 
    this.loadMouseBrand();
    this.userDataJSON = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var userData = JSON.parse(this.userDataJSON);

    // Access the 'id' property of the userData object
    this.UserId = userData.id;
  }

  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService) {

  }
  toggleDeviceDetailsForm() {
    this.ifChecked = !this.ifChecked;
    this.emitSelectedOptions();
  
  }
  toggleDeviceDetails() {
    this.ifCheck = !this.ifCheck;
    this.emitSelectedOptions();
    

  }

  toggleDevice() {
    this.iCheck = !this.iCheck;
    this.emitSelectedOptions();
  

  }
  toggleDetails() {
    this.showDeviceDetailsForm = !this.showDeviceDetailsForm;
  }
  onFormSubmitted() {
    this.showDeviceDetailsForm = false;
  }
  selectStorage(value: string) {
    this.selectedStorage = value;
    this.deviceForm.get('screenSize')?.setValue(value);
    //this.hideErrorMessage();

  }

  selectOtherStorage(event: any) {
    if (this.selectedStorage == null) {
      this.deviceForm.get('screenSize')?.setValue(event.target.value);
      //this.hideErrorMessage();
    }
  
  }
  get counterValues(): number[] {
    return Array.from({ length: this.counterValue }, (_, i) => i + 1);
  }

  deselectAllButtons() {
    this.selectedStorage = ''; // Deselect all buttons when input field is clicked
  }
  decrement() {
if (this.counterValue > 0) {
      this.counterValue--;
      this.deviceForm.patchValue({
        qty: this.counterValue
      });
      // If you also want to remove the corresponding value from deviceId array when decrementing
      const deviceIdArray = this.deviceForm.get('deviceId') as FormArray;
      deviceIdArray.removeAt(deviceIdArray.length - 1);
    }
  }
    increment() {
      this.counterValue++;
      const ele = this.counterValue;
      this.pushValueIntoDeviceId('CGI-MON ' + (this.laststoredcgi + ele));
      this.deviceForm.patchValue({
        qty: this.counterValue
      });   
      };
    
  next() {
     this.currentStep++;
 }
  emitSelectedOptions() {
    this.selectedOptions = {
      HDMI: this.ifChecked,
      VGA: this.ifCheck,
      DVI: this.iCheck
    };
    this.loadMouseBrand();

  }
  previous() {
    this.currentStep--;
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

  getCgi() {
    this.dataService.getCGIIDMonitor().subscribe(
      (data) => {
        this.laststoredcgi = parseInt(data[0]?.cgiid, 10);

        console.log(this.laststoredcgi);
      },
      (error) => {
        console.error('Error fetching device data', error);

      }
    )
  }

  createForm() {
    this.deviceForm= this.fb.group({
      deviceModelId: [null],
      qty: [0],
      purchaseddate: [''],
      warrantydate: [null],
      deviceId: this.fb.array([]),
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      isArchived: [false],
      locationId: [''],
      status: [''],
      updatedAt: [''],
      screenSize: ['']

    });
  }
  setlocationId() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.deviceForm.get('locationId')?.setValue(data[i].id);
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
            this.deviceForm.get('status')?.setValue(data[i].id);
            break;
          }
        }

      },
      (error) => {
        console.log("User not found");
      });
  }
  onSubmit() {

    this.deviceForm.get('createdBy')?.setValue(this.UserId);
    this.deviceForm.get('updatedBy')?.setValue(this.UserId);
    this.deviceForm.get('createdAt')?.setValue(new Date().toISOString());
    this.deviceForm.get('updatedAt')?.setValue(new Date().toISOString());



    console.log(this.deviceForm.value);

    this.dataService.postMonitorDetails(this.deviceForm.value).subscribe(
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
  pushValueIntoDeviceId(value: string) {
    const deviceIdArray = this.deviceForm.get('deviceId') as FormArray;
    deviceIdArray.push(this.fb.control(value));
  }

  }

  
