import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-software-model',
  templateUrl: './add-software-model.component.html',
  styleUrls: ['./add-software-model.component.css']
})
export class AddSoftwareModelComponent {
ProfileDP = '';

ngOnInit(): void {
  this.ProfileDP = '../../../assets/icons/add_photo_alternate_outlined 1.svg';
  }
  ImageUpload(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        
        this.ProfileDP = e.target.result;
      };

    }
  }
  }


