import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceAssignService {
  private apiUrl = 'https://localhost:44384/api/';

  constructor(private http: HttpClient) { }

  getEmployeeBasicDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `employee/basicdetails`);
  }
  getSoftware(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `software/getSoftware`);
  }
  getSoftwareVersion(SoftwareName: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `software/getSoftwareVersion?SoftwareName=${encodeURIComponent(SoftwareName)}`)
  }
  getLaptop(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `Device/getDevices`);
  }
  getAccessories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `asset/getAccessories`);
  }
  saveAssignment(assignmentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+`add/assignAsset`, assignmentData);
  }
}
