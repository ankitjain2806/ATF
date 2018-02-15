import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventRoutingModule} from './event-routing.module';
import {TreasurehuntComponent} from './treasurehunt/treasurehunt.component';
import {IngameComponent} from './treasurehunt/ingame/ingame.component';
import {OverviewComponent} from './treasurehunt/overview/overview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AceEditorModule} from 'ng2-ace-editor';

import {EventComponent} from "./events/event.component";
import {RegistrationComponent} from "./registration/registration.component";
import {CompilerComponent} from "./compiler/compiler.component";
import {CompilerIntroComponent} from "./compiler/compiler-intro/compiler-intro.component";

import {EventService} from "./event.service";
import {EventDetailComponent} from "./events/event-details/event-detail.component";
import {TreasurehuntService} from "./treasurehunt/treasurehunt.service";
import {EventDetailsResolverService} from "./events/event-details/event-details-resolver.service";
import {EventEndComponent} from './event-end/event-end.component';
import {EventEndDetailsResolverService} from "./event-end/event-end-resolver.service";
import {FinishedGuardService} from "./event-end/finished-guard.service";
import {CompilerIntroResolverService} from "./compiler/compiler-intro/compiler-intro-resolver.service";
import {CompilerResolverService} from "./compiler/compiler-resolver.service";
import {CompilerService} from "./compiler/compiler.service";

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AceEditorModule
  ],
  declarations: [
    TreasurehuntComponent,
    IngameComponent,
    OverviewComponent,
    EventComponent,
    RegistrationComponent,
    EventDetailComponent,
    CompilerComponent,
    CompilerIntroComponent,
    EventEndComponent
  ],
  exports: [
    EventComponent
  ],
  providers: [
    EventService,
    TreasurehuntService,
    EventDetailsResolverService,
    FinishedGuardService,
    CompilerIntroResolverService,
    CompilerResolverService,
    CompilerService
  ]
})
export class EventModule {
}
