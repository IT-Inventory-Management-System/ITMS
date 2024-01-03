import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AvatarModule } from 'ngx-avatars';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EmployeeComponent } from './employee/employee.component';
import { LicenseComponent } from './license/license.component';
import { HistoryComponent } from './history/history.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { AddDeviceFormComponent } from './add-asset/add-device-form/add-device-form.component';
import { AddDeviceModelComponent } from './add-asset/add-device-form/add-device-model/add-device-model.component';
import { IdInputComponent } from './add-asset/add-device-form/id-input/id-input.component';
import { AddSoftwareFormComponent } from './add-asset/add-software-form/add-software-form.component';

import { CategoryTypeComponent } from './add-asset/category-type/category-type.component';
import { CategoryCardComponent } from './add-asset/category-card/category-card.component';
import { CategoryNameComponent } from './add-asset/category-name/category-name.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    CategoryComponent,
    InventoryComponent,
    EmployeeComponent,
    LicenseComponent,
    HistoryComponent,
    AddAssetComponent,
    AddDeviceFormComponent,
    AddDeviceModelComponent,
    IdInputComponent,
    AddSoftwareFormComponent,
    CategoryTypeComponent,
    CategoryCardComponent,
    CategoryNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
