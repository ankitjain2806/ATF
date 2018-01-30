import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module'

import {DashboardComponent} from "./dashboard.component";

import {DashboardService} from "./dashboard.service";

import {EventModule} from "../event/event.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    EventModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule {
}
