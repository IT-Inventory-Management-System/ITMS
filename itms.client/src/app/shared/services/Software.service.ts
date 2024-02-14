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


}
