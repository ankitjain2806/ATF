import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuperAdminRoutingModule} from './superadmin-routing.module'
import {SuperAdminService} from "./superadmin.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventAdminComponent} from "./event/event.component";
import {UserAdminComponent} from "./user/user.component";

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EventAdminComponent,
    UserAdminComponent
  ],
  providers: [
    SuperAdminService
  ]
})
export class SuperAdminModule {
}
