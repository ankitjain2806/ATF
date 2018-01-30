import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeService} from './home.service'
import {HomeRoutingModule} from './home-routing.module';

import {HomeComponent} from "./home.component";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule {
}
