import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventRoutingModule} from './event-routing.module';
import {TreasurehuntComponent} from './treasurehunt/treasurehunt.component';
import {IngameComponent} from './treasurehunt/ingame/ingame.component';
import {OverviewComponent} from './treasurehunt/overview/overview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {EventComponent} from "./events/event.component";
import {RegistrationComponent} from "./registration/registration.component";

import {EventService} from "./event.service";
import {EventDetailComponent} from "./event-details/event-detail.component";
import {TreasurehuntService} from "./treasurehunt/treasurehunt.service";
import {EventDetailsResolverService} from "./event-details/event-details-resolver.service";
import { EventEndComponent } from './event-end/event-end.component';
import {EventEndDetailsResolverService} from "./event-end/event-end-resolver.service";

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TreasurehuntComponent,
    IngameComponent,
    OverviewComponent,
    EventComponent,
    RegistrationComponent,
    EventDetailComponent,
    EventEndComponent
  ],
  exports: [
    EventComponent
  ],
  providers: [
    EventService,
    TreasurehuntService,
    EventDetailsResolverService
  ]
})
export class EventModule {
}
