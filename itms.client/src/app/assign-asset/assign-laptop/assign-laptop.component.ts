import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(private assignDataManagementService: AssignDataManagementService,
    private closeFlagService: CloseFlagService) {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe(flag => {
      if (flag) {
        this.devices = [{}];
      }
    });
  }

  ngOnInit(): void {
    this.devices = this.assignDataManagementService.getMultipleInstanceState('devices') || [];
    if (this.devices.length === 0) {
      this.devices.push({});
    }
    this.SelectedLaptops = this.assignDataManagementService.getMultipleInstanceState('selectedLaptops') || [];
    this.formattedAges = this.assignDataManagementService.getMultipleInstanceState('formattedAges') || [];
  }

  ngOnDestroy(): void {
    this.assignDataManagementService.setMultipleInstanceState('selectedLaptops', this.SelectedLaptops);
    this.assignDataManagementService.setMultipleInstanceState('formattedAges', this.formattedAges);
    this.assignDataManagementService.setMultipleInstanceState('devices', this.devices);
    this.closeFlagSubscription.unsubscribe();
  }

  cygidInputChangeFlag(): void {
    // Check if SelectedLaptops is not empty
    const laptopsNotEmpty = this.SelectedLaptops.length > 0;

    // Check that all SelectedLaptops are not null and have no assignedTo
    const allSelected = laptopsNotEmpty && this.SelectedLaptops.every(laptop => laptop !== null && !laptop.assignedTo);

    // Emit the appropriate value
    this.cygidInputChange.emit(!allSelected);
  }
  //cygidInputChangeFlag(event: any): void {
  //  console.log(event);
  //  this.cygidInputChange.emit(event);
  //}

  LaptopSearchBoxOptionSelected(event: any, index: number): void {
    //console.log(event);
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
      this.formattedAges[index] = this.SelectedLaptops[index].age.toFixed(1);
    }
  }

  addNewDevice(): void {
    this.devices.push({});
    this.SelectedLaptops.push(null);
    this.formattedAges.push('');
    this.cygidInputChangeFlag();
  }

  removeDevice(index: number): void {
    if (this.SelectedLaptops[index] && !this.LaptopOptions.includes(this.SelectedLaptops[index])) {
      this.LaptopOptions.push(this.SelectedLaptops[index]);
    }
    this.devices.splice(index, 1);
    this.SelectedLaptops.splice(index, 1);
    this.formattedAges.splice(index, 1);
    this.cygidInputChangeFlag();
  }

  //setSaveStateOnDestroy(): void {
  //  this.selectedOption = null;
  //  this.assignDataManagementService.setState("laptopComment", null);
  //}
}
