import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-add-device-model',
  templateUrl: './add-device-model.component.html',
  styleUrls: ['./add-device-model.component.css']
})
export class AddDeviceModelComponent implements OnInit {

  deviceForm: FormGroup;
  selectedRam: string | null = null;
  selectedStorage: string | null = null;
  @Input() selectedOS: string;

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.createForm();
    console.log(this.selectedOS);
    this.setOperatingSystem();
    this.setCategoryId();
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
      categoryId: [''],
      createdBy: ['B294E91E-37D6-4E55-8A14-6EA0D4D8DD0E'],
      createdAtUtc: [''],
      updatedBy: ['B294E91E-37D6-4E55-8A14-6EA0D4D8DD0E'],
      updatedAtUtc: [''],
      os: [''],
      isArchived: [false] 
    });
  }

  selectRam(value: string) {
    this.selectedRam = value;
    this.deviceForm.get('ram')?.setValue(value);
  }

  selectOtherRam(event: any) {
    if (this.selectedRam == null) {
      this.deviceForm.get('ram')?.setValue(event.target.value);
    }
  }

  selectStorage(value: string) {
    this.selectedStorage = value;
    this.deviceForm.get('storage')?.setValue(value);
  }

  selectOtherStorage(event: any) {
    if (this.selectedStorage == null) {
      this.deviceForm.get('storage')?.setValue(event.target.value);
    }
  }

  setOperatingSystem() {

    this.dataService.getOs().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == this.selectedOS) {
            this.deviceForm.get('os')?.setValue(data[i].id);
          }
        }
      },
      (error) => {
        console.error('Error fetching OS values', error);
      }
    );

  }

  setCategoryId() {
    this.dataService.getCategories().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j  < data[i].categories.length; j++) {
            if (data[i].categories[j].name == localStorage.getItem('selectedCategory')) {
              this.deviceForm.get('categoryId')?.setValue(data[i].categories[j].id);
            }
          }
        }
      },
      (error) => {
        console.log(error);
      });
  }

  onSubmit() {

    this.deviceForm.get('createdAtUtc')?.setValue(new Date().toISOString());
    this.deviceForm.get('updatedAtUtc')?.setValue(new Date().toISOString());
   

    console.log(this.deviceForm.value);

    this.dataService.postDeviceModel(this.deviceForm.value).subscribe(
      response => {
        console.log('Post successful', response);
        this.deviceForm.reset();
        this.selectedRam = null;
        this.selectedStorage = null;
      },
      error => {
        console.error('Error posting data', error);
      }
    );
  }

}
