import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-type',
  templateUrl: './category-type.component.html',
  styleUrls: ['./category-type.component.css']
})
export class CategoryTypeComponent {

  @Input() type: string = '';

}
