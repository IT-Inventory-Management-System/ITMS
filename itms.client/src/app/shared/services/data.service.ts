import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type Guid = string;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7283/api/';

  DeviceDetails: any;
  DeviceLog: any;
  Archiveddevices: any;
  showArchiveOnly: boolean = false;
  CommentDetails: any;

  // Subject to track button click state
  private buttonClickedSource = new Subject<void>();
  buttonClicked$ = this.buttonClickedSource.asObservable();

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/categories');
  }

  getDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'DeviceLog/devices');
  }

  getArchivedDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/archived-cygids');
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

  getOs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/get-ostype');
  }
 
  getSoftwares(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'addDevices/software-models');
  }
  
  getSoftwareTypes(): Observable < any[] > {
    return this.http.get<any[]>(this.apiUrl + 'software/getsoftwareType');
  }

  postNewSoftwareData(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'addDevices/add-software', formData);
  }
  

  getCommentById(deviceLogId: Guid): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'userdevices/' + deviceLogId + '/comments');
  }
  
  // New method to trigger button click
  triggerButtonClick() {
    this.buttonClickedSource.next();
  }

  postSoftwaredata(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'addDevices/add-software-allocation', formData);
  }




}

