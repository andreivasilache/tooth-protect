import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { LogComponent } from './log/log.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchedulerComponent } from './scheduler/scheduler.component';

import { SchedulerModule } from './scheduler/scheduler.module';
import { UserModel } from './shared/user.model';
import { LogService } from './log/log.service';
import { SchedulerModel } from './shared/schedule.model';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { DoctorsComponent } from './doctors/doctors.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LogComponent,
    DoctorsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    SchedulerModule,
  ],
  providers: [LogService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
