// mycomponent.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule if using ngModel
import { AddDeviceFormComponent } from './add-device-form.component'; // Import your component
import { DataService } from '../../../app/shared/services/data.service';
import { AddDeviceModelComponent } from './add-device-model/add-device-model.component';

@NgModule({
  declarations: [
    AddDeviceFormComponent,
    AddDeviceModelComponent,

    // Add other components, directives, or pipes used in this module
  ],
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule if using ngModel
    // Add other modules that this module depends on
  ],
  providers: [
    DataService, // Add your service to the providers array
    // Add other services if needed
  ],
})
export class MyComponentModule { }
