import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';

import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(public _userService: UserService, public router: Router) {}

  checkEquality(field1: string, field2: string) {
    return (group: FormGroup) => {
      const field1Value = group.controls[field1].value;
      const field2Value = group.controls[field2].value;

      if (field1Value === field2Value) {
        return null;
      }
      return {
        areEqual: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.form = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        passwordConfirmation: new FormControl(null, Validators.required),
        terms: new FormControl(false)
      },
      {
        validators: this.checkEquality('password', 'passwordConfirmation')
      }
    );
    this.form.setValue({
      name: 'test',
      email: 'test@test.com',
      password: '123',
      passwordConfirmation: '1234',
      terms: true
    });
  }

  signUp() {
    if (this.form.invalid) {
      return;
    }
    if (!this.form.value.terms) {
      swal('Important', 'You must check the terms and conditions!', 'warning');
    }

    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this._userService.createUser(user).subscribe(res => {
      this.router.navigate(['/login']);
    });
  }
}
