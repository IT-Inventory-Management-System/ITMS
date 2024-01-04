import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-name',
  templateUrl: './category-name.component.html',
  styleUrls: ['./category-name.component.css']
})
export class CategoryNameComponent {

  @Input() name: string = '';
  @Input() isSelected: boolean = false; 
  @Output() clickEvent = new EventEmitter<void>();

  handleClick() {
    this.clickEvent.emit();
  }
  

  getSrcLink(name:string) {
    switch (this.name) {
      case 'Laptop':
        return this.isSelected ? '../../assets/icons/laptop-white.svg':'../../assets/icons/laptop-blue.svg';
      case 'Monitor':
        return this.isSelected ? '../../assets/icons/monitor-white.svg' : '../../assets/icons/monitor-blue.svg';
      case 'Software':
        return this.isSelected ? '../../assets/icons/software-white.svg' : '../../assets/icons/software-blue.svg';
      case 'Keyboard':
        return this.isSelected ? '../../assets/icons/keyboard-white.svg' : '../../assets/icons/keyboard-blue.svg';
      case 'Bag':
        return this.isSelected ? '../../assets/icons/bag-white.svg' : '../../assets/icons/bag-blue.svg';
      case 'Mouse':
        return this.isSelected ? '../../assets/icons/mouse-white.svg' : '../../assets/icons/mouse-blue.svg';
      default:
        return '../../assets/icons/placeholder.svg';
    }

    
  }
}
