import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User;
  uploadingImg: File;
  tempImg: string;
  constructor(public _userService: UserService) {
    this.user = this._userService.user;
  }

  ngOnInit() {}

  save(user: User) {
    this.user.name = user.name;
    if (!this.user.google) {
      this.user.email = user.email;
    }
    this._userService.updateUser(this.user).subscribe();
  }

  selectImage(file: File) {
    if (!file) {
      return;
    }

    if (!file.type.includes('image')) {
      swal('Only images', 'The selected file is not an image', 'error');
    }

    this.uploadingImg = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => (this.tempImg = reader.result as string);
  }

  updateImage() {
    this._userService.updateImage(this.uploadingImg, this.user._id);
  }
}
