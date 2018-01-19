import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeService} from './home.service'
import {HomeRoutingModule} from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [],
  providers: [
    HomeService
  ]
})
export class HomeModule {
}
