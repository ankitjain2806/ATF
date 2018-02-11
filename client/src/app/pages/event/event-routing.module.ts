import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventComponent} from "./events/event.component";
import {RegistrationComponent} from "./registration/registration.component";
import {TreasurehuntComponent} from "./treasurehunt/treasurehunt.component";
import {OverviewComponent} from "./treasurehunt/overview/overview.component";
import {IngameComponent} from "./treasurehunt/ingame/ingame.component";
import {EventDetailComponent} from "./events/event-details/event-detail.component";

import {EventDetailsResolverService} from "./events/event-details/event-details-resolver.service";
import {EventEndComponent} from "./event-end/event-end.component";
import {EventEndDetailsResolverService} from "./event-end/event-end-resolver.service";
import {FinishedGuardService} from "./event-end/finished-guard.service";

import {CompilerComponent} from "./compiler/compiler.component";
import {CompilerIntroComponent} from "./compiler/compiler-intro/compiler-intro.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'event',
        component: EventComponent,
        data: {title: "Event"}
      },
      {
        path: 'event/:slug',
        component: EventDetailComponent,
        data: {title: "Event Detail", path: 'event/:slug'},
        resolve: {
          event: EventDetailsResolverService
        }
      },
      {
        path: 'event/registration/:slug',
        component: RegistrationComponent,
        data: {title: "Event Registration"},
      },
      {
        path: 'event/treasurehunt/finished',
        component: EventEndComponent,
        data: {title: "Event Completed!", path: 'event/treasurehunt/finished'},
        canActivate: [FinishedGuardService]
      },
      {
        path: 'event/treasurehunt/game',
        data: {title: "Treasure Hunt!", path: 'event/treasurehunt/game'},
        component: IngameComponent
      },
      {
        path: 'event/compiler/game',
        component: CompilerIntroComponent,
        resolve: {
          resources: EventDetailsResolverService
        }
      },
      {
        path: 'event/compiler/run/:resourceId`',
        component: CompilerComponent
      },
    ])
  ],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
