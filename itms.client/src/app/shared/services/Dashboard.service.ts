import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https://www.itmsbackend.somee.com/api/';

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

  GetLogs(body:any): Observable<any | null> {
    return this.http.post<any|null>(this.apiUrl + 'Dashboard/logs',body);
  }
}
