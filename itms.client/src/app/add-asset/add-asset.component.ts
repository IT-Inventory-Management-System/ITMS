import { Component } from '@angular/core';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent {

  categoryData: any[] = [];

  constructor(private dataService: DataService) {
    this.categoryData = [];
  }

  ngOnInit(): void {
    this.showCategories();
  }

  showCategories() {
    this.dataService.getCategories().subscribe(
      (data) => {
        this.categoryData = data;
        console.log(this.categoryData);
      },
      (error) => {
        console.log(error);
  }
   
    )
  }
 
}
