import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventRoutingModule} from './event-routing.module';
import {TreasurehuntComponent} from './treasurehunt/treasurehunt.component';
import {IngameComponent} from './treasurehunt/ingame/ingame.component';
import {OverviewComponent} from './treasurehunt/overview/overview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AceEditorModule} from 'ng2-ace-editor';

import {RegistrationComponent} from "./registration/registration.component";
import {CompilerComponent} from "./compiler/compiler.component";
import {CompilerIntroComponent} from "./compiler/compiler-intro/compiler-intro.component";

import {EventService} from "./event.service";
import {TreasurehuntService} from "./treasurehunt/treasurehunt.service";
import {EventEndComponent} from './event-end/event-end.component';
import {EventEndDetailsResolverService} from "./event-end/event-end-resolver.service";
import {FinishedGuardService} from "./event-end/finished-guard.service";
import {CompilerIntroResolverService} from "./compiler/compiler-intro/compiler-intro-resolver.service";
import {CompilerResolverService} from "./compiler/compiler-resolver.service";
import {CompilerService} from "./compiler/compiler.service";

import {CompilerHomeComponent} from "./compiler/compiler-home/compiler-home.component";
import {TreasurehuntHomeComponent} from "./treasurehunt/treasurehunt-home/treasurehunt-home.component";
import {HackathonHomeComponent} from "./hackathon/hackathon-home/hackathon-home.component";
import {HackathonComponet} from "./hackathon/hackathon.componet";
import {HackathonRegistrationComponent} from "./hackathon/hackathon-registration/hackathon-registration.component";
import {CounterStrikeRegistrationComponent} from "./counter-strike/counter-strike-registration/counter-strike-registration.component";
import {CounterStrikeHomeComponent} from "./counter-strike/counter-strike-home/counter-strike-home.component";
import {HackathonRegistrationResolver} from './hackathon/hackathon-registration/hackathon-registration-resolver.service'
import {HackathonTeamComponent} from "./hackathon/hackathon-team/hackathon-team.component";
import {HackathonTeamResolver} from "./hackathon/hackathon-team/hackathon-team.resolver.service";
import {TechTalkHomeComponent} from "./tech-talk/tech-talk-home/tech-talk-home.component";
import {TechTalkComponent} from "./tech-talk/tech-talk.component";
import {TechTalkTopicsComponent} from "./tech-talk/tech-talk-topics/tech-talk-topics.component";
import {TechTalkTopicsResolverService} from "./tech-talk/tech-talk-topics/tech-talk-topics-resolver.service";
import {TechTalkService} from './tech-talk/tech-talk.service';
@NgModule({
  imports: [
    NgbModule,
    NgbModule.forRoot(),
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
    RegistrationComponent,
    CompilerComponent,
    CompilerIntroComponent,
    EventEndComponent,
    CompilerHomeComponent,
    TreasurehuntHomeComponent,
    HackathonHomeComponent,
    HackathonComponet,
    HackathonRegistrationComponent,
    CounterStrikeRegistrationComponent,
    CounterStrikeHomeComponent,
    HackathonTeamComponent,
    TechTalkHomeComponent,
    TechTalkComponent,
    TechTalkTopicsComponent
  ],
  providers: [
    EventService,
    TreasurehuntService,
    FinishedGuardService,
    CompilerIntroResolverService,
    CompilerResolverService,
    CompilerService,
    HackathonRegistrationResolver,
    HackathonTeamResolver,
    TechTalkTopicsResolverService,
    TechTalkService
  ]
})
export class EventModule {
}
