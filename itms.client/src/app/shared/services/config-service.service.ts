import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  apiUrl = 'https://localhost:7283/api/';
  constructor() { }
}
