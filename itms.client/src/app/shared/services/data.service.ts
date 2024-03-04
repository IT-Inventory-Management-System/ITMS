import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
  locationId:string =''

  // Subject to track button click state
  private buttonClickedSource = new Subject<void>();
  buttonClicked$ = this.buttonClickedSource.asObservable();

  constructor(private http: HttpClient) {
    this.buttonClicked$.subscribe(() => {
      // Call getComments whenever the button is clicked
      if (this.DeviceDetails && this.DeviceDetails.id) {
        this.getAllComments(this.DeviceDetails.id);
      }
    });
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/categories');
  }

  getDevices(locationId:any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'DeviceLog/devices/'+locationId);
  }

  getArchivedDevices(locationId: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/archived-cygids/'+locationId);
  }

  getDevicesInfo(deviceId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/' + deviceId);
  }

  getUserInfo(inputData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'DeviceLog/singleHistoryDevice' , inputData);
  }

  postDeviceModel(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'addDevices/update', formData);
  }

  postDevice(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'addDevices', formData);
  }

  postComment(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'DeviceLog/Comment', formData);
  }

  getDeviceModel(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'addDevices/device-models');
  }

  getOs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/get-ostype');
  }

  getUniqueProcessor(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/get-unique-processors');
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

  getFirstUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'employee/GetFirstUser');
  }

  getLocation(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/get-location');
  }

  getStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/get-status');
  }

  UpdateDeviceStatusToDiscarded(formdata: any): Observable<any> {

    return this.http.post(this.apiUrl + 'Device/updateDeviceStatus', formdata);
  }

  UpdateDeviceStatusToNotAssigned(formdata: any): Observable<any> {

    return this.http.post(this.apiUrl + 'Device/updateDeviceStatustoNotassigned', formdata);
  }

  getDevicesCyg(locationId: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/getDevicess/'+locationId);
  }
  getMouseBrand(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'asset/getMouseBrand');
  }
  postMouseBrand(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'addDevices/AddMouseModel', formData);
  }
  getCGIID(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'asset/getCGIID');
  }
  postMouse(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'addDevices/AddMouse', formData);
  }

  getAdminList(locationId: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'employee/admin-list/'+ locationId);
  }

  postComments(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Comments', formData);
  }

  changeUserRole(userData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'employee/change-role', userData);
  }

  getAllComments(deviceId: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/getAllComments/' + deviceId);
  }

  getLaptopIDs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'asset/getLaptopIDs');
  }

  getDeviceModelData(inputData: any): Observable<any> {
    //console.log(inputData);
    return this.http.post(this.apiUrl + 'Device/DeviceModels', inputData);
  }

  getFilteredDevices(selectedFilters: any): Observable<any> {
   // console.log(inputData);
    return this.http.post(this.apiUrl + 'DeviceLog/filterDevices', selectedFilters);
  }



  getAllAccessories(dto:any): Observable<any | null> {
    return this.http.post<any | null>(this.apiUrl + 'Device/getAllAccessories', dto );
  }

  FilterAccessories(body: any): Observable<any | null> {
    return this.http.post<any | null>(this.apiUrl + 'Device/filterAccessories', body);
  }

  singleHistoryAccessory(dto: any): Observable<any | null> {
    return this.http.post<any | null>(this.apiUrl + 'Device/singleHistoryAccessory', dto);
  }

  getAllAccessoriesComment(deviceId: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Device/getAllComments/' + deviceId);
  }

  private deviceListSubject = new BehaviorSubject<any>(null);
  deviceListChanged$ = this.deviceListSubject.asObservable();

  notifyDeviceListChanged() {
    this.deviceListSubject.next(null);
  }

}

