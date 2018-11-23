import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogComponent } from './log/log.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { DoctorsComponent } from './doctors/doctors.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login-register', component: LogComponent },
  { path: 'schedule', component: SchedulerComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
