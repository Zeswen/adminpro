import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { UploadFileService } from '../upload-file/upload-file.service';
import { UserService } from '../user/user.service';
import { Hospital } from '../../models/hospital.model';
import { BASE_URL } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
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

  loadHospitals(from: number = 0, limit: number = 5) {
    const url = `${BASE_URL}/hospitals?from=${from}&limit=${limit}`;
    return this.http.get(url);
  }

  getHospital(_id: string) {
    const url = `${BASE_URL}/hospital/${_id}`;
    return this.http.get(url);
  }

  searchHospitals(term: string) {
    const url = `${BASE_URL}/search/hospitals/${term}`;
    return this.http.get(url);
  }

  createHospital(name: string) {
    const url = `${BASE_URL}/hospital?token=${this.token}`;
    return this.http.post(url, { name, user: this.user_id }).pipe(
      map(() => {
        swal(
          'Hospital created',
          `The hospital ${name} was successfully created.`,
          'success'
        );
        return true;
      })
    );
  }

  updateHospital(hospital: Hospital) {
    const url = `${BASE_URL}/hospital/${hospital._id}?token=${this.token}`;
    return this.http.put(url, hospital).pipe(
      map(() => {
        swal(
          'Hospital updated',
          `The hospital ${name} was successfully updated.`,
          'success'
        );
        return true;
      })
    );
  }

  deleteHospital(_id: string) {
    const url = `${BASE_URL}/hospital/${_id}?token=${this.token}`;
    return this.http.delete(url).pipe(
      map(() => {
        swal(
          'Hospital deleted',
          'The hospital was successfully deleted.',
          'success'
        );
        return true;
      })
    );
  }
}
