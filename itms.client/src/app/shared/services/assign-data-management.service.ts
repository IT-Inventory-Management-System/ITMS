import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignDataManagementService {
  constructor() { }

  private assignedToState: any;
  private cygidState: any;
  private softwareNameState: any;
  private softwareVersionState: any;
  private accessoryState: any;
  private laptopCommentState: any;
  private softwareCommentState: any;
  private accessoryCommentState: any;

  setState(component: string, newState: any): void {
    switch (component) {
      case 'assignedTo':
        this.assignedToState = newState;
        break;
      case 'cygid':
        this.cygidState = newState;
        break;
      case 'softwareName':
        this.softwareNameState = newState;
        break;
      case 'softwareVersion':
        this.softwareVersionState = newState;
        console.log(this.softwareVersionState);
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

  getState(component: string): void {
    switch (component) {
      case 'assignedTo':
        return this.assignedToState !== undefined ? this.assignedToState : null;
      case 'cygid':
        return this.cygidState !== undefined ? this.cygidState : null;
      case 'softwareName':
        return this.softwareNameState !== undefined ? this.softwareNameState : null;
      case 'softwareVersion':
        this.softwareVersionState !== undefined ? this.softwareVersionState : null;
        console.log(this.softwareVersionState);
        return;
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
}
