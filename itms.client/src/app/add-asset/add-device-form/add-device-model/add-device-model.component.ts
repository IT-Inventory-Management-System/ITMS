import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-device-model',
  templateUrl: './add-device-model.component.html',
  styleUrls: ['./add-device-model.component.css']
})
export class AddDeviceModelComponent implements OnInit {

  deviceForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.deviceForm = this.fb.group({
      deviceName: ['', Validators.required],
      brand: ['', Validators.required],
      modelNo: ['', Validators.required],
      otherRam: [''],
      ramSelector: [''],
      otherStorage: [''],
      processor: ['', Validators.required],
      storageSelector: [''],
    });
  }

  selectRam(value: number) {
    alert(value);
    this.deviceForm.get('ramSelector')?.setValue(value);
  }

  selectStorage(value: number) {
    this.deviceForm.get('storageSelector')?.setValue(value);
  }

  onSubmit() {
    console.log(this.deviceForm.value);
  }

}
