import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from 'daypilot-pro-angular';
import { DataService } from '../data.service';
import { LogService } from '../log/log.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'scheduler-component',
  templateUrl: './scheduler.component.html',
  styles: [``]
})
export class SchedulerComponent implements AfterViewInit , OnInit {

  authTest: string = this.auth.isAuthenticanted() ? 'Save' : 'Please log in..';

  serverSchedulesFetchedData ;


  constructor( private ds: DataService, private auth: LogService, private router: Router ) {
  }



  @ViewChild('scheduler')
  scheduler: DayPilotSchedulerComponent;

  toSaveData: any[] = [];


  events: any[] = [];

  config: any = {
    treeEnabled: true,
    timeHeaders: [{'groupBy': 'Month'}, {'groupBy': 'Day', 'format': 'd'}],
    scale: 'Day',
    days: 31,
    startDate: '2018-10-01',
    onTimeRangeSelected: args => {
      const dp = this.scheduler.control;
      DayPilot.Modal.prompt('Create a new event:', 'Event 1').then(function(modal) {
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add(new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          resource: args.resource,
          text: modal.result
        }));
      });

    },
    eventMoveHandling: 'Update',
    onEventMoved: args => {
      this.scheduler.control.message('Event moved');
    },

    eventResizeHandling: 'Update',
    onEventResized: args => {
      console.log(args);
      this.scheduler.control.message('Event resized');
    },

    eventDeleteHandling: 'Update',
    onEventDeleted: args => {
      // return deleted element
      this.scheduler.control.message('Event deleted');
    }
  };


  ngAfterViewInit(): void {

    this.ds.getResources().subscribe(result => this.config.resources = result);

    const from = this.scheduler.control.visibleStart();
    const to = this.scheduler.control.visibleEnd();

    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });

     // send a request to get schedules if the user is logged
     if (this.auth.isAuthenticanted()) {
        this.ds.showDataOnInit().subscribe(
          (response) => {

            this.serverSchedulesFetchedData = response;

            this.ds.events = this.serverSchedulesFetchedData.userSchedules;

            this.config.dp.update();
          }
        );
    }
  }

  onSave() {

     this.ds.saveNewScheduleOnDB(this.events).subscribe(

       ( response ) => {

        this.router.navigate(['/schedule']);

       }

     );

  }


  userIsAuth() {
    return this.auth.isAuthenticanted();
  }

  ngOnInit() {

      // send a request to get schedules if the user is logged
      if (this.auth.isAuthenticanted()) {

        this.ds.showDataOnInit().subscribe(

          (response) => {

            this.serverSchedulesFetchedData = response;
            this.ds.events = this.serverSchedulesFetchedData.userSchedules;


            this.config.dp.update();

            this.router.navigate(['/schedule']);

          }

        );

      }

 }

}
