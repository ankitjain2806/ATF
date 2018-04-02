import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventAdminComponent} from "./event/event.component";
import {UserAdminComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {ResourceComponent} from "./resource/resource.component";
import {HackathonComponent} from "./event/hackathon/hackathon.component";
import {HackathonTeamInfoComponent} from "./event/hackathon-team-detail/hackathon-team-info.component"
import {AuthGuardService} from "app/shared/util/auth-guard.service";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'superadmin',
        component: AdminComponent,
        data: {title: "Admin"}
      },
      {
        path: 'superadmin/event',
        component: EventAdminComponent,
        data: {title: "Events"}
      },
      {
        path: 'superadmin/user',
        component: UserAdminComponent
      },
      {
        path: 'superadmin/add-resource',
        component: ResourceComponent,
        data: {title: "Add Resource"},
      },
      {
        path: 'superadmin/hackathon-register-users-detail',
        component: HackathonComponent,
        data: {title: "Hackathon Registered Users Detail"},
      },
      {
        path: 'superadmin/hackathon/teamInfo/:teamId',
        canActivate: [AuthGuardService],
        component: HackathonTeamInfoComponent,
        data: {title: "Hackathon Team Details"},
      }
    ])
  ],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule {
}
