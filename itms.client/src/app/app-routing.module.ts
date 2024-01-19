import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EmployeeComponent } from './employee/employee.component';
import { LicenseComponent } from './license/license.component';
import { HistoryComponent } from './history/history.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { AssignAssetComponent } from './assign-asset/assign-asset.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect empty path to 'dashboard'

  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'licence', component: LicenseComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'add-asset', component: AddAssetComponent },
  { path: 'assign-asset', component: AssignAssetComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
