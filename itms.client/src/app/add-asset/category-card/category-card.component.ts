import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {

  @Input() typeName: string = '';
  @Input() categories: any[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(categoryName: string) {
    this.categorySelected.emit(categoryName);
  }

  //selectedCategory: string = '';

  //handleCategoryClick(category: string) {
  //  if (this.selectedCategory === category) {
  //    // Deselect the category if it's already selected
  //    this.selectedCategory = '';
  //  } else {
  //    // Select the clicked category
  //    this.selectedCategory = category;
  //  }
  //}
  

}
