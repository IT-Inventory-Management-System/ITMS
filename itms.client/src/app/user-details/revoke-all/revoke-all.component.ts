import { Component, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../shared/services/Employee.service';

@Component({
  selector: 'app-revoke-all',
  templateUrl: './revoke-all.component.html',
  styleUrls: ['./revoke-all.component.css']
})
export class RevokeAllComponent {
  currentStep = 1;
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;
  @Input() laptopDetails: any;
  @Input() accessoriesDetails: any;
  @Input() softwareDetails: any;
  variable1: boolean = true; 
  variable2: boolean = false; 
  variable3: boolean = true; 
  
  revokeAllForm: FormGroup;
  actionsArray: any[] = [];
  filteredLaptopDetails: any;
  filteredAccessoriesDetails: any;
  filteredSoftwareDetails: any;

  onVariable1Change(value: boolean) {
    this.variable1 = value;
  }

  onVariable2Change(value: boolean) {
    this.variable2 = value;
  }

  onVariable3Change(value: boolean) {
    this.variable3 = value;
  }

  // Filter the details in ngOnChanges lifecycle hook
  ngOnChanges() {
    if (this['laptopDetails'] && Array.isArray(this['laptopDetails']))
      this.filteredLaptopDetails = this['laptopDetails'].filter((laptop: any) => laptop.submitedBy === null);
    if (this['softwareDetails'] && Array.isArray(this['softwareDetails']))
      this.filteredSoftwareDetails = this['softwareDetails'].filter((software: any) => software.recievedBy === null);
    if (this['accessoriesDetails'] && Array.isArray(this['accessoriesDetails'])) 
      this.filteredAccessoriesDetails = this['accessoriesDetails'].filter((accessory: any) => accessory.submittedBy === null);
  }
  constructor(private formBuilder: FormBuilder, private revokeAllService: EmployeeService, private actionService: EmployeeService, private employeeService: EmployeeService) {
    this.revokeAllForm = this.formBuilder.group({
      userid: [null, Validators.required],
      Laptop: this.formBuilder.array([]),
      Software: this.formBuilder.array([]),
      Accessory: this.formBuilder.array([]),
    });
    this.actionService.getActions().subscribe(
      (actions) => {
        this.actionsArray = actions;
        console.log(this.actionsArray);
      },
      (error) => {
        console.error('Error fetching actions:', error);
      }
    )
  }

  getStepIcon(step: number): string {
    switch (step) {
      case 1:
        return this.currentStep > 1 ? '../../../../../../../../assets/icons/completed.svg' : 'assets/icons/laptop-solid.svg';
      case 2:
        return this.currentStep > 2 ? '../../../../assets/icons/completed.svg' : '../../../../assets/icons/Software.svg';
      case 3:
        return this.currentStep > 3 ? '../../../../assets/icons/completed.svg' : '../../../../assets/icons/laptop-solid.svg';
      default:
        return '';
    }
  }

  getStepText(step: number): string {
    switch (step) {
      case 1:
        return 'Laptop';
      case 2:
        return 'Software';
      case 3:
        return 'Accessories';
      default:
        return '';
    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  skipStep() {
    if (this.currentStep < 3) {
      this.currentStep += 1;
    }
  }

  getProgressBarWidth(): string {
    const progress = (this.currentStep - 1) * 50;
    return `${progress}%`;
  }

  getButtonText(): string {
    if (this.currentStep === 3) {
      return 'Save';
    } else {
      return 'Next';
    }
  }

  saveAndDismiss() {
    this.saveData();
    this.dismissModal();
  }

  dismissModal() {
    this.currentStep = 1;
  }

  saveData() {
    const formData = this.revokeAllForm.value;
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      formData.userid = JSON.parse(storedUser).id;
    }
    console.log(formData);
    this.revokeAllService.revokeAll(formData).subscribe(
      (response) => {
       // console.log("user id is: ", this.userId);
       // console.log("response of recent is :", response);

        // Set laptop details
        console.log("the recent response is ",response);
        console.log("laptop details is:", response.laptopResults);
       

        
        if (response && response.laptopResults && response.laptopResults.length > 0) {
          for (let i = 0; i < response.laptopResults.length; i++) {
            const laptop = response.laptopResults[i];
            console.log("First Name:", laptop.firstName);

            // Assuming this.laptopDetails is an array of objects and each object already exists
            if (this.laptopDetails.length > i) {
              // Update existing fields at the corresponding index
              this.laptopDetails[i].submitedBy = `${laptop.firstName} ${laptop.lastName}`;
              this.laptopDetails[i].submitedByDate = laptop.recievedDate;
              this.laptopDetails[i].actionName = laptop.actionName;
            } else {
              console.log("No corresponding laptop in laptopDetails array.");
            }
          }
        } else {
          console.log("No laptop results found.");
        }
      

        // Set accessories details
        console.log("accessories result is :", response.accessoryResults);
        if (response && response.accessoryResults && response.accessoryResults.length > 0) {
          for (let i = 0; i < response.accessoryResults.length; i++) {
            const accessory = response.accessoryResults[i];
            console.log("First Name:", accessory.firstName);

            // Assuming this.laptopDetails is an array of objects and each object already exists
            if (this.accessoriesDetails.length > i) {
              // Update existing fields at the corresponding index
              this.accessoriesDetails[i].submittedBy = `${accessory.firstName} ${accessory.lastName}`;
              this.accessoriesDetails[i].submittedByDate = accessory.recievedDate;
              this.accessoriesDetails[i].actionName = accessory.actionName;
            } else {
              console.log("No corresponding accessory in accessoryDetails array.");
            }
          }
        } else {
          console.log("No accessory results found.");
        }

        if (response && response.softwareResults && response.softwareResults.length > 0) {
          for (let i = 0; i < response.softwareResults.length; i++) {
            const software = response.softwareResults[i];
            console.log("First Name:", software.firstName);

            // Assuming this.laptopDetails is an array of objects and each object already exists
            if (this.softwareDetails.length > i) {
              // Update existing fields at the corresponding index
              this.softwareDetails[i].recievedBy = `${software.firstName} ${software.lastName}`;
              this.softwareDetails[i].recievedByDate = software.recievedDate;
              this.softwareDetails[i].actionName = software.actionName;
            } else {
              console.log("No corresponding software in softwareDetails array.");
            }
          }
        } else {
          console.log("No software results found.");
        }

       
        //console.log('Data saved successfully', response);
        this.revokeAllForm.reset();
      },
      (error) => {
        console.error('Error occurred while saving data', error);
      }
    );
  }
}
