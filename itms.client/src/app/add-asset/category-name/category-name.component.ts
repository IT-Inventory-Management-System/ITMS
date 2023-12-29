import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-name',
  templateUrl: './category-name.component.html',
  styleUrls: ['./category-name.component.css']
})
export class CategoryNameComponent {

  @Input() category: { name: string, description: string } = { name: '', description: '' };

}
