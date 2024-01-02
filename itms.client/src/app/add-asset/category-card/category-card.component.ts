import { Component, Input } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {

  @Input() typeName: string = '';
  @Input() categories: any[] = [];

}
