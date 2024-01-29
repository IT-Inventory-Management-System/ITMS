import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https://localhost:7283/api/';

  constructor(private http: HttpClient) { }
  GetAccessories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Dashboard/accessories');
  }


  GetSoftwares(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Dashboard/softwares');
  }

  GetPrimary(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Dashboard/primary');
  }

  GetLogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Dashboard/logs');
  }
}
