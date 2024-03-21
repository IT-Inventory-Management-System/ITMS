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
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.csvFileVisible = !this.csvFileVisible;
      // console.log('Selected file:', this.file);
    }
  }

  processData() {
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      this.arrayBuffer = e.target.result;
      const data = new Uint8Array(this.arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      console.log(workbook);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArray: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log(dataArray);
      const inputArray = dataArray.slice(1).map((row: any[]) => {
        return {
          locationId: this.locationId,
          LoggedIn: this.loggedUser.id,
          FullDeviceName: row[1],
          Processor: 'i7',
          Ram: "16",
          Storage: "512",
          SerialNo: row[2],
          PurchasedDate: row[3],
          DeviceLog: row[4],
          Cygid: row[5]
        };
      });
      console.log(inputArray);
      this.postUserData(inputArray);
    };

    fileReader.readAsArrayBuffer(this.file);
  }

  postUserData(oldDeviceData: any[]) {
    this.dataService.postExcelLaptopData(oldDeviceData).subscribe(
      response => {
        console.log(response);
        //this.toastr.success("New users added successfully");
      },
      error => {
        console.error('Error posting data', error);
        //this.toastr.error("Error in posting new users");
      }
    );
  }

  cancle() {
    this.csvFileVisible = false;

  }

  saveData() {
    this.processData();
    this.csvFileVisible = false;

  }
}
