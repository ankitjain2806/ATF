import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {EventItemComponent} from './event-item/event-item.component';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    EventItemComponent,
  ],
  providers: []
})
export class DashboardModule {
}
