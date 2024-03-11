import { Component, EventEmitter, Input, Output, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import html2canvas from 'html2canvas';
import { EmployeeService } from '../shared/services/Employee.service';

@Component({
  selector: 'app-exit-process',
  templateUrl: './exit-process.component.html',
  styleUrls: ['./exit-process.component.css']
})
export class ExitProcessComponent {
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;
  @Input() laptopDetails: any;
  @Input() accessoriesDetails: any;
  @Input() userEmail: any;
  @Output() initiateExitProcess: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('emailContent') emailContent: ElementRef;
  cont: any;
  ToEmail: any;
  storedUser: any;
  constructor(private updateExitProcessInitiationService: EmployeeService) { }


  ngOnChanges() {
    this.ToEmail = this.userEmail;
  }

  onInitiateExitProcess() {
    //var emailTo = 'abc@abc.com';
    //var emailSubject = 'Exit Process Initiated';
    //this.cont = `To: ${emailTo}\n`;
    //this.cont += `Subject: ${emailSubject}\n`;
    //this.cont += 'X-Unsent:1' + '\n';
    //this.cont += 'Content-Type: multipart/mixed; boundary=--boundary_text_string' + '\n';
    //this.cont += '\n';
    //this.cont += '----boundary_text_string_start' + '\n';
    //this.cont += 'Content-Type: text/html; charset=UTF-8' + '\n';
    //this.cont += '\n';
    //console.log(this.emailContent.nativeElement.InnerHTML);
    //this.cont += emailBody;
    //this.cont += '\n\n';
    //this.cont += '----boundary_text_string_end--';
    //console.log(this.cont);
    //var blobData = new Blob([this.cont], { type: 'text/plain' });
    //var a = document.createElement('a');
    //a.href = window.URL.createObjectURL(blobData);
    //a.download = `${this.firstName}-${this.lastName}-ExitProcess.eml`;
    //a.click();

    if (this.ToEmail) {
      const modalContent = document.querySelector('.email') as HTMLElement;

      html2canvas(modalContent).then(canvas => {
        const imageData = canvas.toDataURL();
        this.sendEmail(imageData);
      });
    }
    //call function making post request to change exitProcessInitiated of this.userId to true

    this.initiateExitProcess.emit();
    this.updateExitProcessInitiation();
    //html2canvas(this.emailContent.nativeElement).then(canvas => {
    //  const imageData = canvas.toDataURL(); // Convert canvas to base64 image data
    //  //this.insertImage(imageData);
    //  this.openEmailClient(imageData);
    //});

  }
  updateExitProcessInitiation() {
    this.storedUser = localStorage.getItem("user");

    const body = {
      employeeId: this.userId,
      updatedBy: JSON.parse(this.storedUser).id,
      exitProcessInitiated: true
    };
    console.log(body);
    this.updateExitProcessInitiationService.UpdateExitProcessInitiation(body).subscribe(
      response => {
        console.log('Exit process updated successfully:', response.message);
        // Handle success
      },
      error => {
        console.error('Error updating exit process:', error);
        // Handle error
      }
    );
  }
  sendEmail(imageData: string) {
    const modalContent = document.querySelector('.email')?.innerHTML;
    const subject = 'Exit Process Information';
    const body = 'Please find the attached information about your assigned items.';

    const base64Image = imageData.split(',')[1];

    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Resize the canvas to desired dimensions
      const maxWidth = 600; // Maximum width for the resized image
      const maxHeight = 500; // Maximum height for the resized image
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      const resizedImageData = canvas.toDataURL('image/jpeg');

      //const byteCharacters = atob(resizedImageData.split(',')[1]);
      //const byteNumbers = new Array(byteCharacters.length);
      //for (let i = 0; i < byteCharacters.length; i++) {
      //  byteNumbers[i] = byteCharacters.charCodeAt(i);
      //}
      //const byteArray = new Uint8Array(byteNumbers);
      //const blob = new Blob([byteArray], { type: 'image/jpeg' });

      //const imageLink = document.createElement('a');
      //imageLink.href = URL.createObjectURL(blob);
      //imageLink.download = 'assigned_items.jpeg';
      //imageLink.click();

      //const mailtoLink = `mailto:${this.ToEmail}?subject=${encodeURIComponent(subject)}&body=${body}&attachment=assigned_items.png`;

      //window.location.href = mailtoLink;



      let emailContent = `To: ${this.ToEmail}\n`;
      emailContent += `Subject: ${subject}\n`;
      emailContent += `X-Unsent: 1\n`;
      emailContent += "Content-Type: multipart/mixed; boundary=--boundary_text_string" + "\n";
      emailContent += "\n";
      emailContent += "----boundary_text_string" + "\n";
      emailContent += "Content-Type: text/html; charset=UTF-8" + "\n";
      emailContent += "\n";
      emailContent += body + "\n";
      emailContent += "----boundary_text_string" + "\n";
      emailContent += "Content-Type: image/jpeg; name=assigned_items.jpeg" + "\n";
      emailContent += "Content-Transfer-Encoding: base64" + "\n";
      emailContent += "Content-Disposition: attachment" + "\n";
      emailContent += "" + "\n";
      emailContent += resizedImageData.split(',')[1] + "\n";
      emailContent += "----boundary_text_string--";

      // Create a Blob object with the email content
      const blobData = new Blob([emailContent], { type: 'text/plain' });

      // Create a download link for the Blob object
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blobData);
      link.download = 'email_draft.eml';
      link.click();

    };
  }


  //@ViewChild('imagePlaceholder') imagePlaceholder: ElementRef;

  //isEmailContentHidden: any;
  //constructor() { this.isEmailContentHidden =true}
  //openEmailClient(imageData: string) {
  //  const mailtoLink = `mailto:?subject=Your%20Subject&body=<h1>Hello!</h1>`;
  //  window.location.href = mailtoLink;
  //}

  //toggleEmailContent() {
  //  this.isEmailContentHidden = !this.isEmailContentHidden;
  //}

  //insertImage(imageData: string) {
  //  const img = new Image();
  //  img.src = imageData;
  //  img.style.maxWidth = '100%';
  //  this.imagePlaceholder.nativeElement.innerHTML = ''; // Clear existing content
  //  this.imagePlaceholder.nativeElement.appendChild(img);
  //}

}
