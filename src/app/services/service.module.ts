import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  HospitalService,
  DoctorService,
  UploadFileService,
  ModalUploadService,
  LoginGuard,
  AdminGuard,
  VerifyTokenGuard
} from './service.index';

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    HospitalService,
    UploadFileService,
    ModalUploadService,
    DoctorService,
    LoginGuard,
    AdminGuard,
    VerifyTokenGuard
  ],
  imports: [CommonModule, HttpClientModule]
})
export class ServiceModule {}
