import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayDetailsService {

  private apiUrl = this.config.apiUrl;
  searchText: any;

  constructor(private http: HttpClient, private config: ConfigServiceService) { }

  getshowUserListData(locationId: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'employee/basicdetails/' + locationId);
  }
  
}
