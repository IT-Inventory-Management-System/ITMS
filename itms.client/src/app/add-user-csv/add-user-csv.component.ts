import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user-csv',
  templateUrl: './add-user-csv.component.html',
  styleUrls: ['./add-user-csv.component.css']
})
export class AddUserCsvComponent {

  triggerFileInput() {
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) {
      fileInput.click(); // Programmatically trigger file input click
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Handle the selected file here (e.g., upload it to the server)
      console.log('Selected file:', file);
    }
  }

}
