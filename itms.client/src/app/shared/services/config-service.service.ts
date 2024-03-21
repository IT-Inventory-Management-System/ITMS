import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  apiUrl = 'https://itims-testing-3.somee.com/api/';
  constructor() { }
}
