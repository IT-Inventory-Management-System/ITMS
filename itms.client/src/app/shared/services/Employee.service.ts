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
  private apiUrl = 'https://localhost:7283/api/';

  constructor(private http: HttpClient) { }
  getDevices(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'userdevices/GetDevices/'+id);
  }

  getSoftware(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'software/GetUserSoftware/'+id);
  }

  getAccessories(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Accessories/GetUserAccessories/' + id);
  }

  addComment(commentDto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Comments', commentDto);
  }

  getComments(deviceId: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Comments/' + deviceId);
  }
}
