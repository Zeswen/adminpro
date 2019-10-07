import { Injectable } from '@angular/core';
import swal from 'sweetalert';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../config/constants';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
  ) {
    this.loadFromStorage();
  }

  isLoggedIn() {
    return this.token.length > 5;
  }

  saveToStorage(_id: string, token: string, user: User) {
    localStorage.setItem('_id', _id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  loadFromStorage() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.token = token;
      this.user = JSON.parse(user);
    } else {
      this.token = '';
      this.user = null;
    }
  }

  removeFromStorage() {
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = '';
    this.user = null;
  }

  logout() {
    this.removeFromStorage();
    this.router.navigate(['/login']);
  }

  googleLogin(token: string) {
    const url = `${BASE_URL}/login/google`;
    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.saveToStorage(res.data._id, res.data.token, res.data);
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
        this.saveToStorage(res.data._id, res.data.token, res.data);
        return res.data;
      })
    );
  }

  createUser(user: User) {
    const url = `${BASE_URL}/register`;

    return this.http.post(url, user).pipe(
      map((res: any) => {
        swal('User created', user.email, 'success');
        return res.data.ops[0];
      })
    );
  }

  updateUser(user: User) {
    const url = `${BASE_URL}/user/${user._id}?token=${this.token}`;
    return this.http.put(url, user).pipe(
      map((res: any) => {
        const mongoUser: User = res.data.value;
        this.saveToStorage(mongoUser._id, this.token, mongoUser);
        swal('User updated', user.name, 'success');
        return true;
      })
    );
  }

  updateImage(file: File, id: string) {
    this._uploadFileService
      .uploadFile(file, 'users', id)
      .then((res: any) => {
        console.log(res)
        const mongoUser: any = res.data.value;
        this.user.img = mongoUser.img;
        swal('Image updated', this.user.name, 'success');
        this.saveToStorage(mongoUser._id, this.token, this.user);
        return true;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
