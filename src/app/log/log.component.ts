import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LogService } from './log.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit , OnDestroy {

  loginError: string = null;
  registerError: string = null;

  constructor(private logService: LogService, private route: Router) {

    this.logService.getRegisterError().subscribe(
      (registerErr) => this.registerError = registerErr
    );

    this.logService.getLoginError().subscribe(
      (loginErr) => this.loginError = loginErr
    );

  }


  ngOnInit() {
    this.loginError = '' ;
    this.registerError = '';
  }

  ngOnDestroy() {


    this.loginError = '' ;
    this.registerError = '';
  }



  SubmitRegister(registerData: NgForm) {
    this.logService.onRegister( registerData.value );
    this.logService.registerErr.subscribe(
      (error) => this.registerError = error
    );
  }

  SubmitLogin(login: NgForm ) {
   this.logService.onLogin( login.value );
   this.logService.loginErr.subscribe(
     (text) =>  this.loginError = text
   );
  }



}

