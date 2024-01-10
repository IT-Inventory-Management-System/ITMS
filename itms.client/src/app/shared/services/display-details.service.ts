import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayDetailsService {

  private apiUrl = 'https://localhost:44384/api/';
  constructor(private http: HttpClient) { }

  getshowUserListData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'employee/basicdetails');
  }


  
}
