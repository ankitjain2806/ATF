import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventAdminComponent} from "./event/event.component";
import {UserAdminComponent} from "./user/user.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'superadmin/event',
        component: EventAdminComponent,
        data: {title: "SuperAdmin"}
      },
      {
        path: 'superadmin/user',
        component: UserAdminComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule {
}
