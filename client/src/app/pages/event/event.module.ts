import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventRoutingModule} from './event-routing.module';
import { TreasurehuntComponent } from './treasurehunt/treasurehunt.component';
import { IngameComponent } from './treasurehunt/ingame/ingame.component';
import { OverviewComponent } from './treasurehunt/overview/overview.component';
import {FormsModule} from '@angular/forms';

import {EventComponent} from "./events/event.component";
import {RegistrationComponent} from "./registration/registration.component";

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule
  ],
  declarations: [TreasurehuntComponent,
    IngameComponent,
    OverviewComponent,
    EventComponent,
    RegistrationComponent ],
  exports: [
    EventComponent
  ]
})
export class EventModule {
}
