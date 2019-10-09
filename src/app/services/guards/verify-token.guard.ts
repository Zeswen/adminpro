import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {
  constructor(public _userService: UserService, public router: Router) {}
  canActivate(): Promise<boolean> | boolean {
    const token = this._userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expired = this.expired(payload.exp);
    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verifyRenew(payload.exp);
  }

  expired(date: number): boolean {
    const now = new Date().getTime() / 1000;
    return date < now;
  }

  verifyRenew(expDate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(expDate * 1000);
      const now = new Date();
      now.setTime(now.getTime() + 4 * 60 * 60 * 1000);
      if (tokenExp.getTime() > now.getTime()) {
        return resolve(true);
      }
      this._userService
        .renewToken()
        .subscribe(() => resolve(true), () => reject(false));
    });
  }
}
