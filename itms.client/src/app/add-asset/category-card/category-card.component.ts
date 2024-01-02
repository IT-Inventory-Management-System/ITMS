import { Component, Input } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {

  @Input() typeName: string = '';
  categories: any[] = [];

  constructor(private dataService: DataService) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.showCategories();
  }

  showCategories() {
    this.dataService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categoryData);
      },
      (error) => {
        console.log(error);
      }
    )
  }



}
