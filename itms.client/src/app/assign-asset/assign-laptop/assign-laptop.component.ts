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
  commentText: any[] = [];
  cygids: any[]= [];
  formattedAges: string[] = [];
  closeFlagSubscription: any;

  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService) {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe(flag => {
      if (flag) {
        this.devices = [{}];
        this.commentText = [];
        this.cygids.forEach((cygid, index) => {
          if (cygid) 
            this.LaptopSearchBoxOptionSelected(cygid, index);
        });
        this.cygids = [];
      }
    });
  }

  ngOnInit(): void {
    this.devices = this.assignDataManagementService.getMultipleInstanceState('devices') || [];
    if (this.devices.length === 0) {
      this.devices.push({});
    }
    this.SelectedLaptops = this.assignDataManagementService.getMultipleInstanceState('selectedLaptops') || [];
    //this.formattedAges = this.assignDataManagementService.getMultipleInstanceState('formattedAges') || [];
    const laptopIds = this.assignAssetForm.get('cygids') as FormArray;
    if (laptopIds) {
      laptopIds.controls.forEach((control, index) => {
        const selectedLaptopControl = control.get('cygid');
        if (selectedLaptopControl) {
          this.cygids[index] = selectedLaptopControl.value;
          this.LaptopSearchBoxOptionSelected(selectedLaptopControl.value, index);
        }
      });
    } else {
      this.cygids = [];
    }
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
  }

  ngOnDestroy(): void {
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

  LaptopSearchBoxOptionSelected(cygid: any, index: number): void {
    let event:any;
    if (cygid)
      event = this.LaptopOptions.find(option => option.cygid === cygid);
    else
      event = null;
    if (event) {
      this.SelectedLaptops[index] = event;
      this.calculateFormattedAge(index);
      if (!event.assignedTo)
        this.LaptopOptions = this.LaptopOptions.filter(option => option !== event);
    }
    else {
      if (this.SelectedLaptops[index] && !this.LaptopOptions.includes(this.SelectedLaptops[index])) {
        this.LaptopOptions.push(this.SelectedLaptops[index]);
        this.SelectedLaptops[index] = null;
      }
    }
    this.cygidInputChangeFlag();
  }

  calculateFormattedAge(index: number): void {
    if (this.SelectedLaptops[index]?.age !== undefined) {
      console.log(this.formattedAges);
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
    //this.formattedAges.splice(index, 1);
    this.cygidInputChangeFlag();
  }

  /**   Search-box  ***/

  onClearSelection(index: any): void {
    this.cygids[index] = null;
    const cygidsArray = this.assignAssetForm.get('cygids') as FormArray;
    const i = cygidsArray.controls.findIndex(control => control.value.index === index);
    if (i !== -1) 
      cygidsArray.removeAt(i);
    this.LaptopSearchBoxOptionSelected(null, index);
  }
  onSelectOption(option: any,index:any): void {
    this.LaptopSearchBoxOptionSelected(option?.cygid,index);
    if (option && option.assignedTo && 'assignedTo' in option && option.assignedTo) {
      const cygidsArray = this.assignAssetForm.get('cygids') as FormArray;
      const index = cygidsArray.controls.findIndex(control => control.value.index === index);
      if (index !== -1) {
        cygidsArray.removeAt(index);
        this.cygids[index] = null;
      }
    }
    else {
      this.cygids[index] = option;
      const cygidsArray = this.assignAssetForm.get('cygids') as FormArray;
      cygidsArray.push(this.formBuilder.group({
        index: index,
        cygid: option.cygid
      }));
    }
  }

  emitRemoveDevice(index:any): void {
    this.removeDevice(index);
  }

  /**   Comments  ***/
  onInputChangeCommentBox(event: any, index:any): void {
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
