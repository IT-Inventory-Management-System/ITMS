import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7283/api/';

  DeviceDetails: any;
  DeviceLog: any;
  Archiveddevices: any;
  CommentDetails: any;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'devices/categories');
  }

  getDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'DeviceLog/devices');
  }


  getArchivedDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'devices/archived-cygids')
  }

  getDevicesInfo(deviceId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'devices/' + deviceId);
  }

  getUserInfo(deviceId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'DeviceLog/devicesloginfo/' + deviceId);
  }

  getComment(deviceId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'userdevices/comments/' + deviceId);

  }
}




