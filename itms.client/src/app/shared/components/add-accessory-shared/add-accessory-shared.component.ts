import { Component, ElementRef, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-accessory-shared',
  templateUrl: './add-accessory-shared.component.html',
  styleUrls: ['./add-accessory-shared.component.css']
})
export class AddAccessorySharedComponent {
  constructor(private dataService: DataService, private fb: FormBuilder, private toastr: ToastrService, private el: ElementRef) {

  }

  addDeviceForm: FormGroup;
  showErrorMessage = false;

  categoryPrefixMap: { [key: string]: string } = {
    "Connector(Texas Instruments)": "CGI-MIS ",
    "Apple Thunderbolt(LAN)": "CGI-CLAN ",
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
  UserId: any;
  userDataJSON: any;
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
    this.showErrorMessage = false;
  }

  ngOnInit(): void {
    this.loadMouseBrand();
    this.prefix = this.getPrefix(this.category);
    this.getCgi();
    this.createForm();
    this.setStatus();
    this.setlocationId();
    this.userDataJSON = localStorage.getItem('user');
    this.currentStep = 1;
    // Parse the JSON string back into an object
    var userData = JSON.parse(this.userDataJSON);

    // Access the 'id' property of the userData object
    this.UserId = userData.id;

  }
  ngAfterViewInit() {
    this.updateImageURL(this.category);
  }
  setlocationId() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.addDeviceForm.get('locationId')?.setValue(data[i].id);
            break;
          }
        }

      },
      (error) => {
        console.log("User not found");
      });
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
    const deviceIdArray = this.addDeviceForm.get('deviceId') as FormArray;
    deviceIdArray.removeAt(deviceIdArray.length - 1);
  }
  increment() {
    this.counterValue++;
    const ele = this.counterValue;
    this.pushValueIntoDeviceId(this.prefix + (this.laststoredcgi + ele));
    this.addDeviceForm.patchValue({
      qty: this.counterValue
    });
  }
  setStatus() {
    this.dataService.getStatus().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == 'Not Assigned') {
            this.addDeviceForm.get('status')?.setValue(data[i].id);
            break;
          }
        }

      },
      (error) => {
        console.log("User not found");
      });
  }
  get counterValues(): number[] {
    return Array.from({ length: this.counterValue }, (_, i) => i + 1);
  }
  nextValidation(): boolean {
    var isDeviceId = this.addDeviceForm.get('deviceModelId')?.value != null;
    var isQuantity = this.counterValue > 0;
    var isPurchasedOn = this.addDeviceForm.get('purchaseddate')?.value != '';
    var isWarrantyDate = this.addDeviceForm.get('warrantydate')?.value != null;
    return isDeviceId && isQuantity && isPurchasedOn && isWarrantyDate;
  }
  next() {

    if (this.nextValidation() == true) {
      this.hideErrorMessage();
      this.currentStep++;
    }
    else {
      this.showErrorMessage = true;
    }

  }
  pushValueIntoDeviceId(value: string) {
    const deviceIdArray = this.addDeviceForm.get('deviceId') as FormArray;
    deviceIdArray.push(this.fb.control(value));
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
  createForm() {
    this.addDeviceForm = this.fb.group({
      deviceModelId: [null, Validators.required],
      qty: [0, Validators.required],
      purchaseddate: ['', Validators.required],
      warrantydate: [null, Validators.required],
      deviceId: this.fb.array([]),
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      isArchived: [false],
      locationId: [''],
      status: [''],
      updatedAt: ['']

    });
  }
  onFormSubmitted() {
    this.showAccessoryBrandForm = false;
    this.ngOnInit();
  }

  onSubmit() {

    this.addDeviceForm.get('createdAt')?.setValue(new Date().toISOString());
    this.addDeviceForm.get('updatedAt')?.setValue(new Date().toISOString());
    this.addDeviceForm.get('createdBy')?.setValue(this.UserId);
    this.addDeviceForm.get('updatedBy')?.setValue(this.UserId);

    if (this.addDeviceForm.valid && this.showErrorMessage == false) {
      console.log(this.addDeviceForm.value);

      this.dataService.postCommonData(this.addDeviceForm.value).subscribe(
        response => {
          console.log('Data Posted successfully', response);
          this.toastr.success("Data Posted SuccessFully");
          this.resettingform();

        },
        error => {
          console.error('Error posting data', error);
          this.toastr.error("Error in posting data");
        }
      );
    }
    else {
      this.showErrorMessage = this.addDeviceForm.invalid;

    }
    }
  resettingform() {
    this.addDeviceForm.reset();
    this.counterValue = 0;
    this.currentStep = 1;

    this.ngOnChanges();


  }

  hideErrorMessage() {
    this.showErrorMessage = false;
  }


}

