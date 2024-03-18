import { Component, Input, SimpleChanges, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../shared/services/Employee.service';
import { ToastrService } from 'ngx-toastr';

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
  @Output() changeOnHoldBanner: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changeArchiveBanner: EventEmitter<boolean> = new EventEmitter<boolean>();

  variable1: boolean = true;
  variable2: boolean = false;
  variable3: boolean = true;
  isButtonDisabled: boolean = false;

  revokeAllForm: FormGroup;
  actionsArray: any[] = [];
  filteredLaptopDetails: any;
  filteredAccessoriesDetails: any;
  filteredSoftwareDetails: any;

  onVariable1Change(value: boolean) {
    this.variable1 = value;
    this.updateButtonDisabledState();
  }

  onVariable2Change(value: boolean) {
    this.variable2 = value;
    this.updateButtonDisabledState();
  }

  onVariable3Change(value: boolean) {
    this.variable3 = value;
    this.updateButtonDisabledState();
  }
  updateButtonDisabledState(): void {

    this.isButtonDisabled = (this.currentStep === 1 && this.variable1) ||
      (this.currentStep === 2 && this.variable2) ||
      (this.currentStep === 3 && this.variable3);
    this.cdr.detectChanges();


  }

  // Filter the details in ngOnChanges lifecycle hook
  ngOnChanges() {
    if (this['laptopDetails'] && Array.isArray(this['laptopDetails']))
      this.filteredLaptopDetails = this['laptopDetails'].filter((laptop: any) => laptop.submitedBy === null || (laptop.actionName === 'Assigned' || laptop.actionName === 'assigned'));
    if (this['softwareDetails'] && Array.isArray(this['softwareDetails']))
      this.filteredSoftwareDetails = this['softwareDetails'].filter((software: any) => software.recievedBy === null);
    if (this['accessoriesDetails'] && Array.isArray(this['accessoriesDetails']))
      this.filteredAccessoriesDetails = this['accessoriesDetails'].filter((accessory: any) => accessory.submittedBy === null || (accessory.actionName === 'Assigned' || accessory.actionName === 'assigned') );
  }
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private revokeAllService: EmployeeService, private actionService: EmployeeService, private employeeService: EmployeeService, private cdr: ChangeDetectorRef) {
    this.revokeAllForm = this.formBuilder.group({
      createdBy: [null, Validators.required],
      archiveUserId: [null, Validators.required],
      Laptop: this.formBuilder.array([]),
      Software: this.formBuilder.array([]),
      Accessory: this.formBuilder.array([]),
    });
    this.actionService.getActions().subscribe(
      (actions) => {
        this.actionsArray = actions;
        //console.log(this.actionsArray);
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
    this.updateButtonDisabledState();
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
    this.updateButtonDisabledState();
  }

  skipStep() {
    if (this.currentStep < 3) {
      this.currentStep += 1;
    }
    this.updateButtonDisabledState();
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

    for (let i = 0; i < this.laptopDetails.length; i++) {
      this.laptopDetails[i].received = null;
      this.laptopDetails[i].perfect = null;
      this.laptopDetails[i].unassignable = null;
      this.laptopDetails[i].submittedLater = null;
      this.laptopDetails[i].lostNotReceived = null;
      this.laptopDetails[i].comment = '';
    }

    for (let i = 0; i < this.accessoriesDetails.length; i++) {
      this.accessoriesDetails[i].received = null;
      this.accessoriesDetails[i].perfect = null;
      this.accessoriesDetails[i].unassignable = null;
      this.accessoriesDetails[i].submittedLater = null;
      this.accessoriesDetails[i].lostNotReceived = null;
      this.accessoriesDetails[i].comment = '';
    }

    this.revokeAllForm.reset();
    this.updateButtonDisabledState();
  }

  saveData() {
    const formData = this.revokeAllForm.value;
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null)
      formData.createdBy = JSON.parse(storedUser).id;
    if (this.userId)
      formData.archiveUserId = this.userId;
   // console.log(formData);

    this.revokeAllService.revokeAll(formData).subscribe(
      (response) => {
        // console.log("user id is: ", this.userId);
        // console.log("response of recent is :", response);

        // Set laptop details

       // console.log("the recent response is ", response);
       // console.log("laptop details is:", response.laptopResults);

        const SubmitLaterActionId = this.actionsArray.find(a => a.actionName === 'Assigned' || a.actionName === 'assigned').id;

        let isSubmitLater = false; // Initialize the variable to false

        // Loop through laptop results
        if (formData.Laptop && formData.Laptop.length > 0) {
          for (const laptop of formData.Laptop) {
            if (laptop.actionId === SubmitLaterActionId) {
              isSubmitLater = true; // Set to true if any instance has the SubmitLaterActionId
              break; // Exit loop if found
            }
          }
        }

        // Loop through accessory results
        if (formData.Accessory && formData.Accessory.length > 0) {
          for (const accessory of formData.Accessory) {
            if (accessory.actionId === SubmitLaterActionId) {
              isSubmitLater = true; // Set to true if any instance has the SubmitLaterActionId
              break; // Exit loop if found
            }
          }
        }

        if (isSubmitLater == true)
          this.changeOnHoldBanner.emit(true);
        else {
          this.changeOnHoldBanner.emit(false);
          this.changeArchiveBanner.emit(true);
        }

        if (response && response.laptopResults && response.laptopResults.length > 0) {
          for (const laptop of response.laptopResults) {
         //   console.log("First Name:", laptop.firstName);


            const correspondingLaptop = this.laptopDetails.find((l: any) => l.deviceId === laptop.deviceId);
            if (correspondingLaptop) {

              correspondingLaptop.submitedBy = `${laptop.firstName} ${laptop.lastName}`;
              correspondingLaptop.submitedByDate = laptop.recievedDate;
              correspondingLaptop.actionName = laptop.actionName;
            } else {
            //  console.log("No corresponding laptop in laptopDetails array.");
            }
          }
        } else {
          //console.log("No laptop results found.");
        }


        // Set accessories details
       // console.log("accessories result is :", response.accessoryResults);
        if (response && response.accessoryResults && response.accessoryResults.length > 0) {
          for (const accessory of response.accessoryResults) {
           // console.log("First Name:", accessory.firstName);


            const correspondingAccessory = this.accessoriesDetails.find((a: any) => a.deviceId === accessory.deviceId);
            if (correspondingAccessory) {

              correspondingAccessory.submittedBy = `${accessory.firstName} ${accessory.lastName}`;
              correspondingAccessory.submittedByDate = accessory.recievedDate;
              correspondingAccessory.actionName = accessory.actionName;
            } else {
            //  console.log("No corresponding accessory in accessoriesDetails array.");
            }
          }
        } else {
        //  console.log("No accessory results found.");
        }

       // console.log("software result is :", response.softwareResults);
        if (response && response.softwareResults && response.softwareResults.length > 0) {
          for (const software of response.softwareResults) {
           // console.log("First Name:", software.firstName);


            const correspondingSoftware = this.softwareDetails.find((s: any) => s.softwareAllocationId === software.softwareAllocationId);
            if (correspondingSoftware) {

              correspondingSoftware.recievedBy = `${software.firstName} ${software.lastName}`;
              correspondingSoftware.recievedByDate = software.recievedDate;
              correspondingSoftware.actionName = software.actionName;
            } else {
             // console.log("No corresponding software in softwareDetails array.");
            }
          }
        } else {
         // console.log("No software results found.");
        }


        //console.log('Data saved successfully', response);
        //this.revokeAllForm.reset();
        this.toastr.success('Exit Process Successful');
      },
      (error) => {
        console.error('Error occurred while saving data', error);
        this.toastr.error('Error in Exit Process:', error);
      }
    );
  }
}
