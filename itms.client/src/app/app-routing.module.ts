import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EmployeeComponent } from './employee/employee.component';
import { LicenseComponent } from './license/license.component';
import { HistoryComponent } from './history/history.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { DevicesListComponent } from './inventory/assets-category/assest/devices/devices-list/devices-list.component';
import { DevicesComponent } from './inventory/assets-category/assest/devices/devices.component';
import { SoftwareComponent } from './software/software.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { ManageAccessComponent } from './manage-access/manage-access.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect empty path to 'dashboard'

  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'software', component: SoftwareComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'manage-access', component: ManageAccessComponent },
  { path: 'add-asset', component: AddAssetComponent },
  { path: 'assign-asset', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'api/Device/:cygId', component: InventoryComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
