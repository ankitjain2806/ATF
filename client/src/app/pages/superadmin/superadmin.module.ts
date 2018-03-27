import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuperAdminRoutingModule} from './superadmin-routing.module'
import {SuperAdminService} from "./superadmin.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventAdminComponent} from "./event/event.component";
import {UserAdminComponent} from "./user/user.component";
import {BrowserModule} from "@angular/platform-browser";
import {ResourceComponent} from "./resource/resource.component";
import {AdminComponent} from "./admin/admin.component";
import {HackathonComponent} from "./event/hackathon/hackathon.component";
import {HackathonTeamInfoComponent} from "./event/hackathon-team-detail/hackathon-team-info.component";

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  declarations: [
    EventAdminComponent,
    UserAdminComponent,
    ResourceComponent,
    AdminComponent,
    HackathonComponent,
    HackathonTeamInfoComponent
  ],
  providers: [
    SuperAdminService
  ]
})
export class SuperAdminModule {
}
