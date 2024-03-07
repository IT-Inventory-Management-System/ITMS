import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigServiceService } from './config-service.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = this.config.apiUrl;
  constructor(private http: HttpClient, private config: ConfigServiceService) { }

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
