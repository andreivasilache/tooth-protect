import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/log/log.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUserName: string ;

  constructor(private authService: LogService) { }

  ngOnInit() {
    this.authService.loggedUser.subscribe(
      (gotUser) => {
       return this.currentUserName = gotUser.name + ' ' + gotUser.firstName ;
      }
      // (gotUser) => console.log(gotUser.name + ' ' + gotUser.firstName)

    );
  }

  userIsAuth() {
    return this.authService.isAuthenticanted();
  }

  logOut() {
    this.authService.logOut();
  }



}
