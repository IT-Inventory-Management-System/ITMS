import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-add-device-model',
  templateUrl: './add-device-model.component.html',
  styleUrls: ['./add-device-model.component.css']
})
export class AddDeviceModelComponent implements OnInit {

  showErrorMessage = false;
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
    this.setCreatedBy();
  }

  createForm() {
    this.deviceForm = this.fb.group({
      deviceName: ['', Validators.required],
      brand: ['', Validators.required],
      modelNo: ['', Validators.required],
      ram: ['', Validators.required],
      processor: ['', Validators.required],
      storage: ['', Validators.required],
      isWired: [false],
      categoryId: [''],
      createdBy: [''],
      createdAtUtc: [''],
      updatedBy: [''],
      updatedAtUtc: [''],
      os: ['', Validators.required],
      isArchived: [false] 
    });
  }

  selectRam(value: string) {
    this.selectedRam = value;
    this.deviceForm.get('ram')?.setValue(value);
    this.hideErrorMessage();
  }

  selectOtherRam(event: any) {
    if (this.selectedRam == null) {
      this.deviceForm.get('ram')?.setValue(event.target.value);
      this.hideErrorMessage();
    }
  }

  selectStorage(value: string) {
    this.selectedStorage = value;
    this.deviceForm.get('storage')?.setValue(value);
    this.hideErrorMessage();
  }

  selectOtherStorage(event: any) {
    if (this.selectedStorage == null) {
      this.deviceForm.get('storage')?.setValue(event.target.value);
      this.hideErrorMessage();
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

  setCreatedBy() {
    this.dataService.getFirstUser().subscribe(
      (data) => {
        this.deviceForm.get('createdBy')?.setValue(data.id);
        this.deviceForm.get('updatedBy')?.setValue(data.id);
      },
      (error) => {
        console.log("User not found");
      });
  }

  onSubmit() {

    this.deviceForm.get('createdAtUtc')?.setValue(new Date().toISOString());
    this.deviceForm.get('updatedAtUtc')?.setValue(new Date().toISOString());

    

    if (this.deviceForm.valid) {
      
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
    } else {
      this.showErrorMessage = this.deviceForm.invalid;
    }
  }

  hideErrorMessage() {
    this.showErrorMessage = false;
  }

}
