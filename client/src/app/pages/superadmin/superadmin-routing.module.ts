import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventAdminComponent} from "./event/event.component";
import {UserAdminComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {ResourceComponent} from "./resource/resource.component";

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
        data: {title: "SuperAdmin"}
      },
      {
        path: 'superadmin/user',
        component: UserAdminComponent
      },
      {
        path: 'superadmin/add-resource',
        component: ResourceComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule {
}
