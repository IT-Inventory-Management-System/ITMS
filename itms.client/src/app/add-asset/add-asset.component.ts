import { Component } from '@angular/core';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent {

  categoryData: any[] = [];
  selectedCategory: string | null;
  localStorageListener: any;

  constructor(private dataService: DataService) {
    this.categoryData = [];
    this.selectedCategory = localStorage.getItem('selectedCategory');
    this.localStorageListener = this.handleStorageChange.bind(this);
    window.addEventListener('storage', this.localStorageListener);

  }

  ngOnInit(): void {
    this.showCategories();
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.localStorageListener);
  }

  handleStorageChange(event: StorageEvent): void {
    alert(event.newValue);
    if (event.key === 'selectedCategory') {
      this.selectedCategory = event.newValue;
    }
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
