import { Component, ElementRef, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-accessory-shared',
  templateUrl: './add-accessory-shared.component.html',
  styleUrls: ['./add-accessory-shared.component.css']
})
export class AddAccessorySharedComponent {
  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService, private el: ElementRef) {

  }


  categoryPrefixMap: { [key: string]: string } = {
    "Connector(Texas Instruments)": "CGI-MIS ",
    "Apple Thunderbolt(LAN) Connector": "CGI-CLAN ",
    "Android Cables": "CGI-AC ",
    "Apple VGA Connector": "CGI-CVGA ",
    "External Hard Drives": "CGI-EHD ",
    "HDMI Cables": "CGI-HDMI ",
    "Iphone USB-A to Lightning Cables": "CGI-iPHC ",
    "Mini- Display HDMI Connector": "CGI-CHD ",
    "Bags": "CGI-BAG ",
    "RAM of Different Models(Laptop)": "CGI-RAML ",
    "RAM of Server": "CGI-RAMS ",
    "Keyboard": "CGI-KO ",
    "Combo": "CGI-WYC ",
    "Mouse": "CGI-MOU ",
  };


  
  dropdownValues: any[] = [];

  @Input() category: string = '';
  prefix: string;
  currentStep: number = 1;
  srcLink: any;
  counterValue: number = 0;
  laststoredcgi: number;
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
    this.counterValue = 0;
    //this.updateImageURL(this.category);
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.loadMouseBrand();
    this.prefix = this.getPrefix(this.category);
    this.getCgi();
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
  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;
    }
    // If you also want to remove the corresponding value from deviceId array when decrementing
    //const deviceIdArray = this.addDeviceForm.get('deviceId') as FormArray;
    //deviceIdArray.removeAt(deviceIdArray.length - 1);
  }

  increment() {
    this.counterValue++;

  }
  get counterValues(): number[] {
    return Array.from({ length: this.counterValue }, (_, i) => i + 1);
  }
  next() {

  
      this.currentStep++;
    
  

  }

  loadMouseBrand() {
    const input = {
      categoryName: this.category
    };

    this.dataService.getAllBrands(input).subscribe(
      (data) => {
        console.log("Original Data:", data);
        this.dropdownValues = [];
        this.dropdownValues = data;

        

      },
      (error) => {
        console.error('Error fetching device data', error);
      }
    );
  }

  previous() {
    this.currentStep--;
  }

  getPrefix(category: string): string {
    return this.categoryPrefixMap[category];
  }

  getCgi() {

    const input = {
      name: this.category
    }
    this.dataService.getAccessoryCGIID(input).subscribe(
      (data) => {
        this.laststoredcgi = parseInt(data[0]?.cgiid, 10);
        console.log(this.laststoredcgi);
      },
      (error) => {
        console.error('Error fetching device data', error);

      }
    )
  }


}

