import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  // Oops
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: 'oops'}, // show the 404 page for any routes that don't exist
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
