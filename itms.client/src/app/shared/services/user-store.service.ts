import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private firstName$ = new BehaviorSubject<string>("");
  private lastName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleFromStore(role : string) {
    return this.role$.next(role);
  }

  public getFirstNameFromStore() {
    return this.firstName$.asObservable();
  }

  public setFirstNameFromStore(firstName: string) {
    return this.firstName$.next(firstName);
  }

  public getLastNameFromStore() {
    return this.lastName$.asObservable();
  }

  public setLastNameFromStore(lastName: string) {
    return this.lastName$.next(lastName);
  }


  constructor() { }
}
