import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDetailService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7283/api/';

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

  getLogs(employeeId: any, locationName: any): Observable<any | null> {
    const params = {
      employeeId: employeeId,
      locationName: locationName,
    };

    return this.http.post<any | null>(this.apiUrl + 'DeviceLog/employeeLog', params );
  }

  getFilteredLogs(body: any): Observable<any | null> {


    return this.http.post<any | null>(this.apiUrl + 'DeviceLog/filterEmployeeLog', body);
  }
}
