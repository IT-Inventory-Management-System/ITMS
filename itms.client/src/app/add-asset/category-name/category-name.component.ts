import { Component, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-category-name',
  templateUrl: './category-name.component.html',
  styleUrls: ['./category-name.component.css']
})
export class CategoryNameComponent {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() name: string = '';
  @Output() categorySelected = new EventEmitter<string>();

  ngOnInit() {

    this.updateImageURL(this.name,'blue');
    if (this.name === 'Laptop') {
      this.updateStyles();
    }
  }

  handleClick() {
    this.resetStyles();
    this.categorySelected.emit(this.name);
    this.updateStyles();
  }

  updateStyles() {
    const outerCard = this.el.nativeElement.querySelector('.outer-card-name');
    this.renderer.setStyle(outerCard, 'background-color', '#28519E');
    this.renderer.setStyle(outerCard, 'color', 'white');
    this.updateImageURL(this.name, 'white');
  }

  resetStyles() {
    const allCards = document.querySelectorAll('.outer-card-name');
    allCards.forEach(card => {
      this.renderer.removeStyle(card, 'background-color');
      this.renderer.removeStyle(card, 'color');
      const cardName = card.getAttribute('data-name') || '';
      const imgElement = card.querySelector('img');
      if (imgElement) {
        imgElement.src = this.getSrcLink(cardName, 'blue');
      }
    });
   
  }

  updateImageURL(cardName: string, color: string) {
    const imgElement = this.el.nativeElement.querySelector('img');
    imgElement.src = this.getSrcLink(cardName, color);
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
      case 'Mobile Devices':
        return `../../assets/icons/mobile-${color}.svg`;
      default:
        return `../../assets/icons/placeholder.svg`;
    }
  }
}
