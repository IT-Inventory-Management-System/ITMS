import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:44384/api/'; 
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'categories/categories');
  }
  getDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'DeviceLog/devices');
  }

}
