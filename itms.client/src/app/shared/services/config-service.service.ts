import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  apiUrl = 'https://itims-project-testing.somee.com/api/';
  constructor() { }

}
