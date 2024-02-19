import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignDataManagementService {
  constructor() { }

  private assignedToState: any;
  private cygidState: any;
  private cygidsState: any[] = [];
  private softwareNameState: any;
  private softwareVersionState: any;
  private accessoryState: any;
  private laptopCommentState: any;
  private softwareCommentState: any;
  private accessoryCommentState: any;
  private selectedLaptopsState: any[] = [];
  private laptopCommentsState: any[] = [];
  private formattedAgesState: string[] = [];
  private devicesState: any[] = [];
  private softwaresState: any[] = [];
  private selectedSoftwareNamesState: any[] = [];
  private selectedSoftwareVersionsState: any[] = [];
  private softwareNamesState: any[] = [];
  private softwareVersionsState: any[] = [];
  private softwareCommentsState: any[] = [];
  private softwareExpiryDateState: any[] = [];
  private filteredSoftwaresOptions: any[][] = [];
  private selectedSoftwaresData: any[] = [];
  private softwareVersionsOptions: any[][] = [];


  setState(component: string, newState: any, index?: number): void {
    switch (component) {
      case 'assignedTo':
        this.assignedToState = newState;
        break;
      case 'cygid':
        this.cygidState = newState;
        break;
      case 'cygids':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('cygids', index);
          this.cygidsState[index] = newState;
        } else {
          console.error('Index is required for updating cygidState.');
        }
        break;
      case 'laptopComments':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('laptopComments', index);
          this.laptopCommentsState[index] = newState;
        } else {
          console.error('Index is required for updating laptopComments.');
        }
        break;
      case 'softwareName':
        this.softwareNameState = newState;
        break;
      case 'softwareNames':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('softwareNames', index);
          this.selectedSoftwareNamesState[index] = newState;
        } else {
          console.error('Index is required for updating cygidState.');
        }
        break;
      case 'softwareVersion':
        this.softwareVersionState = newState;
        break;
      case 'softwareVersions':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('softwareVersions', index);
          this.selectedSoftwareVersionsState[index] = newState;
        } else {
          console.error('Index is required for updating cygidState.');
        }
        break;
      case 'softwareComments':
        if (index !== undefined && index >= 0) {
          this.ensureArraySize('softwareComments', index);
          this.softwareCommentsState[index] = newState;
        } else {
          console.error('Index is required for updating softwareComments.');
        }
        break;
      case 'accessory':
        this.accessoryState = newState;
        break;
      case 'laptopComment':
        this.laptopCommentState = newState;
        break;
      case 'softwareComment':
        this.softwareCommentState = newState;
        break;
      case 'accessoryComment':
        this.accessoryCommentState = newState;
        break;
      default:
        console.warn('Unknown component:', component);
    }
  }

  getState(component: string, index?: number): any {
    switch (component) {
      case 'assignedTo':
        return this.assignedToState !== undefined ? this.assignedToState : null;
      case 'cygid':
        return this.cygidState !== undefined ? this.cygidState : null;
      case 'cygids':
        if (index !== undefined && index >= 0 && index < this.cygidsState.length) {
          return this.cygidsState[index];
        } else {
          console.error('Invalid index or cygidState is empty.');
          return null;
        }
      case 'laptopComments':
        if (index !== undefined && index >= 0 && index < this.laptopCommentsState.length) {
          return this.laptopCommentsState[index];
        } else {
          console.error('Invalid index or laptopComments is empty.');
          return null;
        }
      case 'softwareName':
        return this.softwareNameState !== undefined ? this.softwareNameState : null;
      case 'softwareNames':
        if (index !== undefined && index >= 0 && index < this.selectedSoftwareNamesState.length) {
          return this.selectedSoftwareNamesState[index];
        } else {
          console.error('Invalid index or softwareNames is empty.');
          return null;
        }
      case 'softwareVersion':
         this.softwareVersionState !== undefined ? this.softwareVersionState : null;
        return this.softwareVersionState;
      case 'softwareVersions':
        if (index !== undefined && index >= 0 && index < this.selectedSoftwareVersionsState.length) {
          return this.selectedSoftwareVersionsState[index];
        } else {
          console.error('Invalid index or softwareVersions is empty.');
          return null;
        }
      case 'softwareComments':
        if (index !== undefined && index >= 0 && index < this.softwareCommentsState.length) {
          return this.softwareCommentsState[index];
        } else {
          console.error('Invalid index or laptopComments is empty.');
          return null;
        }
      case 'accessory':
        return this.accessoryState !== undefined ? this.accessoryState : null;
      case 'laptopComment':
        return this.laptopCommentState !== undefined ? this.laptopCommentState : null;
      case 'softwareComment':
        return this.softwareCommentState !== undefined ? this.softwareCommentState : null;
      case 'accessoryComment':
        return this.accessoryCommentState !== undefined ? this.accessoryCommentState : null;
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
      default:
        console.warn('Unknown component:', component);
        return null;
    }
  }
}
