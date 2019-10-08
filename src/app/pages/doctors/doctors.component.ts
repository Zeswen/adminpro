import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Doctor } from '../../models/doctor.model';
import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  from: number = 0;
  loading: boolean = false;
  totalDoctors: number = 0;
  constructor(
    public _doctorService: DoctorService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.loadDoctors();
    this._modalUploadService.notification.subscribe(() => {
      this.loadDoctors();
    });
  }

  loadDoctors() {
    this.loading = true;
    this._doctorService.loadDoctors(this.from).subscribe((res: any) => {
      const { doctors, totalDoctors } = res.data;
      this.doctors = doctors;
      this.totalDoctors = totalDoctors;
      this.loading = false;
    });
  }

  searchDoctors(term: string) {
    if (!term) {
      return this.loadDoctors();
    }
    this.loading = true;
    this._doctorService.searchDoctors(term).subscribe((res: any) => {
      const { doctors, totalDoctors } = res.data;
      this.doctors = doctors;
      this.totalDoctors = totalDoctors;
      this.loading = false;
    });
  }

  deleteDoctor(doctor: Doctor) {
    swal({
      title: `Are you sure you want to delete ${doctor.name}?`,
      text: 'Once deleted, you will not be able to recover this doctor!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this._doctorService.deleteDoctor(doctor._id).subscribe(() => {
          if (this.from >= this.totalDoctors - 1) {
            this.from = this.totalDoctors - 1 - 5;
          }
          this.loadDoctors();
        });
      }
    });
  }

  paginate(value: number) {
    const from = this.from + value;
    if (from >= this.totalDoctors || from < 0) {
      return;
    }
    this.from = from;
    this.loadDoctors();
  }

  showModal(_id: string) {
    this._modalUploadService.showModal('doctors', _id);
  }
}
