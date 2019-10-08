import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { DoctorService, HospitalService } from '../../services/service.index';
import { Doctor } from '../../models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {
  hospitals: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _doctorService: DoctorService,
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      const _id = params['_id'];
      if (_id !== 'new') {
        this.loadDoctor(_id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService
      .loadHospitals(0, 100)
      .subscribe((res: any) => (this.hospitals = res.data.hospitals));
    this._modalUploadService.notification.subscribe((res: any) => {
      this.doctor.img = res.data.value.img;
    });
  }

  loadDoctor(_id: string) {
    this._doctorService.loadDoctor(_id).subscribe(doctor => {
      this.doctor = doctor;
      this.doctor.hospital = doctor.hospital._id;
      this.doctor.user = doctor.user._id;
      this.updateHospital(this.doctor.hospital);
    });
  }

  createDoctor(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._doctorService.createDoctor(this.doctor).subscribe(doctor => {
      this.doctor._id = doctor._id;
      this.router.navigate(['/doctor', doctor._id]);
    });
  }

  updateHospital(_id: string) {
    this._hospitalService
      .getHospital(_id)
      .subscribe(({ data: hospital }: any) => (this.hospital = hospital));
  }

  updatePhoto() {
    this._modalUploadService.showModal('doctors', this.doctor._id);
  }
}
