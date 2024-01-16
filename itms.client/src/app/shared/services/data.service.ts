import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
type Guid = string;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7283/api/';

  DeviceDetails: any;
  DeviceLog: any;
  Archiveddevices :any;
  showArchiveOnly: boolean = false;
  CommentDetails: any;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/categories');
  }

  getDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'DeviceLog/devices');
  }


  getArchivedDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl +'Device/archived-cygids')
  }



  getDevicesInfo(deviceId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/' + deviceId);
  }

  getUserInfo(deviceId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'DeviceLog/devicesloginfo/' + deviceId);
  }
 

  getCommentById(deviceLogId: Guid): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiUrl + 'userdevices/' + deviceLogId + '/comments');
  }
  
  
}

