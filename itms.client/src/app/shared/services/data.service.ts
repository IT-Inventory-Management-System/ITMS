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
  Archiveddevices :any;
  showArchiveOnly: boolean = false;
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

  postDeviceModel(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'addDevices/update', formData);
  }

  postDevice(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'addDevices', formData);
  }

  getDeviceModel(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'addDevices/device-models');
  }

 
  getSoftwares(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'addDevices/software-models');
  }
  postSoftwaredata(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'addDevices/add-software-allocation', formData);
  }


}

