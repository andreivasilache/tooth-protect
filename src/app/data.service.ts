import {Injectable} from '@angular/core';
import {DayPilot} from 'daypilot-pro-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { LogService } from './log/log.service';

@Injectable()
export class DataService {

  updateScheduleData = [];

  serverUrl = 'https://tooth-protect.herokuapp.com';

  eventsGotFromDB:  Subject<any> = new Subject();

  resources: any[] = [

    { name: '08:00', id: '8' },
    { name: '09:00', id: '9' },
    { name: '10:00', id: '10' },
    { name: '11:00', id: '11' },
    { name: '12:00', id: '12' },
    { name: '13:00', id: '13' },
    { name: '14:00', id: '14' },
    { name: '15:00', id: '15' },
    { name: '16:00', id: '16' },
    { name: '17:00', id: '17' },
    { name: '18:00', id: '18' },

];



events: any[] = [
  {
    id: '1',
    resource: '8',
    start: '2018-10-03',
    end: '2018-10-03',
    text: 'Walk little pug',
  },
];


  saveNewScheduleOnDB(events) {

    const headers = new HttpHeaders({'Authorization': this.authService.getToken()});

    const loggedUser = this.authService.loggedUserEmail;


    return this.http.post(this.serverUrl + '/api/updateSchedule', {

      updateSchedule: events,
      userEmail: loggedUser
    }, {
      headers: headers,
    });

  }

  showDataOnInit() {

    const headers = new HttpHeaders({'Authorization': this.authService.getToken()});

    const loggedUser = this.authService.loggedUserEmail;

     return this.http.post( this.serverUrl + '/api/getSchedules', {

      loggedUser: loggedUser
     }, {
        headers: headers
      });

  }


  constructor(private http: HttpClient,
              private authService: LogService) {}


  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {

      setTimeout(() => {
        observer.next(this.events);
      }, 200);

    });

  }

  getResources(): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {

      setTimeout(() => {
        observer.next(this.resources);
      }, 2000);

    });

  }

}
