import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  private apiUrl = 'https://itims-project.somee.com/api/';
  constructor(private http: HttpClient) { }
  GetSoftware(arch: boolean): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl +'SoftwarePage/software', { params: { arch: arch.toString() } });
  }


  GetSingleSelected(parameters: any): Observable<any | null> {
    // Assuming you have an appropriate API endpoint for GetSingleSelected
    // Adjust the URL and any other parameters as needed
    return this.http.get<any | null>(this.apiUrl + 'SoftwarePage/selected', { params: parameters });
  }




  GetHistory(parameters: any): Observable<any | null> {
    // Assuming you have an appropriate API endpoint for GetSingleSelected
    // Adjust the URL and any other parameters as needed
    return this.http.get<any | null>(this.apiUrl + 'SoftwarePage/History', { params: parameters });
  }


  GettableSoftwares(parameters: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'SoftwarePage/softwarestable', { params: parameters });
  }


  UpdateSoftwareArchiveStatus(body: any): Observable<any | null> {
    return this.http.post<any | null>(this.apiUrl + 'SoftwarePage/archive', body);
  }

  FilterSoftware(body: any): Observable<any | null> {
    return this.http.post<any | null>(this.apiUrl + 'SoftwarePage/filter', body);
  }

  FilterSoftwareTable(body: any): Observable<any | null> {
    return this.http.post<any | null>(this.apiUrl + 'SoftwarePage/filterTable', body);
  }

}
