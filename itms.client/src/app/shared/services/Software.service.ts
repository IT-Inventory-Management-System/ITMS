import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  private apiUrl = 'https://localhost:7283/api/';

  constructor(private http: HttpClient) { }
  GetSoftware(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'SoftwarePage/software');
  }


  GetSingleSelected(parameters: any): Observable<SingleSoftwareSelected | null> {
    // Assuming you have an appropriate API endpoint for GetSingleSelected
    // Adjust the URL and any other parameters as needed
    return this.http.get<SingleSoftwareSelected | null>(this.apiUrl + 'SoftwarePage/selected', { params: parameters });
  }


}
