import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-software-version-search-box',
  templateUrl: './software-version-search-box.component.html',
  styleUrls: ['./software-version-search-box.component.css']
})
export class SoftwareVersionSearchBoxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() SoftwareVersionOptions: string[] = [];
  @Input() assignAssetForm: FormGroup;
  @Input() index: number;
  @Output() SoftwareVersionOptionSelected: EventEmitter<any> = new EventEmitter();
  @Input() SoftwareOptions: any[] = [];
  @Input() currSelectedSoftware: string;

  prev: string = '';
  softwareWarning: boolean = false;

  selectedOption: any;
  private closeFlagSubscription: Subscription;
  ngOnInit(): void {
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("softwareVersions", this.index);
    if (this.selectedOption)
      this.SoftwareVersionOptionSelected.emit({ option: this.selectedOption, SoftwareOptions: this.SoftwareOptions, countZero: false });
  }
  ngOnDestroy(): void {
    this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
      if (!closeFlag) {
      }
    });
    this.assignDataManagementService.setState("softwareVersions", this.selectedOption, this.index);

    this.closeFlagSubscription.unsubscribe();
  }  
  constructor(private assignDataManagementService: AssignDataManagementService,
    private formBuilder: FormBuilder,
    private closeFlagService: CloseFlagService
) { }

 // onSelectOption(option: any): void {
 ////   alert(option);
 //   if (option === undefined) {
      
 //     if (this.prev !== '') {
 //       const index = this.SoftwareOptions.findIndex(item =>
 //         item.softwareName === this.currSelectedSoftware && item.version === this.prev
 //       );
 //       this.SoftwareOptions[index].count += 1;

 //       if (this.SoftwareOptions[index].count > -1) {
 //         this.softwareWarning = false;
 //       }
 //     }

 //     this.prev = '';
 //   } else {
 //     if (this.prev !== '') {
 //       const index = this.SoftwareOptions.findIndex(item =>
 //         item.softwareName === this.currSelectedSoftware && item.version === this.prev
 //       );
 //       this.SoftwareOptions[index].count += 1;

 //       if (this.SoftwareOptions[index].count > -1) {
 //         this.softwareWarning = false;
 //       }
 //     }
 //     const index = this.SoftwareOptions.findIndex(item =>
 //       item.softwareName === this.currSelectedSoftware && item.version === option
 //     );

 //     this.prev = option;
 //     if (this.SoftwareOptions[index].count <= 0) {
 //       this.softwareWarning = true; 
 //     }
      
 //     if (index !== -1) {
 //       this.SoftwareOptions[index].count -= 1;
 //     }
 //     this.SoftwareVersionOptionSelected.emit({ option, SoftwareOptions: this.SoftwareOptions, countZero: this.SoftwareOptions[index].count === -1 });
 //   }
    
 //   console.log(this.currSelectedSoftware, option);
 //   console.log(this.SoftwareOptions);

 // }
 // onClearSelection(): void {
 //   this.selectedOption = null;

 //   //if (this.prev !== '') {
 //   //  const index = this.SoftwareOptions.findIndex(item =>
 //   //    item.softwareName === this.currSelectedSoftware && item.version === this.prev
 //   //  );
 //   //  this.SoftwareOptions[index].count += 1;
 //   //}

 //   const softwareIdsArray = this.assignAssetForm.get('softwareIds') as FormArray;
 //   const index = softwareIdsArray.controls.findIndex(control => control.value.index === this.index);
 //   if (index !== -1) {
 //     softwareIdsArray.removeAt(index);
 //     this.selectedOption = null;
 //   }
 //   const data = { option: null, SoftwareOptions: this.SoftwareOptions, countZero: false};
 //   this.SoftwareVersionOptionSelected.emit(data);
 // }


}
