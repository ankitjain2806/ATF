import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module'
import {DashboardComponent} from "./dashboard.component";
import {DashboardService} from "./dashboard.service";
import {DashboardResolverService} from "./dashboard-resolver.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgbModule,
    NgbModule.forRoot(),
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService,
    DashboardResolverService
  ]
})
export class DashboardModule {
}
