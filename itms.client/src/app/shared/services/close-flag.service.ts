import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloseFlagService {
  private closeFlagSubject = new BehaviorSubject<boolean>(false);
  closeFlag$ = this.closeFlagSubject.asObservable();
  setCloseFlag(value: boolean): void {
    this.closeFlagSubject.next(value);
  }

  setCloseFlagToTrue(): void {
    this.setCloseFlag(true);
  }

  setCloseFlagToFalse(): void {
    this.setCloseFlag(false);
  }
  toggleCloseFlag(): void {
    this.closeFlagSubject.next(!this.closeFlagSubject.value);
  }
}
