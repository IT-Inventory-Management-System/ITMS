import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  laptopFormData: any; 
  constructor() { }

  saveLaptopFormData(formData: FormGroup) {
    this.laptopFormData = formData;
  }

  getLaptopFormData() {
    return this.laptopFormData;
  }
}
