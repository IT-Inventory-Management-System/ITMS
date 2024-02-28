import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDetailService {

  private selectedCardIndexSubject = new BehaviorSubject<number>(0);
  selectedCardIndex$ = this.selectedCardIndexSubject.asObservable();

  private selectedAdminSubject = new BehaviorSubject<any>(null);
  selectedAdmin$ = this.selectedAdminSubject.asObservable();

  private adminListSubject = new BehaviorSubject<any>(null);
  adminListChanged$ = this.adminListSubject.asObservable();

  notifyAdminListChanged() {
    this.adminListSubject.next(null);
  }


  setSelectedCardIndex(index: number) {
    this.selectedCardIndexSubject.next(index);
  }

  setSelectedAdmin(admin: any) {
    this.selectedAdminSubject.next(admin);
  }
}
