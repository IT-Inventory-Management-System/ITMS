import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-software-model',
  templateUrl: './add-software-model.component.html',
  styleUrls: ['./add-software-model.component.css']
})
export class AddSoftwareModelComponent {
  @Output() radioSelection = new EventEmitter<string>();


  onRadioButtonSelected(option: string) {
    this.radioSelection.emit(option);
  }
}
