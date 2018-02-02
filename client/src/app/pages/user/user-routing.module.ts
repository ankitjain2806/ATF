import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserComponent} from './user.component'
import {ProfileComponent} from './profile/profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user',
        component: UserComponent,
        data: {title: 'User'}
      },
      {
        path: 'user/profile',
        component: ProfileComponent,
        data: {title: 'Profile'}
      }
    ])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
