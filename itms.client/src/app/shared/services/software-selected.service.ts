import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SoftwareSelectedService {

  private selectedCardIndexSubject = new BehaviorSubject<number>(0);
  selectedCardIndex$ = this.selectedCardIndexSubject.asObservable();

  private selectedSoftwareSubject = new BehaviorSubject<any>(null);
  selectedSoftware$ = this.selectedSoftwareSubject.asObservable();

  setSelectedCardIndex(index: number) {
    this.selectedCardIndexSubject.next(index);
  }

  setSelectedSoftware(admin: any) {
    this.selectedSoftwareSubject.next(admin);
  }



}
