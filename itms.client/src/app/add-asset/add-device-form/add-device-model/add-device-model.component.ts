import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-add-device-model',
  templateUrl: './add-device-model.component.html',
  styleUrls: ['./add-device-model.component.css']
})
export class AddDeviceModelComponent implements OnInit {

  deviceForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.deviceForm = this.fb.group({
      deviceName: ['', Validators.required],
      brand: ['', Validators.required],
      modelNo: ['', Validators.required],
      ram: [''],
      processor: ['', Validators.required],
      storage: [''],
      isWired: [false],
      categoryId: ['0F38C372-F6FB-4FFB-B4F0-704306E451EE'],
      createdBy: ['B294E91E-37D6-4E55-8A14-6EA0D4D8DD0E'],
      createdAtUtc: [''],
      updatedBy: ['B294E91E-37D6-4E55-8A14-6EA0D4D8DD0E'],
      updatedAtUtc: [''],
      os: ['4568D27C-C6F8-4B79-8AF8-C90DC4C532BE'],
      isArchived: [false] 
    });
  }

  selectRam(value: string) {
    this.deviceForm.get('ram')?.setValue(value);
  }

  selectStorage(value: string) {
    this.deviceForm.get('storage')?.setValue(value);
  }

  onSubmit() {

    this.deviceForm.get('createdAtUtc')?.setValue(new Date().toISOString());
    this.deviceForm.get('updatedAtUtc')?.setValue(new Date().toISOString());

    console.log(this.deviceForm.value);

    this.dataService.postDeviceModel(this.deviceForm.value).subscribe(
      response => {
        console.log('Post successful', response);
      },
      error => {
        console.error('Error posting data', error);
      }
    );
  }

}
