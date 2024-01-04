import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spec-info',
  templateUrl: './spec-info.component.html',
  styleUrls: ['./spec-info.component.css']
})
export class SpecInfoComponent {
  @Input() info: any;

  info1(details: any) {
    this.info = details;

  }

}
