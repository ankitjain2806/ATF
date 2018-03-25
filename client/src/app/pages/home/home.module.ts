import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeService} from './home.service'
import {HomeRoutingModule} from './home-routing.module';

import {HomeComponent} from "./home.component";
import {DashboardResolverService} from "../dashboard/dashboard-resolver.service";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeService,
    DashboardResolverService
  ]
})
export class HomeModule {
}
