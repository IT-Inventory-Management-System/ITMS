import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accessories-all-revoke',
  templateUrl: './accessories-all-revoke.component.html',
  styleUrls: ['./accessories-all-revoke.component.css']
})
export class AccessoriesAllRevokeComponent {
  @Input() userId: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() cgiid: any;
  @Input() accessoriesDetails: any;

  selectedReason: any;

  newComment: string = '';
  comments: any;

  showYesReason: boolean[] = [];
  showNoReason: boolean[] = [];


  ngOnInit() {

    if (this.accessoriesDetails) {
      for (let i = 0; i < this.accessoriesDetails.length; i++) {
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
