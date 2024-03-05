import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  laptopDetails: any;
  softwareDetails: any;
  accessoriesDetails: any;
  private apiUrl = 'https://itimsbackend.somee.com/api/';

  constructor(private http: HttpClient) { }
  //getDevices(id: any): Observable<any[]> {
  //  return this.http.get<any[]>(this.apiUrl + 'userdevices/GetDevices/'+id);
  //}

  getDevices(id: any): Observable<any[]> {
    console.log(id);
    return this.http.get<any[]>(this.apiUrl + 'userdevices/GetDevices/' + id);
  }

  //getSoftware(id: any): Observable<any[]> {
  //  return this.http.get<any[]>(this.apiUrl + 'software/GetUserSoftware/'+id);
  //}

  //getAccessories(id: any): Observable<any[]> {
  //  return this.http.get<any[]>(this.apiUrl + 'Accessories/GetUserAccessories/' + id);
  //}

  getActions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'ActionTable/getActions');
  }

  updateRecievedBy(deviceLogId: any, receivedByUserId: any, ActionId: any) {
    const body = { deviceLogId, receivedByUserId, ActionId };
    console.log(body);
    return this.http.post<any>(this.apiUrl + 'RecievedBy', body);
  }
  addComment(commentDto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Comments', commentDto);
  }
  addRevokeComment(commentDto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Comments/AddRevokeComment', commentDto);
  }

  addSoftwareComment(commentDto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Comments/AddSoftwareComment', commentDto);
  }

  getComments(deviceId: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Comments/' + deviceId);
  }

  postUsers(FormGroup: any[]): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'employee/AddUsers', FormGroup);
  }

  revokeAll(body: any) {
    return this.http.post<any>(this.apiUrl + 'RecievedBy/RevokeAll', body);
  }
  UpdateExitProcessInitiation(body: any) {
    return this.http.post<any>(this.apiUrl + 'RecievedBy/updateExitProcessInitiation', body);
  }
}
