import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-software-model',
  templateUrl: './add-software-model.component.html',
  styleUrls: ['./add-software-model.component.css']
})
export class AddSoftwareModelComponent {
  showErrorMessage = false;

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  ProfileDP = '';
  newSoftwareForm: FormGroup;
  UserId: any;
  userDataJSON: any;
  softwareTypes: any[] = [];
  dropdownValues: any;
  showExistMessage: boolean = false;
  constructor(private fb: FormBuilder, private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();

    this.getSoftwareType();
    this.loadDropdownValues();

    this.ProfileDP = '../../../assets/icons/add_photo_alternate_outlined 1.svg';

    this.setCategoryId();
    this.userDataJSON = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var userData = JSON.parse(this.userDataJSON);

    // Access the 'id' property of the userData object
    this.UserId = userData.id;
  }

  setCategoryId() {
    this.dataService.getCategories().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].categories.length; j++) {
            if (data[i].categories[j].name == 'Software' || data[i].categories[j].name == 'software') {
              this.newSoftwareForm.get('categoryId')?.setValue(data[i].categories[j].id);
            }
          }
        }
      },
      (error) => {
        console.log(error);
      });
  }


  getSoftwareType() {
    this.dataService.getSoftwareTypes().subscribe(
      (data) => {
        this.softwareTypes = data;
        //console.log(data);
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
      softwareThumbnail: [null, Validators.required],
      categoryId: ['', Validators.required],
      createdBy: [''],
      createdAtUtc: [''],
      updatedBy: [''],
      updatedAtUtc: [''],
    });
  }

  onSubmit() {

    this.newSoftwareForm.get('createdAtUtc')?.setValue(new Date().toISOString());
    this.newSoftwareForm.get('updatedAtUtc')?.setValue(new Date().toISOString());
    this.newSoftwareForm.get('createdBy')?.setValue(this.UserId);
    this.newSoftwareForm.get('updatedBy')?.setValue(this.UserId);

    const softwareName = this.newSoftwareForm.get('softwareName')?.value;
    const softwareType = this.newSoftwareForm.get('softwareTypeId')?.value;

    const matchingSoftware = this.dropdownValues.find((software: any) => {
      return software.softwareName.toLowerCase() === softwareName.toLowerCase() && software.softwareTypeId === softwareType;
    });

    if (matchingSoftware) {
     // this.toastr.error('Software with the same name and type already exists.');
      this.showExistMessage = true;
      return;
    }

    if (this.newSoftwareForm.valid) {
      //console.log(this.newSoftwareForm.value);
      //this.newSoftwareForm.reset();

      this.dataService.postNewSoftwareData(this.newSoftwareForm.value).subscribe(
        response => {
          //console.log('Post Software Data successful', response);
          this.formSubmitted.emit(this.newSoftwareForm.value);

          this.hideErrorMessage();
          this.ProfileDP = '../../../assets/icons/add_photo_alternate_outlined 1.svg';
          this.newSoftwareForm.reset();
          this.setCategoryId();
          this.toastr.success("Data posted successfully");



        },
        error => {
          console.error('Error posting data', error);
          this.toastr.error("Error in posting data");
        }
      );
    } else {
      this.showErrorMessage = this.newSoftwareForm.invalid;

    }
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

      const resizedDataUrl = canvas.toDataURL('image/jpeg');

      const base64String = resizedDataUrl.split(',')[1];

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
  hideErrorMessage() {
    this.showErrorMessage = false;
    this.showExistMessage= false;
  }
  loadDropdownValues() {
    this.dataService.getSoftwares().subscribe(
      (data) => {
        this.dropdownValues = data;
        //console.log(data);
      },
      (error) => {
        console.error('Error fetching software values', error);
      }
    );
  }


}



