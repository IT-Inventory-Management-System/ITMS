import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

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
  @Output() initiateExitProcess: EventEmitter<void> = new EventEmitter<void>();
  //@ViewChild('emailContent') emailContent: ElementRef;
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
  onInitiateExitProcess() {
    //html2canvas(this.emailContent.nativeElement).then(canvas => {
    //  const imageData = canvas.toDataURL(); // Convert canvas to base64 image data
    //  //this.insertImage(imageData);
    //  this.openEmailClient(imageData);
    //});
    this.initiateExitProcess.emit();
  }


  //insertImage(imageData: string) {
  //  const img = new Image();
  //  img.src = imageData;
  //  img.style.maxWidth = '100%';
  //  this.imagePlaceholder.nativeElement.innerHTML = ''; // Clear existing content
  //  this.imagePlaceholder.nativeElement.appendChild(img);
  //}

}
