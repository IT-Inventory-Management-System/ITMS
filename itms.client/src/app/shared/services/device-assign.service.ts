import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceAssignService {
  private apiUrl = this.config.apiUrl;
  constructor(private http: HttpClient, private config: ConfigServiceService) { }

  getEmployeeBasicDetails(locationId: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `employee/basicdetails/` + locationId);
  }
  getSoftware(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `software/getSoftware`);
  }
  getSoftwareVersion(SoftwareName: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `software/getSoftwareVersion?SoftwareName=${encodeURIComponent(SoftwareName)}`)
  }
  getLaptop(locationId: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `Device/getDevicess/` + locationId);
  }
  getAccessories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `Accessories/GetAccessoriesList`);
  }

  getAccessoriesDetails(input :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + `Accessories/GetAccessoriesDetails` , input);
  }

  saveAssignment(assignmentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+`add/assignAsset`, assignmentData);
  }
}
