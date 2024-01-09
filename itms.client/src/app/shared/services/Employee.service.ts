import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript'; // Import Guid if using a library to work with GUIDs

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:44384/api/';

  constructor(private http: HttpClient) { }

  getDevices(id: Guid): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetDevices/${id}`);
  }
}
