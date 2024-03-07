import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  private apiUrl = this.config.apiUrl;
  constructor(private http: HttpClient, private config: ConfigServiceService) { }
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
