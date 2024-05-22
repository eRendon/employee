import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { LayoutComponent } from './layout/layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { EmployeeComponent } from './components/employee/employee.component'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    EmployeeListComponent,
    DashboardComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    EmployeeComponent
  ],
  exports: [
    EmployeeListComponent,
    DashboardComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
