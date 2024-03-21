import { Component } from '@angular/core';
import { SelectedCountryService } from '../shared/services/selected-country.service';
import { DataService } from '../shared/services/data.service';
import * as XLSX from 'xlsx';
import { EmployeeService } from '../shared/services/Employee.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-user-csv',
  templateUrl: './add-user-csv.component.html',
  styleUrls: ['./add-user-csv.component.css']
})

export class AddUserCsvComponent {

  locationId: string = '';
  locationName: string = '';
  arrayBuffer: any;
  file: File;
  loggedUser: any;
    fileName: string;
  csvFileVisible: boolean = false;

  constructor(private selectedCountryService: SelectedCountryService, private dataService: DataService, private empService: EmployeeService, private toastr: ToastrService, private router: Router) {
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
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArray: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const employeeArray = dataArray.slice(1).map((row: any[]) => {
        return {
          location: this.locationName,
          createdBy: this.loggedUser.id,
          updatedBy: this.loggedUser.id, 
          firstName: row[0],
          lastName: row[1],
          email: row[2],
          cgiId: row[3]
        };
      });
     // console.log(employeeArray);
      this.postUserData(employeeArray);
    };

    fileReader.readAsArrayBuffer(this.file);
  }

  postUserData(newEmployeeData: any[]) {
    this.empService.postUsers(newEmployeeData).subscribe(
      response => {
       // console.log('New Users added successfully', response);
        this.toastr.success("New users added successfully");
        this.empService.notifyUserListChanged();
      },
      error => {
        console.error('Error posting data', error);
        this.toastr.error("Error in posting new users");
      }
    );
  }

  cancle() {
    this.csvFileVisible = false;

  }

  saveData() {
    this.processData();
    this.csvFileVisible = false;
    this.router.navigate(['/employee']);


  }

}
