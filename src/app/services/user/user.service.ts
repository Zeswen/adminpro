import { Injectable } from '@angular/core';
import swal from 'sweetalert';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../config/constants';

import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
  ) {
    this.loadFromStorage();
  }

  renewToken() {
    const url = `${BASE_URL}/login/renewToken?token=${this.token}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        this.token = res.data;
        localStorage.setItem('token', this.token);
        return true;
      }),
      catchError(err => {
        this.router.navigate(['/login']);
        swal(
          'Error renewing token',
          'Could not renew your auth token',
          'error'
        );
        return throwError(err);
      })
    );
  }

  isLoggedIn() {
    return this.token.length > 5;
  }

  saveToStorage(_id: string, token: string, user: User, menu: any) {
    localStorage.setItem('_id', _id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.token = token;
    this.user = user;
    this.menu = menu;
  }

  loadFromStorage() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const menu = localStorage.getItem('menu');
    if (token && user) {
      this.token = token;
      this.user = JSON.parse(user);
      this.menu = JSON.parse(menu);
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  removeFromStorage() {
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this.token = '';
    this.user = null;
    this.menu = [];
  }

  logout() {
    this.removeFromStorage();
    this.router.navigate(['/login']);
  }

  googleLogin(token: string) {
    const url = `${BASE_URL}/login/google`;
    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.saveToStorage(
          res.data._id,
          res.data.token,
          res.data,
          res.data.menu
        );
        return res.data;
      })
    );
  }

  login(user: User, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = `${BASE_URL}/login`;
    return this.http.post(url, user).pipe(
      map((res: any) => {
        this.saveToStorage(
          res.data._id,
          res.data.token,
          res.data,
          res.data.menu
        );
        return res.data;
      }),
      catchError(err => {
        swal('Error logging in', err.error.error, 'error');
        return throwError(err);
      })
    );
  }

  createUser(user: User) {
    const url = `${BASE_URL}/register`;

    return this.http.post(url, user).pipe(
      map((res: any) => {
        swal('User created', user.email, 'success');
        return res.data.ops[0];
      }),
      catchError(err => {
        swal('Error signing up', 'Email already in use', 'error');
        return throwError(err);
      })
    );
  }

  updateUser(user: User) {
    const url = `${BASE_URL}/user/${user._id}?token=${this.token}`;
    return this.http.put(url, user).pipe(
      map((res: any) => {
        if (user._id === this.user._id) {
          const mongoUser: User = res.data.value;
          this.saveToStorage(mongoUser._id, this.token, mongoUser, this.menu);
        }
        swal('User updated', user.name, 'success');
        return true;
      }),
      catchError(err => {
        swal('Error updating user', err.error.error, 'error');
        return throwError(err);
      })
    );
  }

  updateImage(file: File, id: string) {
    this._uploadFileService
      .uploadFile(file, 'users', id)
      .then((res: any) => {
        console.log(res);
        const mongoUser: any = res.data.value;
        this.user.img = mongoUser.img;
        swal('Image updated', this.user.name, 'success');
        this.saveToStorage(mongoUser._id, this.token, this.user, this.menu);
        return true;
      })
      .catch(err => {
        console.error(err);
      });
  }

  loadUsers(from: number) {
    const url = `${BASE_URL}/users?from=${from}`;
    return this.http.get(url);
  }

  searchUsers(term: string) {
    const url = `${BASE_URL}/search/users/${term}`;
    return this.http.get(url);
  }

  deleteUser(_id: string) {
    const url = `${BASE_URL}/user/${_id}?token=${this.token}`;
    return this.http.delete(url).pipe(
      map(() => {
        swal('User deleted', 'The user was successfully deleted.', 'success');
        return true;
      })
    );
  }
}
