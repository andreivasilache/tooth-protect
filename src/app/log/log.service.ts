import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  loggedUser: Subject<any> = new Subject();

  loggedUserName: string;
  loggedUserEmail: string;

  registerErr: Subject<any> = new Subject();
  loginErr: Subject<any> = new Subject();

  localStorageToken: string;
  token ; // load the current token there

  serverUrl = 'https://tooth-protect.herokuapp.com';





  constructor(private http: HttpClient, private route: Router ) { }

 onRegister(registerData) {
  let gotValues: any;


  this.http.post(this.serverUrl + '/auth/register', registerData)
    .subscribe(
      response => {
         gotValues = response;
      },
       err => {
        this.registerErr.next(err.error.msg);
      }
     );

 }

 onLogin(loginData) {
  let data: any;

  this.http.post(this.serverUrl + '/auth/login', loginData)
    .subscribe(
      response => {
        data = response;

        this.token = data.token;

        this.loggedUser.next(data.currentUser.user);

        this.loggedUserEmail = data.currentUser.user.email;

        localStorage.setItem('jwtToken', data.token);

        this.route.navigate(['/home']);

      }, err => {
        this.loginErr.next(err.error.msg);
      }
    );

    // this.loggedUser = data.currentUser.user;

 }



 autoLogin() {

  const headers = new HttpHeaders({'Authorization': this.getToken()});
   this.http.post(this.serverUrl + '/api/loginOnRender', 'a', {headers: headers})
   .subscribe(res => console.log(res),
              err => console.log(err));

 }

 getToken() {
   // update token with local stoarage value
   this.token = localStorage.getItem('jwtToken');
   //  return it
   return this.token;
 }

 getLoginError(): Subject<string> {
   return this.loginErr;
 }

 getRegisterError(): Subject<string> {
  return this.registerErr;
 }

 getCurrentUserName() {
    return this.loggedUserName;
  }

 isAuthenticanted() {
    return this.token != null;
 }

 logOut() {
  this.token = null;
 }

}
