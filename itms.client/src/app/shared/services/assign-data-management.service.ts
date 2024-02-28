import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignDataManagementService {
  constructor() { }

  private assignedToState: any;
  //private cygidState: any;
  //private softwareNameState: any;
  //private softwareVersionState: any;
  //private laptopCommentState: any;
  //private softwareCommentState: any;
  //private accessoryCommentState: any;

  private accessoryState: any;

  private SelectedAccessoriesNameState: any[] = [];
  private SelectedAccessoriesBrandsState: any[] = [];

  private accessoriesState: any[] = [];
  private accessoryNamesState: any[] = [];
  private accessoryBrandsState: any[]= [];

  private wireState: any[] = [];
  private BrandOptions: any[][] = [];
  private FilteredAccessoryOptions: any[][] = [];
  private SelectedAccessoriesData: any[] = [];
  private SelectedAccessories: any[] = [];

  private accessoryCommentsState: any[] = [];

  /**************************************************************************************** */
  private selectedLaptopsState: any[] = [];

  private devicesState: any[] = [];
  private cygidsState: any[] = [];
  private formattedAgesState: string[] = [];

  private laptopCommentsState: any[] = [];
  /**************************************************************************************** */

  private selectedSoftwareNamesState: any[] = [];
  private selectedSoftwareVersionsState: any[] = [];

  private softwaresState: any[] = [];
  private softwareNamesState: any[] = [];
  private softwareVersionsState: any[] = [];

  private selectedSoftwaresData: any[] = [];
  private softwareVersionsOptions: any[][] = [];
  private filteredSoftwaresOptions: any[][] = [];
  private softwareExpiryDateState: any[] = [];

  private softwareCommentsState: any[] = [];

  setState(component: string, newState: any, index?: number): void {
    switch (component) {
      case 'assignedTo':
        this.assignedToState = newState;
        break;
      case 'cygids':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('cygids', index);
          this.cygidsState[index] = newState;
        }
        break;
      case 'laptopComments':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('laptopComments', index);
          this.laptopCommentsState[index] = newState;
        }
        break;
      case 'softwareNames':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('softwareNames', index);
          this.selectedSoftwareNamesState[index] = newState;
        }
        break;
      case 'softwareVersions':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('softwareVersions', index);
          this.selectedSoftwareVersionsState[index] = newState;
        }
        break;
      case 'softwareComments':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('softwareComments', index);
          this.softwareCommentsState[index] = newState;
        }
        break;
      case 'accessoriesName':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('accessoriesName', index);
          this.SelectedAccessoriesNameState[index] = newState;
        }
        break;
      case 'accessoriesBrand':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('accessoriesBrand', index);
          this.SelectedAccessoriesBrandsState[index] = newState;
        }
        break;
      case 'accessoryComments':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('accessoryComments', index);
          this.accessoryCommentsState[index] = newState;
        }
        break;
      case 'accessory':
        this.accessoryState = newState;
        break;
      //case 'accessoryComment':
      //  this.accessoryCommentState = newState;
      //  break;
      //case 'laptopComment':
      //  this.laptopCommentState = newState;
      //  break;
      //case 'softwareComment':
      //  this.softwareCommentState = newState;
      //  break;
      //case 'cygid':
      //  this.cygidState = newState;
      //  break;
      //case 'softwareVersion':
      //  this.softwareVersionState = newState;
      //  break;
      //case 'softwareName':
      //  this.softwareNameState = newState;
      //  break;
      default:
        console.warn('Unknown component:', component);
    }
  }

  getState(component: string, index?: number): any {
    switch (component) {
      case 'assignedTo':
        return this.assignedToState !== undefined ? this.assignedToState : null;
      case 'cygids':
        if (index !== undefined && index >= 0 && index < this.cygidsState.length) {
          return this.cygidsState[index];
        }
        return null;
      case 'laptopComments':
        if (index !== undefined && index >= 0 && index < this.laptopCommentsState.length) {
          return this.laptopCommentsState[index];
        }
        return null;
      case 'softwareNames':
        if (index !== undefined && index >= 0 && index < this.selectedSoftwareNamesState.length) {
          return this.selectedSoftwareNamesState[index];
        }
        return null;
      case 'softwareVersions':
        if (index !== undefined && index >= 0 && index < this.selectedSoftwareVersionsState.length) {
          return this.selectedSoftwareVersionsState[index];
        }
        return null;
      case 'softwareComments':
        if (index !== undefined && index >= 0 && index < this.softwareCommentsState.length) {
          return this.softwareCommentsState[index];
        }
        return null;
      case 'accessoriesName':
        if (index !== undefined && index >= 0 && index < this.SelectedAccessoriesNameState.length) {
          return this.SelectedAccessoriesNameState[index];
        }
        return null;
      case 'accessoriesBrand':
        if (index !== undefined && index >= 0 && index < this.SelectedAccessoriesBrandsState.length) {
          return this.SelectedAccessoriesBrandsState[index];
        }
        return null;
      case 'accessoryComments':
        if (index !== undefined && index >= 0 && index < this.accessoryCommentsState.length) {
          return this.accessoryCommentsState[index];
        }
        return null;
      case 'accessory':
        return this.accessoryState !== undefined ? this.accessoryState : null;
      //case 'accessoryComment':
      //  return this.accessoryCommentState !== undefined ? this.accessoryCommentState : null;
      //case 'softwareName':
      //  return this.softwareNameState !== undefined ? this.softwareNameState : null;
      //case 'softwareVersion':
      //   this.softwareVersionState !== undefined ? this.softwareVersionState : null;
      //  return this.softwareVersionState;
      //case 'laptopComment':
      //  return this.laptopCommentState !== undefined ? this.laptopCommentState : null;
      //case 'softwareComment':
      //  return this.softwareCommentState !== undefined ? this.softwareCommentState : null;
      //case 'cygid':
      //  return this.cygidState !== undefined ? this.cygidState : null;
      default:
        console.warn('Unknown component:', component);
    }
  }
  private ensureArraySize(component: string, index: number): void {
    switch (component) {
      case 'cygids':
        while (this.cygidsState.length <= index) {
          this.cygidsState.push(null);
        }
        break;
      case 'laptopComments':
        while (this.laptopCommentsState.length <= index) {
          this.laptopCommentsState.push(null);
        }
        break;
      case 'softwareNames':
        while (this.selectedSoftwareNamesState.length <= index) {
          this.selectedSoftwareNamesState.push(null);
        }
        break;
      case 'softwareVersions':
        while (this.selectedSoftwareVersionsState.length <= index) {
          this.selectedSoftwareVersionsState.push(null);
        }
        break;
      case 'softwareComments':
        while (this.softwareCommentsState.length <= index) {
          this.softwareCommentsState.push(null);
        }
        break;
      case 'accessoriesName':
        while (this.SelectedAccessoriesNameState.length <= index) {
          this.SelectedAccessoriesNameState.push(null);
        }
        break;
      case 'accessoriesBrand':
        while (this.SelectedAccessoriesBrandsState.length <= index) {
          this.SelectedAccessoriesBrandsState.push(null);
        }
        break;
      case 'accessoryComments':
        while (this.accessoryCommentsState.length <= index) {
          this.accessoryCommentsState.push(null);
        }
        break;
      default:
        console.error('Invalid component:', component);
    }
  }

   setMultipleInstanceState(component: string, newState: any): void {
    switch (component) {
      case 'selectedLaptops':
        this.selectedLaptopsState = newState;
        break;
      case 'formattedAges':
        this.formattedAgesState = newState;
        break;
      case 'devices':
        this.devicesState = newState;
        break;
      case 'softwares':
        this.softwaresState = newState;
        break;
      case 'softwareNames':
        this.softwareNamesState = newState;
        break;
      case 'softwareVersions':
        this.softwareVersionsState = newState;
        break;
      case 'softwareExpiryDate':
        this.softwareExpiryDateState = newState;
        break;
      case 'FilteredSoftwaresOptions':
        this.filteredSoftwaresOptions = newState;
        break;
      case 'SelectedSoftwaresData':
        this.selectedSoftwaresData = newState;
        break;
      case 'SoftwareVersionsOptions':
        this.softwareVersionsOptions = newState;
        break;
      case 'accessoriesState':
        this.accessoriesState = newState;
        break;
      case 'accessoryNamesState':
        this.accessoryNamesState = newState;
        break;
      case 'accessoryBrandsState':
        this.accessoryBrandsState = newState;
        break;
      case 'wireState':
        this.wireState = newState;
        break;
      case 'BrandOptions':
        this.BrandOptions = newState;
        break;
      case 'FilteredAccessoryOptions':
        this.FilteredAccessoryOptions = newState;
        break;
      case 'SelectedAccessoriesData':
        this.SelectedAccessoriesData = newState;
        break;
      case 'SelectedAccessories':
        this.SelectedAccessories = newState;
        break;
      default:
        console.warn('Unknown component:', component);
    }
  }

  getMultipleInstanceState(component: string): any {
    switch (component) {
      case 'selectedLaptops':
        return this.selectedLaptopsState;  
      case 'formattedAges':
        return this.formattedAgesState;
      case 'devices':
        return this.devicesState;
      case 'softwares':
        return this.softwaresState;
      case 'softwareNames':
        return this.softwareNamesState;
      case 'softwareVersions':
        return this.softwareVersionsState;
      case 'softwareExpiryDate':
        return this.softwareExpiryDateState;
      case 'FilteredSoftwaresOptions':
        return this.filteredSoftwaresOptions;
      case 'SelectedSoftwaresData':
        return this.selectedSoftwaresData;
      case 'SoftwareVersionsOptions':
        return this.softwareVersionsOptions;
      case 'accessoriesState':
        return this.accessoriesState;
      case 'accessoryNamesState':
        return this.accessoryNamesState;
      case 'accessoryBrandsState':
        return this.accessoryBrandsState;
      case 'wireState':
        return this.wireState;
      case 'BrandOptions':
        return this.BrandOptions;
      case 'FilteredAccessoryOptions':
        return this.FilteredAccessoryOptions;
      case 'SelectedAccessoriesData':
        return this.SelectedAccessoriesData;
      case 'SelectedAccessories':
        return this.SelectedAccessories;
      default:
        console.warn('Unknown component:', component);
        return null;
    }
  }
  resetSpecificStateVariables(): void {
    this.cygidsState = [];
    this.selectedSoftwareNamesState = [];
    this.selectedSoftwareVersionsState = [];
    this.SelectedAccessoriesNameState = [];
    this.SelectedAccessoriesBrandsState = [];
    this.softwareCommentsState = [];
    this.laptopCommentsState = [];
    this.accessoryCommentsState = [];
  }
}
