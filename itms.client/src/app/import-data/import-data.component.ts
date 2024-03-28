import { Component } from '@angular/core';
import { SelectedCountryService } from '../shared/services/selected-country.service';
import { DataService } from '../shared/services/data.service';
import * as XLSX from 'xlsx';
import { EmployeeService } from '../shared/services/Employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent {
  locationId: string = '';
  locationName: string = '';
  arrayBuffer: any;
  file: File;
  loggedUser: any;
  fileName: string;
  csvFileVisible: boolean = false;

  constructor(private selectedCountryService: SelectedCountryService, private dataService: DataService, private empService: EmployeeService, private toastr: ToastrService) {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      this.loggedUser = JSON.parse(storedUser);
    }
  }

  ngOnInit(): void {
    this.selectedCountryService.selectedCountry$.subscribe((selectedCountry) => {
      localStorage.setItem('selectedCountry', selectedCountry);
      this.getUserLocation();
    });
  }

  getUserLocation() {
    this.dataService.getLocation().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == localStorage.getItem('selectedCountry')) {
            this.locationId = data[i].id;
            this.locationName = data[i].type;
            break;
          }
        }
      },
      (error) => {
        console.log("Location not found");
      });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileUpload2');
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.csvFileVisible = !this.csvFileVisible;
      console.log('Selected file:', this.file);
    }
  }

  processData() {
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      this.arrayBuffer = e.target.result;
      const data = new Uint8Array(this.arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      this.excelImportLaptop(workbook);
      this.excelImportMacBook(workbook);
      this.excelImportBag(workbook);
    };

    fileReader.readAsArrayBuffer(this.file);
  }

  postLaptopData(oldDeviceData: any[]) {
    this.dataService.postExcelLaptopData(oldDeviceData).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error posting Laptops', error);
      }
    );
  }

  postBagData(oldBagData: any[]) {
    this.dataService.postExcelBagData(oldBagData).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error posting Bags', error);
      }
    );
  }

  excelImportLaptop(workbook : any) {
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const dataArray: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const inputArray = dataArray.slice(1).map((row: any[]) => {
      return {
        locationId: this.locationId,
        LoggedIn: this.loggedUser.id,
        FullDeviceName: row[1] == null || row[1] == undefined ? null : row[1],
        Processor: 'i7',
        Ram: "16",
        Storage: "512",
        SerialNo: row[2] == null || row[2] == undefined ? null : row[2],
        PurchasedDate: row[3] == null || row[3] == undefined ? null : row[3],
        DeviceLog: row[4] == null || row[4] == undefined ? null : row[4],
        Cygid: row[5] == null || row[5] == undefined ? null : row[5]
      };
    });
    this.postLaptopData(inputArray);
  }

  excelImportMacBook(workbook: any) {
    const sheetName = workbook.SheetNames[2];
    const sheet = workbook.Sheets[sheetName];
    const dataArray: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const inputArray = dataArray.slice(1).map((row: any[]) => {
      return {
        locationId: this.locationId,
        LoggedIn: this.loggedUser.id,
        FullDeviceName: row[1] == null || row[1] == undefined ? null : row[1],
        Processor: 'Macbook Processor',
        Ram: "16",
        Storage: "512",
        SerialNo: row[2] == null || row[2] == undefined ? null : row[2],
        PurchasedDate: row[3] == null || row[3] == undefined ? "08-05-2015" : row[3],
        DeviceLog: row[4] == null || row[4] == undefined ? null : row[4],
        Cygid: null
      };
    });
    this.postLaptopData(inputArray);
  }
  excelImportBag(workbook: any) {
    const sheetName = workbook.SheetNames[4];
    const sheet = workbook.Sheets[sheetName];
    const dataArray: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const inputArray = dataArray.slice(1).map((row: any[]) => {
      return {
        locationId: this.locationId,
        LoggedIn: this.loggedUser.id,
        purchaseddate: row[1] == null || row[1] == undefined ? null : row[1],
        assignedTo: row[2] == null || row[2] == undefined ? null : row[2]
      };
    });
    this.postBagData(inputArray);
  }

  cancle() {
    this.csvFileVisible = false;

  }

  saveData() {
    this.processData();
    this.csvFileVisible = false;

  }
}
