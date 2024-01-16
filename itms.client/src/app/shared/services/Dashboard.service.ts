import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https://localhost:44384/api/';

  constructor(private http: HttpClient) { }
  GetAccessories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Dashboard/GetAccessories/');
  }


  GetSoftwares(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Dashboard/softwares/');
  }
}
