import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7283/api/';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'devices/categories');
  }
  getDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'DeviceLog/devices');
  }

}
