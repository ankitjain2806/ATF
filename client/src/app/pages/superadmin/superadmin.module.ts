import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuperAdminRoutingModule} from './superadmin-routing.module'
import {SuperAdminComponent} from "./superadmin.component";
import {DashboardService} from "../dashboard/dashboard.service";
import {SuperAdminService} from "./superadmin.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SuperAdminComponent
  ],
  providers: [
    SuperAdminService
  ]
})
export class SuperadminModule {
}
