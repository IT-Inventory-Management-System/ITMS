import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-laptop-all-revoke',
  templateUrl: './laptop-all-revoke.component.html',
  styleUrls: ['./laptop-all-revoke.component.css']
})
export class LaptopAllRevokeComponent {
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;
  @Input() laptopDetails: any;

  selectedReason: any; 

  newComment: string = '';
  comments: any;

  showYesReason: boolean[] = []; 
  showNoReason: boolean[] = [];

  ngOnInit() {
   
    if (this.laptopDetails) {
      for (let i = 0; i < this.laptopDetails.length; i++) {
        this.showYesReason[i] = false;
        this.showNoReason[i] = false;
      }
    }
  }


  showYesReasonOptions(index: number) {
    this.showYesReason[index] = !this.showYesReason[index];
    this.showNoReason[index] = false;
  }

  showNoReasonOptions(index: number) {
    this.showNoReason[index] = !this.showNoReason[index];
    this.showYesReason[index] = false;
  }

}
