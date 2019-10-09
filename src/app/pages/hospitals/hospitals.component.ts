import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {
  hospitals: Hospital[] = [];
  from: number = 0;
  loading: boolean = false;
  totalHospitals: number = 0;
  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notification.subscribe(() => {
      this.loadHospitals();
    });
  }

  loadHospitals() {
    this.loading = true;
    this._hospitalService.loadHospitals(this.from).subscribe((res: any) => {
      const { hospitals, totalHospitals } = res.data;
      this.hospitals = hospitals;
      this.totalHospitals = totalHospitals;
      this.loading = false;
    });
  }

  searchHospitals(term: string) {
    if (!term) {
      return this.loadHospitals();
    }
    this.loading = true;
    this._hospitalService.searchHospitals(term).subscribe((res: any) => {
      const { hospitals, totalHospitals } = res.data;
      this.hospitals = hospitals;
      this.totalHospitals = totalHospitals;
      this.loading = false;
    });
  }

  createHospital() {
    swal({
      title: 'Create a hospital',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Name'
        }
      },
      buttons: {
        confirm: { text: 'Create' }
      }
    }).then(name => {
      if (!name) return;
      this._hospitalService
        .createHospital(name)
        .subscribe(() => this.loadHospitals());
    });
  }

  saveHospital(hospital: Hospital) {
    this._hospitalService.updateHospital(hospital).subscribe();
  }

  deleteHospital(hospital: Hospital) {
    swal({
      title: `Are you sure you want to delete ${hospital.name}?`,
      text: 'Once deleted, you will not be able to recover this hospital!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this._hospitalService.deleteHospital(hospital._id).subscribe(() => {
          if (this.from >= this.totalHospitals - 1) {
            this.from = this.totalHospitals - 1 - 5;
          }
          this.loadHospitals();
        });
      }
    });
  }

  paginate(value: number) {
    const from = this.from + value;
    if (from >= this.totalHospitals || from < 0) {
      return;
    }
    this.from = from;
    this.loadHospitals();
  }

  showModal(_id: string) {
    this._modalUploadService.showModal('hospitals', _id);
  }
}
