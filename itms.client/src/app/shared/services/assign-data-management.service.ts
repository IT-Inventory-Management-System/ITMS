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
          this.ensureArraySize(index);
          this.cygidsState[index] = newState;
        } else {
          console.error('Index is required for updating cygidState.');
        }
        break;
      case 'softwareName':
        this.softwareNameState = newState;
        break;
      case 'softwareVersion':
        this.softwareVersionState = newState;
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
      case 'softwareName':
        return this.softwareNameState !== undefined ? this.softwareNameState : null;
      case 'softwareVersion':
         this.softwareVersionState !== undefined ? this.softwareVersionState : null;
        return this.softwareVersionState;
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
  private ensureArraySize(index: number): void {
    while (this.cygidsState.length <= index) {
      this.cygidsState.push(null); 
    }
  }
}
