import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvatarModule } from 'ngx-avatars';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LicenseComponent } from './license/license.component';
import { HistoryComponent } from './history/history.component';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NewSidebarComponent } from './shared/components/new-sidebar/new-sidebar.component';

// Use SidebarNewComponent in your code

import { AddDeviceFormComponent } from './add-asset/add-device-form/add-device-form.component';
import { AddDeviceModelComponent } from './add-asset/add-device-form/add-device-model/add-device-model.component';
import { IdInputComponent } from './add-asset/add-device-form/id-input/id-input.component';
import { LaptopComponent } from './user-detail/laptop/laptop.component';
import { AddSoftwareFormComponent } from './add-asset/add-software-form/add-software-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CategoryTypeComponent } from './add-asset/category-type/category-type.component';
import { UserNameListComponent } from './user-name-list/user-name-list.component';
import { AssetsCategoryComponent } from './inventory/assets-category/assets-category.component';
import { HeaderComponent } from './inventory/assets-category/header/header.component';
import { AssestComponent } from './inventory/assets-category/assest/assest.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardAssetsComponent } from './dashboard/dashboard-assets/dashboard-assets.component';
import { SpecificationComponent } from './inventory/assets-category/assest/specification/specification.component';
import { SpecInfoComponent } from './inventory/assets-category/assest/specification/spec-info/spec-info.component';
import { DevicesComponent } from './inventory/assets-category/assest/devices/devices.component';
import { DevicesListComponent } from './inventory/assets-category/assest/devices/devices-list/devices-list.component';

import { AssignHistoryComponent } from './inventory/assets-category/assest/assign-history/assign-history.component';
import { CommentCardComponent } from './inventory/assets-category/assest/assign-history/comment-card/comment-card.component';


import { SoftwareDetailsComponent } from './user-details/software-details/software-details.component';
import { AccessoriesDetailsComponent } from './user-details/accessories-details/accessories-details.component';

import { CategoryCardComponent } from './add-asset/category-card/category-card.component';
import { CategoryNameComponent } from './add-asset/category-name/category-name.component';
import { AssignAssetComponent } from './assign-asset/assign-asset.component';
import { AssignLaptopComponent } from './assign-asset/assign-laptop/assign-laptop.component';
import { AssignSoftwareComponent } from './assign-asset/assign-software/assign-software.component';
import { AssignAccessoriesComponent } from './assign-asset/assign-accessories/assign-accessories.component';
import { RecentActivityComponent } from './dashboard/recent-activity/recent-activity.component';
import { SoftwareComponentComponent } from './dashboard/software-component/software-component.component';
import { FilterSearchListPipe } from './filter-search-list.pipe';
import { LaptopDetailsComponent } from './user-details/laptop-details/laptop-details.component';
import { CurrentdeviceComponent } from './shared/components/currentdevice/currentdevice.component';
import { SearchBoxComponent } from './assign-asset/search-box/search-box.component';
import { AddSoftwareModelComponent } from './add-asset/add-software-form/add-software-model/add-software-model.component';

import { EmployeeComponent } from './employee/employee.component';
import { AssetfilterdevicePipe } from './assetfilterdevice.pipe';

import { FilterPipe } from './filter.pipe';
import { LaptopSearchBoxComponent } from './assign-asset/laptop-search-box/laptop-search-box.component';
import { SoftwareSearchBoxComponent } from './assign-asset/software-search-box/software-search-box.component';
import { SoftwareVersionSearchBoxComponent } from './assign-asset/software-version-search-box/software-version-search-box.component';
import { AccessoriesSearchBoxComponent } from './assign-asset/accessories-search-box/accessories-search-box.component';
import { AccesoriesComponent } from './dashboard/accesories/accesories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommentsComponent } from './shared/components/comments/comments.component';
import { UserCommentsComponent } from './user-details/user-comments/user-comments.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { ArchiveModalComponent } from './inventory/assets-category/assest/specification/archive-modal/archive-modal.component';
import { UnrchivemodalComponent } from './inventory/assets-category/assest/specification/unrchivemodal/unrchivemodal.component';




@NgModule({
  declarations: [
    DevicesComponent,
    DevicesListComponent,
    SoftwareDetailsComponent,
    AccessoriesDetailsComponent,
    SpecInfoComponent,
    AppComponent,
    NavbarComponent,
    CategoryComponent,
    InventoryComponent,
    LicenseComponent,
    HistoryComponent,
    SpecificationComponent,
    AddDeviceFormComponent,
    AddDeviceModelComponent,
    IdInputComponent,
    AddSoftwareFormComponent,
    CategoryTypeComponent,
    CategoryCardComponent,
    CategoryNameComponent,
    AssignAssetComponent,
    AssignLaptopComponent,
    AssignSoftwareComponent,
    AssignAccessoriesComponent,
    AssetsCategoryComponent,
    HeaderComponent,
    AssestComponent,
    DashboardAssetsComponent,
    SoftwareDetailsComponent,
    AccessoriesDetailsComponent,
    UserNameListComponent,
    SpecInfoComponent,
    DevicesComponent,
    DevicesListComponent,
    LaptopComponent,
    RecentActivityComponent,
    SoftwareComponentComponent,
    FilterSearchListPipe,
    AssignHistoryComponent,
    CommentCardComponent,
    NewSidebarComponent,
    FilterSearchListPipe,
    LaptopDetailsComponent,
    SearchBoxComponent,
    LaptopDetailsComponent,
    AddSoftwareModelComponent,
    UserDetailsComponent,
    UserListComponent,
    EmployeeComponent,
    CurrentdeviceComponent,
    AssetfilterdevicePipe,

    LaptopSearchBoxComponent,
    SoftwareSearchBoxComponent,
    SoftwareVersionSearchBoxComponent,
    AccessoriesSearchBoxComponent,
    AccesoriesComponent,
    CategoryCardComponent,
    FilterPipe,
    DashboardComponent,
    CommentsComponent,
    UserCommentsComponent,
    AddAssetComponent,
    ArchiveModalComponent,
    UnrchivemodalComponent





  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AvatarModule,
    ReactiveFormsModule,
    FormsModule,

 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
