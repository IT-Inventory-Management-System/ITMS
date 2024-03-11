import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { FormBuilder } from '@angular/forms';
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

  ngOnInit(): void{
    
    this.getCgi();
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
    //this.deviceForm.get('storage')?.setValue(value);
    //this.hideErrorMessage();

  }

  selectOtherStorage(event: any) {
    if (this.selectedStorage == null) {
      //this.deviceForm.get('storage')?.setValue(event.target.value);
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

    };
  }
    increment() {
      this.counterValue++;
   
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
  }
  previous() {
    this.currentStep--;
  }
  loadMouseBrand() {
    const input = {
      categoryName: this.category
    }
    this.dataService.getAllBrands(input).subscribe(
      (data) => {
        console.log(data);
        this.dropdownValues = data.filter((item: any) => {
          if ((this.ifChecked && item.type === 'HDMI') ||
            (this.ifCheck && item.type === 'VGA') ||
            (this.iCheck && item.type === 'DVI')) {
            return true;
          }
          return false;
        });

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

  
}
