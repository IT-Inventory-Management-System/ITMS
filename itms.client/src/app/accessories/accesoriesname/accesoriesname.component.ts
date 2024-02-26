import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accesoriesname',
  templateUrl: './accesoriesname.component.html',
  styleUrls: ['./accesoriesname.component.css']
})
export class AccesoriesnameComponent {

  @Input() accessories: any

  @Output() cardClicked: EventEmitter<any> = new EventEmitter<any>();
  onClick(): void {

    this.cardClicked.emit({
      CYGID: this.accessories.cygid
    });
  }

}
