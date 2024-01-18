import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';


@Component({
  selector: 'app-add-software-model',
  templateUrl: './add-software-model.component.html',
  styleUrls: ['./add-software-model.component.css']
})
export class AddSoftwareModelComponent {

  ProfileDP = '';

  newSoftwareForm: FormGroup;

  softwareTypes: any[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {

    this.createForm();

    this.getSoftwareType();

    this.ProfileDP = '../../../assets/icons/add_photo_alternate_outlined 1.svg';
  }

  getSoftwareType() {
    this.dataService.getSoftwareTypes().subscribe(
      (data) => {
        this.softwareTypes = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching software values', error);
      }
    );
  }

  changeSoftwareType(event: any): void {
    for (var i = 0; i < this.softwareTypes.length; i++) {
      if (this.softwareTypes[i].typeName == event.target.value) {
        this.newSoftwareForm.get('softwareTypeId')?.setValue(this.softwareTypes[i].id);
      }
    }
  }

  createForm() {
    this.newSoftwareForm = this.fb.group({
      softwareName: ['', Validators.required],
      softwareTypeId: ['', Validators.required],
      version: ['', Validators.required],
      softwareThumbnail: [null],
      categoryId: ['2DB84557-61F5-465B-BCC3-2AD1E5C670AC'],
      createdBy: ['B294E91E-37D6-4E55-8A14-6EA0D4D8DD0E'],
      createdAtUtc: [''],
      updatedBy: ['B294E91E-37D6-4E55-8A14-6EA0D4D8DD0E'],
      updatedAtUtc: [''],
    });
  }

  onSubmit() {

    this.newSoftwareForm.get('createdAtUtc')?.setValue(new Date().toISOString());
    this.newSoftwareForm.get('updatedAtUtc')?.setValue(new Date().toISOString());

    console.log(this.newSoftwareForm.value);

    this.dataService.postNewSoftwareData(this.newSoftwareForm.value).subscribe(
      response => {
        console.log('Post Software Data successful', response);
      },
      error => {
        console.error('Error posting data', error);
      }
    );
  }


  ImageUpload(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.resizeImageAndUpload(e.target.result);
        
      };

      reader.readAsDataURL(file);

    }
  }

  resizeImageAndUpload(dataUrl: string): void {
    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = 36;
      canvas.height = 36;

      ctx?.drawImage(img, 0, 0, 36, 36);

      const resizedDataUrl = canvas.toDataURL('image/jpeg'); // You can change the format if needed

      const base64String = resizedDataUrl.split(',')[1];

      // Now you can send the byte array to the backend
      //this.uploadImageToBackend(byteArray);
      this.newSoftwareForm.get('softwareThumbnail')?.setValue(base64String);
      this.byteArrayToImage(base64String);

    };
  }

  byteArrayToImage(base64String: string): void {
    this.ProfileDP = 'data:image/jpeg;base64,' + base64String;
  }


  uploadImageToBackend(byteArray: Uint8Array): void {
    // Make a POST request to your .NET backend to store the image
    console.log(byteArray);
  }

  }


