import { Component, Input, Output, EventEmitter, ElementRef, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { AssignDataManagementService } from '../../shared/services/assign-data-management.service';
import { Subscription } from 'rxjs';
import { CloseFlagService } from '../../shared/services/close-flag.service';

@Component({
  selector: 'app-software-search-box',
  templateUrl: './software-search-box.component.html',
  styleUrls: ['./software-search-box.component.css']
})
export class SoftwareSearchBoxComponent implements OnChanges {

  @Input() softwares : any[] =[{}];

  @Input() label: string;
  @Input() placeholder: string;
  @Input() SoftwareOptions: any[] = [];
  @Input() index: number;
  @Input() selectedOptionDisable: boolean;
  @Output() SoftwareVersionOptionSelected: EventEmitter<any> = new EventEmitter();
  @Output() AddAnother: EventEmitter<any> = new EventEmitter();
  @Output() removeSoftware: EventEmitter<any> = new EventEmitter();
  uniqueSoftwareNames: any[] = [];
  selectedSoftwareType: any = null;
  selectedOption: any;
  selectedOptionVersion: any = null;
  private closeFlagSubscription: Subscription;
  prev: string = '';
  softwareWarning: boolean = false;
  currSelectedSoftware: string = ''; 

  FilteredSoftwaresOptions: any[] = [];
  softwareVersionsOptions: any[] = [];

  constructor(private assignDataManagementService: AssignDataManagementService,
    private closeFlagService: CloseFlagService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedOptionVersion']) {
      //alert("changed");
    }
  }

  ngOnInit(): void {
    this.closeFlagService.setCloseFlagToFalse();
    this.selectedOption = this.assignDataManagementService.getState("softwareNames", this.index);
    this.selectedOptionVersion = this.assignDataManagementService.getState("softwareVersions", this.index);
    this.selectedSoftwareType = this.assignDataManagementService.getState("selectedSoftwareType", this.index);
   // this.SoftwareOptionSelected.emit(this.selectedOption);
    this.UniqueOptions();
  }

  ngOnDestroy(): void {
    //this.closeFlagSubscription = this.closeFlagService.closeFlag$.subscribe((closeFlag) => {
    //  if (!closeFlag) {
    //    this.assignDataManagementService.setState("softwareNames", this.selectedOption, this.index);
    //    this.assignDataManagementService.setState("softwareVersions", this.selectedOptionVersion, this.index);
        
    //    this.assignDataManagementService.setState("selectedSoftwareType", this.selectedSoftwareType, this.index);
    //  }
    //});
    this.assignDataManagementService.setState("softwareNames", this.selectedOption, this.index);
    this.assignDataManagementService.setState("softwareVersions", this.selectedOptionVersion, this.index);

    this.assignDataManagementService.setState("selectedSoftwareType", this.selectedSoftwareType, this.index);
    //this.closeFlagSubscription.unsubscribe();
    
  }

  onClearSelection(): void {
    this.selectedOption = null;
  }

  UniqueOptions(): void {
    const uniqueNamesSet = new Set<string>(this.SoftwareOptions.map(option => option.softwareName));
    this.uniqueSoftwareNames = Array.from(uniqueNamesSet);
   // console.log("this.uniqueSoftwareNames", this.uniqueSoftwareNames);
  }

  onSelectOption(option: any): void {
  //  console.log(option);
    //this.SoftwareOptionSelected.emit(option);
    this.currSelectedSoftware = option;
    this.filterSoftwareVersions(option);
  }

  filterSoftwareVersions(option: string): void {
    if (option) {
      this.FilteredSoftwaresOptions = this.SoftwareOptions.filter(opt => opt.softwareName === option);
    //  console.log("this.FilteredSoftwaresOptions[index]", this.FilteredSoftwaresOptions);
      //this.SelectedSoftwaresData[index] = this.FilteredSoftwaresOptions;
      const uniqueVersions: string[] = [];
      this.FilteredSoftwaresOptions.forEach(option => {
        if (!uniqueVersions.includes(option.version)) {
          uniqueVersions.push(option.version);
        }
      });
      this.softwareVersionsOptions = uniqueVersions;
    //  console.log(this.softwareVersionsOptions);
    }
    else {
      this.softwareVersionsOptions;
    }
  }



  emitRemoveSoftware(): void {

    if (this.selectedOptionVersion != null) {
      const index = this.SoftwareOptions.findIndex(item =>
        item.softwareName === this.currSelectedSoftware && item.version === this.selectedOptionVersion
      );
      this.SoftwareOptions[index].count += 1;

      if (this.SoftwareOptions[index].count > -1) {
        this.softwareWarning = false;
      }
    }

    this.selectedOption = null;
    this.selectedOptionVersion = null;
    this.selectedSoftwareType = null;
    this.prev = '';
    //console.log("from remove",this.SoftwareOptions);
    this.removeSoftware.emit({ idx :this.index, SoftwareOptions: this.SoftwareOptions });
  }


  onSelectOptionVersion(option: any): void {
    if (option === undefined) {

      if (this.prev !== '') {
        const index = this.SoftwareOptions.findIndex(item =>
          item.softwareName === this.currSelectedSoftware && item.version === this.prev
        );
        this.SoftwareOptions[index].count += 1;

        if (this.SoftwareOptions[index].count > -1) {
          this.softwareWarning = false;
        }
      }

      this.prev = '';
    } else {
      if (this.prev !== '') {
        const index = this.SoftwareOptions.findIndex(item =>
          item.softwareName === this.currSelectedSoftware && item.version === this.prev
        );
        this.SoftwareOptions[index].count += 1;

        if (this.SoftwareOptions[index].count > -1) {
          this.softwareWarning = false;
        }
      }
      const index = this.SoftwareOptions.findIndex(item =>
        item.softwareName === this.currSelectedSoftware && item.version === option
      );

      this.prev = option;
      if (this.SoftwareOptions[index].count <= 0) {
        this.softwareWarning = true;
      }

      if (index !== -1) {
        this.SoftwareOptions[index].count -= 1;
      }

      const softwareId = this.FilteredSoftwaresOptions.filter(
        (options: any) => options.version === option
      );
      this.selectedSoftwareType = softwareId;
      //console.log("from selectVersionChange", this.SoftwareOptions);
      this.SoftwareVersionOptionSelected.emit({ softwareId, option, SoftwareOptions: this.SoftwareOptions, countZero: this.SoftwareOptions[index].count === -1, softwareWarning: this.softwareWarning });
    }

    
   // console.log(this.currSelectedSoftware, option);
   // console.log(this.SoftwareOptions);

  }
  onClearSelectionVersion(): void {
    this.selectedOptionVersion = null;
    this.selectedSoftwareType = null;

    if (this.prev !== '') {
      const index = this.SoftwareOptions.findIndex(item =>
        item.softwareName === this.currSelectedSoftware && item.version === this.prev
      );
      this.SoftwareOptions[index].count += 1;
    }

    //const softwareIdsArray = this.assignAssetForm.get('softwareIds') as FormArray;
    //const index = softwareIdsArray.controls.findIndex(control => control.value.index === this.index);
    //if (index !== -1) {
    //  softwareIdsArray.removeAt(index);
    //  this.selectedOption = null;
    //}
    const softwareId = this.FilteredSoftwaresOptions.filter(
      (option: any) => option.id === this.selectedOption
    );
    this.softwareWarning = false;
    //console.log("from clear",this.SoftwareOptions);
    const data = { softwareId, option: null, SoftwareOptions: this.SoftwareOptions, countZero: false, softwareWarning: this.softwareWarning };
    this.SoftwareVersionOptionSelected.emit(data);
  }


  addNewSoftware(): void {
    this.AddAnother.emit();
  }
}
