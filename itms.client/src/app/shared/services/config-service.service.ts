import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  apiUrl = 'https://itims-testing-link.somee.com/api/';
  constructor() { }

}
