import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventComponent} from "./events/event.component";
import {RegistrationComponent} from "./registration/registration.component";
import {TreasurehuntComponent} from "./treasurehunt/treasurehunt.component";
import {OverviewComponent} from "./treasurehunt/overview/overview.component";
import {IngameComponent} from "./treasurehunt/ingame/ingame.component";
import {EventDetailComponent} from "./events/event-details/event-detail.component";

// import {EventDetailsResolverService} from "./events/event-details/event-details-resolver.service";
import {EventEndComponent} from "./event-end/event-end.component";
import {EventEndDetailsResolverService} from "./event-end/event-end-resolver.service";
import {FinishedGuardService} from "./event-end/finished-guard.service";
import {CompilerIntroResolverService} from "./compiler/compiler-intro/compiler-intro-resolver.service";

import {CompilerComponent} from "./compiler/compiler.component";
import {CompilerIntroComponent} from "./compiler/compiler-intro/compiler-intro.component";
import {CompilerResolverService} from "./compiler/compiler-resolver.service";

import {CompilerHomeComponent} from "./compiler/compiler-home/compiler-home.component";
import {TreasurehuntHomeComponent} from "./treasurehunt/treasurehunt-home/treasurehunt-home.component";
import {HackathonHomeComponent} from "./hackathon/hackathon-home/hackathon-home.component";
import {HackathonComponet} from "./hackathon/hackathon.componet";
import {HackathonTeamInfoComponet} from "./hackathon/hackathon-team-detail/hackathon-team-info.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'event',
        component: EventComponent,
        data: {title: "Event"}
      },
      {
        path: 'compiler',
        component: CompilerHomeComponent,
        data: {title: "Compiler"}
      },
      {
        path: 'treasurehunt',
        component: TreasurehuntHomeComponent,
        data: {title: "Treasure Hunt"}
      },
      {
        path: 'hackathon',
        component: HackathonHomeComponent,
        data: {title: "Hackathon"}
      },
      {
        path: 'compiler/intro',
        component: CompilerIntroComponent,
        resolve: {
          resources: CompilerIntroResolverService
        }
      },
      {
        path: 'hackathon/registration',
        component: HackathonHomeComponent,
        data: {title: "Hackathon"}
      },
      {
        path: 'event/registration/:slug',
        component: RegistrationComponent,
        data: {title: "Event Registration"},
      },
      /*{
        path: 'event/treasurehunt/finished',
        component: EventEndComponent,
        data: {title: "Event Completed!", path: 'event/treasurehunt/finished'},
        canActivate: [FinishedGuardService]
      },*/
      /*{
        path: 'event/treasurehunt/game',
        data: {title: "Treasure Hunt!", path: 'event/treasurehunt/game'},
        component: IngameComponent
      },*/
      {
        path: 'compiler/solve/:resourceId',
        component: CompilerComponent,
        resolve: {
          resource: CompilerResolverService
        }
      },
      {
        path: 'event/hackathon/complete-registration',
        component: HackathonComponet
      },
      {
        path: 'event/hackathon/teamInfo/:teamId',
        component: HackathonTeamInfoComponet
      }
    ])
  ],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
