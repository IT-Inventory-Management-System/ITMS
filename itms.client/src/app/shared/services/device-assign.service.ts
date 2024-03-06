import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceAssignService {
  private apiUrl = 'https://www.itims-project.somee.com/api/';
  constructor(private http: HttpClient) { }

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
