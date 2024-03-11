import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-add-accessory-shared',
  templateUrl: './add-accessory-shared.component.html',
  styleUrls: ['./add-accessory-shared.component.css']
})
export class AddAccessorySharedComponent {

  constructor(private el: ElementRef) { }

  @Input() category: string = '';
  currentStep: number = 1;
  srcLink: any;
  showAccessoryBrandForm = false;
 
  convertToLinkText(inputString: string): string {
  return inputString
    .toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-') 
    .replace(/^-+|-+$/g, ''); 
  }

  ngOnChanges() {
    this.ngAfterViewInit();
    //this.updateImageURL(this.category);
  }

  ngAfterViewInit() {
    this.updateImageURL(this.category);
  }

  updateImageURL(category: string) {
    if (this.currentStep === 1) {
      const imgElement = this.el.nativeElement.querySelector('.accesory-icon');

      if (imgElement) {
        imgElement.src = this.getSrcLink(category);
        console.log(imgElement.src);
      } else {
        console.error('Element with class "accesory-icon" not found.');
      }
    }
  }


  getSrcLink(category: string) {
    const convertedString = this.convertToLinkText(category);
    console.log(convertedString);
    return `../../../../assets/icons/add-asset/${convertedString}-blue.svg`;
  }

  toggleAccessoryBrandForm() {
    this.showAccessoryBrandForm = !this.showAccessoryBrandForm;
  }
}
