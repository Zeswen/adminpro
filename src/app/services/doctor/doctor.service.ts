import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { UploadFileService } from '../upload-file/upload-file.service';
import { UserService } from '../user/user.service';
import { Doctor } from '../../models/doctor.model';
import { BASE_URL } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  user_id: string;
  token: string;
  constructor(
    public http: HttpClient,
    public _uploadFileService: UploadFileService,
    public _userService: UserService
  ) {
    this.user_id = _userService.user._id;
    this.token = _userService.token;
  }

  loadDoctors(from: number) {
    const url = `${BASE_URL}/doctors?from=${from}`;
    return this.http.get(url);
  }

  getDoctor(_id: string) {
    const url = `${BASE_URL}/doctor/${_id}`;
    return this.http.get(url);
  }

  searchDoctors(term: string) {
    const url = `${BASE_URL}/search/doctors/${term}`;
    return this.http.get(url);
  }

  createDoctor(doctor: Doctor) {
    if (doctor._id) {
      return this.updateDoctor(doctor);
    }
    const url = `${BASE_URL}/doctor?token=${this.token}`;
    return this.http.post(url, { ...doctor, user: this.user_id }).pipe(
      map((res: any) => {
        swal(
          'Doctor created',
          `The doctor ${name} was successfully created.`,
          'success'
        );
        return res.data.ops[0];
      })
    );
  }

  updateDoctor(doctor: Doctor) {
    const url = `${BASE_URL}/doctor/${doctor._id}?token=${this.token}`;
    return this.http.put(url, doctor).pipe(
      map((res: any) => {
        swal(
          'Doctor updated',
          `The doctor ${name} was successfully updated.`,
          'success'
        );
        return res.data.value;
      })
    );
  }

  deleteDoctor(_id: string) {
    const url = `${BASE_URL}/doctor/${_id}?token=${this.token}`;
    return this.http.delete(url).pipe(
      map(() => {
        swal(
          'Doctor deleted',
          'The doctor was successfully deleted.',
          'success'
        );
        return true;
      })
    );
  }

  loadDoctor(_id: string) {
    const url = `${BASE_URL}/doctor/${_id}`;
    return this.http.get(url).pipe(map((res: any) => res.data));
  }
}
