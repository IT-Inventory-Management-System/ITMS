import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-assign-laptop',
  templateUrl: './assign-laptop.component.html',
  styleUrls: ['./assign-laptop.component.css']
})
export class AssignLaptopComponent {
  @Input() LaptopOptions: any[] = [];
  @Input() assignAssetForm: FormGroup;
  @Output() cygidInputChange = new EventEmitter<boolean>();

  devices: any[] = [{}];
  SelectedLaptops: any[] = [];
  formattedAges: string[] = [];
  closeFlagSubscription: any;
  commentText: any[] = [];
  SelectedLaptopOptions: any[] = [];

  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService) {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe(flag => {
      if (flag) {
        this.devices = [{}];
        this.SelectedLaptopOptions = [];
        this.commentText = [];
        this.SelectedLaptops = [];
      }
    });
  }
  ngOnChanges() {
    console.log(this.SelectedLaptops);
  }

  ngOnInit(): void {
    console.log(this.LaptopOptions);
    this.devices = this.assignDataManagementService.getMultipleInstanceState('devices') || [];
    if (this.devices.length === 0) {
      this.devices.push({});
    }
    this.SelectedLaptops = this.assignDataManagementService.getMultipleInstanceState('selectedLaptops') || [];
    //this.formattedAges = this.assignDataManagementService.getMultipleInstanceState('formattedAges') || [];
    const laptopComments = this.assignAssetForm.get('deviceComments') as FormArray;

    if (laptopComments) {
      laptopComments.controls.forEach((control, index) => {
        const commentControl = control.get('deviceComment');
        if (commentControl)
          this.commentText[index] = commentControl.value;
      });
    } else {
      this.commentText = [];
    }
    this.SelectedLaptopOptions = this.assignDataManagementService.getMultipleInstanceState("SelectedLaptopOptions") || [];
    for (let index = 0; index < this.SelectedLaptopOptions.length; index++) {
      const option = this.SelectedLaptopOptions[index];
      this.LaptopSearchBoxOptionSelected(option, index);
    }
  }

  ngOnDestroy(): void {
    this.assignDataManagementService.setMultipleInstanceState("SelectedLaptopOptions", this.SelectedLaptopOptions);
    this.assignDataManagementService.setMultipleInstanceState('selectedLaptops', this.SelectedLaptops);
    //this.assignDataManagementService.setMultipleInstanceState('formattedAges', this.formattedAges);
    this.assignDataManagementService.setMultipleInstanceState('devices', this.devices);
    this.closeFlagSubscription.unsubscribe();
  }

  cygidInputChangeFlag(): void {
    const laptopsNotEmpty = this.SelectedLaptops.length > 0;
    const allSelected = laptopsNotEmpty && this.SelectedLaptops.every(laptop => laptop !== null && !laptop.assignedTo);
    this.cygidInputChange.emit(!allSelected);
  }

  LaptopSearchBoxOptionSelected(event: any, index: number): void {
    //console.log(event);
    console.log(this.SelectedLaptops);
    if (event) {
      this.SelectedLaptops[index] = event;
      this.calculateFormattedAge(index);
      if (!event.assignedTo)
        this.LaptopOptions = this.LaptopOptions.filter(option => option !== event);
    }
    else {
      console.log(this.SelectedLaptops);

      if (this.SelectedLaptops[index] && !this.LaptopOptions.includes(this.SelectedLaptops[index])) {
        this.LaptopOptions.push(this.SelectedLaptops[index]);
        this.SelectedLaptops[index] = null;
      }
    }
    this.cygidInputChangeFlag();
    console.log(this.SelectedLaptops);
  }

  calculateFormattedAge(index: number): void {
    if (this.SelectedLaptops[index]?.age !== undefined) {
      //console.log(this.formattedAges);
      this.formattedAges[index] = this.SelectedLaptops[index].age.toFixed(1);
    }
  }

  addNewDevice(): void {
    this.devices.push({});
    this.SelectedLaptops.push(null);
    //this.formattedAges.push('');
    this.cygidInputChangeFlag();
  }

  removeDevice(index: number): void {
    if (this.SelectedLaptops[index] && !this.LaptopOptions.includes(this.SelectedLaptops[index])) {
      this.LaptopOptions.push(this.SelectedLaptops[index]);
    }
    this.devices.splice(index, 1);
    this.SelectedLaptops.splice(index, 1);
    this.SelectedLaptopOptions.splice(index, 1);
    this.commentText.splice(index, 1);
    const deviceCommentsArray = this.assignAssetForm.get('deviceComments') as FormArray;
    const i = deviceCommentsArray.controls.findIndex(control => control.value.index === index);
    if (i !== -1) {
      deviceCommentsArray.removeAt(i);
      for (let j = index; j < deviceCommentsArray.length; j++) {
        const deviceCommentsControl = deviceCommentsArray.controls[j] as FormGroup;
        deviceCommentsControl.patchValue({ index: j }); // Update the index in the form array control
      }
    }

    //this.formattedAges.splice(index, 1);
    this.cygidInputChangeFlag();
  }

  /**   Search-box  ***/

  onClearSelection(index: any): void {
    this.SelectedLaptopOptions[index] = null;
    const cygidsArray = this.assignAssetForm.get('cygids') as FormArray;
    const i = cygidsArray.controls.findIndex(control => control.value.index === index);
    if (i !== -1) {
      cygidsArray.removeAt(i);
      this.LaptopSearchBoxOptionSelected(null, index);
    }
  }
  onSelectOption(option: any, index: any): void {
    console.log(this.SelectedLaptops);

    //console.log(option);
    if (option != undefined) {

      this.LaptopSearchBoxOptionSelected(option, index);
      if (option && option.assignedTo && 'assignedTo' in option && option.assignedTo) {
        const cygidsArray = this.assignAssetForm.get('cygids') as FormArray;
        const index = cygidsArray.controls.findIndex(control => control.value.index === index);
        if (index !== -1) {
          cygidsArray.removeAt(index);
          this.SelectedLaptopOptions[index] = null;
        }
      }
      else if (option) {
        this.SelectedLaptopOptions[index] = option;
        const cygidsArray = this.assignAssetForm.get('cygids') as FormArray;
        cygidsArray.push(this.formBuilder.group({
          index: index,
          cygid: option.cygid
        }));
      }
    }
    console.log(this.SelectedLaptops);

  }

  emitRemoveDevice(index: any): void {
    this.removeDevice(index);
  }

  /**   Comments  ***/


  onInputChangeCommentBox(event: any, index: any): void {
    this.commentText[index] = event.target.value;
    const laptopCommentsArray = this.assignAssetForm.get('deviceComments') as FormArray;
    if (laptopCommentsArray) {
      const controlIndex = laptopCommentsArray.controls.findIndex(control => control.get('index')?.value === index);
      if (controlIndex !== -1) {
        laptopCommentsArray.controls[controlIndex].get('deviceComments')?.setValue(event.target.value);
      } else {
        laptopCommentsArray.push(this.formBuilder.group({
          index: index,
          deviceComment: event.target.value
        }));
      }
      console.log(laptopCommentsArray);
    } else {
      console.error('FormArray "deviceComments" is null.');
    }
  }

}
