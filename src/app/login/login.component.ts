import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rememberMe: boolean = false;
  email: string;
  auth2: any;

  constructor(public router: Router, public _userService: UserService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberMe = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '871954343132-u5ehqm0dtdrfb42n370krhuvvtfs3cgk.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btn-google'));
    });
  }

  attachSignIn(element: any) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      const token = googleUser.getAuthResponse().id_token;
      this._userService
        .googleLogin(token)
        .subscribe(() => (window.location.href = '#/dashboard'));
    });
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const user = new User(null, form.value.email, form.value.password);
    this._userService
      .login(user, form.value.rememberMe)
      .subscribe(() => this.router.navigate(['/dashboard']));
  }
}
