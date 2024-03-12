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
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';
import { ManageAccessGuard } from './guards/manage-access.guard';
import { LoginRedirectGuard } from './guards/login-redirect.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect empty path to 'dashboard'

  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [LoginGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [LoginGuard] },
  { path: 'accessories', component: AccessoriesComponent, canActivate: [LoginGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate: [LoginGuard] },
  { path: 'software', component: SoftwareComponent, canActivate: [LoginGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [LoginGuard] },
  { path: 'manage-access', component: ManageAccessComponent, canActivate: [LoginGuard, ManageAccessGuard] },
  { path: 'add-asset', component: AddAssetComponent, canActivate: [LoginGuard] },
  { path: 'assign-asset', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'api/Device/:cygId', component: InventoryComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
