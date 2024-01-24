import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignDataManagementService {

  constructor() { }

  private assignedToState: any;
  private cygidState: any;
  private softwareIdState: any;
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
      case 'softwareId':
        this.softwareIdState = newState;
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

  getState(component: string): void {
    switch (component) {
      case 'assignedTo':
        return this.assignedToState !== undefined ? this.assignedToState : null;
      case 'cygid':
        return this.cygidState !== undefined ? this.cygidState : null;
      case 'softwareId':
        return this.softwareIdState !== undefined ? this.softwareIdState : null;
      case 'softwareVersion':
        return this.softwareVersionState !== undefined ? this.softwareVersionState : null;
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

