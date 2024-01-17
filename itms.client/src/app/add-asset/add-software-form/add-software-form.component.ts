import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
@Component({
  selector: 'app-add-software-form',
  templateUrl: './add-software-form.component.html',
  styleUrls: ['./add-software-form.component.css']
})
export class AddSoftwareFormComponent {

  dropdownValues: any[] = [];


  ngOnInit(): void {
    this.loadDropdownValues();
  }
  constructor(private dataService: DataService) {
    this.dropdownValues = [];
  }
  loadDropdownValues() {
    this.dataService.getSoftwares().subscribe(
      (data) => {
        this.dropdownValues = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching software values', error);
      }
    );
  }
 
  title = 'ITApp';
  isFormOpen: boolean = false;
  showPassword = false;
  model: any;

  counterValue: number = 0;

  get counterValues(): number[] {
    return Array.from({ length: this.counterValue }, (_, i) => i + 1);
  }

  increment() {
    this.counterValue++;
  }

  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;
    }
  }
  counterValue2: number = 0;

  get counterValues2(): number[] {
    return Array.from({ length: this.counterValue2 }, (_, i) => i + 1);
  }

  increment2() {
    this.counterValue2++;
  }

  decrement2() {
    if (this.counterValue2 > 0) {
      this.counterValue2--;
    }
  }
  counterValue3: number = 0;

  get counterValues3(): number[] {
    return Array.from({ length: this.counterValue3 }, (_, i) => i + 1);
  }

  increment3() {
    this.counterValue3++;
  }

  decrement3() {
    if (this.counterValue3 > 0) {
      this.counterValue3--;
    }
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleSoftwareForm() {
    this.isFormOpen = !this.isFormOpen;
  }
  selectedRadioButton: string = 'Perpetual';

  handleRadioSelection(option: string) {
    this.selectedRadioButton = option;
    console.log(`Selected option: ${option}`);
  }


}
