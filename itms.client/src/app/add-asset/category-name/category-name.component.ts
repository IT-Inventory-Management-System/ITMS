import { Component, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-category-name',
  templateUrl: './category-name.component.html',
  styleUrls: ['./category-name.component.css']
})
export class CategoryNameComponent {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() name: string = '';
  @Input() isSelected: boolean = false; 
  @Output() clickEvent = new EventEmitter<void>();

  ngOnInit() {
    // Check if the current category name matches the selected category in localStorage
    if (this.name === localStorage.getItem('selectedCategory')) {
      this.isSelected = true;
      this.updateStyles();
    }
  }

  handleClick() {
    //this.clickEvent.emit();
    this.resetStyles();
    localStorage.setItem('selectedCategory', this.name);
    this.isSelected = true;
    this.updateStyles();
    location.reload();
  }

  updateStyles() {
    // Apply styles to the clicked card
    const outerCard = this.el.nativeElement.querySelector('.outer-card-name');
    this.renderer.setStyle(outerCard, 'background-color', '#28519E');
    this.renderer.setStyle(outerCard, 'color', 'white');
  }

  resetStyles() {
    // Reset styles for all cards
    const allCards = document.querySelectorAll('.outer-card-name');
    allCards.forEach(card => {
      this.renderer.removeStyle(card, 'background-color');
      this.renderer.removeStyle(card, 'color');
    });
  }


  getSrcLink(name:string) {
    switch (name) {
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
