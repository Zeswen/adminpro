import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  from: number = 0;
  loading: boolean = false;
  totalUsers: number = 0;
  constructor(
    public _userService: UserService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this._modalUploadService.notification.subscribe(res => {
      this.loadUsers();
    });
  }

  loadUsers() {
    this.loading = true;
    this._userService.loadUsers(this.from).subscribe((res: any) => {
      const { users, totalUsers } = res.data;
      this.totalUsers = totalUsers;
      this.users = users;
      this.loading = false;
    });
  }

  paginate(value: number) {
    const from = this.from + value;
    if (from >= this.totalUsers || from < 0) {
      return;
    }
    this.from = from;
    this.loadUsers();
  }

  searchUser(term: string) {
    if (term.length <= 0) {
      this.loadUsers();
      return;
    }
    this.loading = true;
    this._userService.searchUsers(term).subscribe((res: any) => {
      const { users, totalUsers } = res.data;
      this.totalUsers = totalUsers;
      this.users = users;
      this.loading = false;
    });
  }

  deleteUser(user: User) {
    if (user._id === this._userService.user._id) {
      swal('Cannot delete user', 'You cannot delete your own user.', 'error');
      return;
    }
    swal({
      title: `Are you sure you want to delete ${user.name}?`,
      text: 'Once deleted, you will not be able to recover this user!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this._userService.deleteUser(user._id).subscribe(() => {
          if (this.from >= this.totalUsers - 1) {
            this.from = this.totalUsers - 1 - 5;
          }
          this.loadUsers();
        });
      }
    });
  }

  saveUser(user: User) {
    this._userService.updateUser(user).subscribe();
  }

  showModal(_id: string) {
    this._modalUploadService.showModal('users', _id);
  }
}
