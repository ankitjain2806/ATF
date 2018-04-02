import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from "../../shared/util/auth-guard.service";

import {RegistrationComponent} from "./registration/registration.component";
import {TreasurehuntComponent} from "./treasurehunt/treasurehunt.component";
import {OverviewComponent} from "./treasurehunt/overview/overview.component";
import {IngameComponent} from "./treasurehunt/ingame/ingame.component";
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
import {HackathonRegistrationComponent} from "./hackathon/hackathon-registration/hackathon-registration.component";
import {HackathonTeamComponent} from "./hackathon/hackathon-team/hackathon-team.component";
import {CounterStrikeRegistrationComponent} from "./counter-strike/counter-strike-registration/counter-strike-registration.component";
import {CounterStrikeHomeComponent} from "./counter-strike/counter-strike-home/counter-strike-home.component";
import {HackathonRegistrationResolver} from './hackathon/hackathon-registration/hackathon-registration-resolver.service'
import {HackathonTeamResolver} from "./hackathon/hackathon-team/hackathon-team.resolver.service";

import {TechTalkHomeComponent} from "./tech-talk/tech-talk-home/tech-talk-home.component";
import {TechTalkTopicsComponent} from "./tech-talk/tech-talk-topics/tech-talk-topics.component";
import {TechTalkTopicsResolverService} from "./tech-talk/tech-talk-topics/tech-talk-topics-resolver.service";

@NgModule({
  imports: [
    RouterModule.forChild([
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
        path: 'techtalks',
        component: TechTalkHomeComponent,
        data: {title: "Tech Talks"}
      },
      {
        path: 'compiler/intro',
        component: CompilerIntroComponent,
        canActivate: [AuthGuardService],
        data: {title: "Compiler Intro"},
        resolve: {
          resources: CompilerIntroResolverService
        }
      },
      {
        path: 'hackathon/registration',
        component: HackathonRegistrationComponent,
        canActivate: [AuthGuardService],
        data: {title: "Hackathon Registration"},
        resolve: {
          team: HackathonRegistrationResolver
        }
      },
      {
        path: 'hackathon/my-team',
        component: HackathonTeamComponent,
        canActivate: [AuthGuardService],
        data: {title: "Hackathon Team"},
        resolve: {
          teams: HackathonTeamResolver
        }
      },
      {
        path: 'treasurehunt/game',
        data: {title: "Treasure Hunt!", path: 'treasurehunt/game'},
        canActivate: [AuthGuardService],
        component: IngameComponent
      },
      {
        path: 'techtalks/topics',
        data: {title: "Tech Talks Topics"},
        canActivate: [AuthGuardService],
        component: TechTalkTopicsComponent,
        resolve: {
          topics: TechTalkTopicsResolverService
        }
      },
      {
        path: 'event/registration/:slug',
        component: RegistrationComponent,
        canActivate: [AuthGuardService],
        data: {title: "Event Registration"},
      },
      {
        path: 'event/finished/:eventName',
        component: EventEndComponent,
        canActivate: [AuthGuardService],
        data: {title: "Event Completed!", path: 'event/treasurehunt/finished'},
      },
      {
        path: 'compiler/solve/:resourceId',
        component: CompilerComponent,
        canActivate: [AuthGuardService],
        resolve: {
          resource: CompilerResolverService
        }
      },
      {
        path: 'event/hackathon/complete-registration',
        canActivate: [AuthGuardService],
        component: HackathonComponet
      },
      {
        path: 'event/counterstrike/registration',
        canActivate: [AuthGuardService],
        component: CounterStrikeRegistrationComponent
      },
      {
        path: 'event/counterstrike/home',
        canActivate: [AuthGuardService],
        component: CounterStrikeHomeComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
