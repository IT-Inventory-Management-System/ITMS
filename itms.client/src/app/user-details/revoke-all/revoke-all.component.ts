import { Component, Input, SimpleChanges } from '@angular/core';
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

  revokeAllForm: FormGroup;
  actionsArray: any[] = [];
  filteredLaptopDetails: any;
  filteredAccessoriesDetails: any;
  filteredSoftwareDetails: any;

  // Filter the details in ngOnChanges lifecycle hook
  ngOnChanges() {
    if (this['laptopDetails'] && Array.isArray(this['laptopDetails']))
      this.filteredLaptopDetails = this['laptopDetails'].filter((laptop: any) => laptop.submitedBy === null);
    if (this['softwareDetails'] && Array.isArray(this['softwareDetails']))
      this.filteredSoftwareDetails = this['softwareDetails'].filter((software: any) => software.recievedBy === null);
    if (this['accessoriesDetails'] && Array.isArray(this['accessoriesDetails'])) 
      this.filteredAccessoriesDetails = this['accessoriesDetails'].filter((accessory: any) => accessory.submittedBy === null);
  }
  constructor(private formBuilder: FormBuilder, private revokeAllService: EmployeeService, private actionService: EmployeeService) {
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
        console.log('Data saved successfully', response);
        this.revokeAllForm.reset();
      },
      (error) => {
        console.error('Error occurred while saving data', error);
      }
    );
  }
}
