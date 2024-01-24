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
  @Output() categorySelected = new EventEmitter<string>();

  ngOnInit() {
    // Check if the current category name matches the selected category in localStorage
    //this.resetStyles();
    this.updateImageURL('blue');
    if (this.name === 'Laptop') {
      //alert(this.name)
      this.isSelected = true;
      this.updateStyles();
    }
  }

  handleClick() {
    //this.clickEvent.emit();
    this.resetStyles();
    //localStorage.setItem('selectedCategory', this.name);
    this.categorySelected.emit(this.name);
    //this.isSelected = true;
    this.updateStyles();
   // location.reload();
  }

  updateStyles() {
    // Apply styles to the clicked card
    const outerCard = this.el.nativeElement.querySelector('.outer-card-name');
    this.renderer.setStyle(outerCard, 'background-color', '#28519E');
    this.renderer.setStyle(outerCard, 'color', 'white');
    this.updateImageURL('white');
  }

  resetStyles() {
    // Reset styles for all cards
    const allCards = document.querySelectorAll('.outer-card-name');
    allCards.forEach(card => {
      this.renderer.removeStyle(card, 'background-color');
      this.renderer.removeStyle(card, 'color');
      this.updateImageURL('blue');
    });
   
  }

  updateImageURL(color: string) {
    const imgElement = this.el.nativeElement.querySelector('img');
    imgElement.src = this.getSrcLink(this.name, color);
  }


  getSrcLink(name: string, color: string) {

    switch (name) {
      case 'Laptop':
        return `../../assets/icons/laptop-${color}.svg`;
      case 'Monitor':
        return `../../assets/icons/monitor-${color}.svg`;
      case 'Software':
        return `../../assets/icons/software-${color}.svg`;
      case 'Keyboard':
        return `../../assets/icons/keyboard-${color}.svg`;
      case 'Bag':
        return `../../assets/icons/bag-${color}.svg`;
      case 'Mouse':
        return `../../assets/icons/mouse-${color}.svg`;
      default:
        return `../../assets/icons/placeholder.svg`;
    }
  }
}
