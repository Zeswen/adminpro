import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/config/constants';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];
  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    activatedRoute.params.subscribe(params => {
      const { term } = params;
      this.search(term);
    });
  }

  ngOnInit() {
  }

  search(term: string) {
    const url = `${BASE_URL}/search/all/${term}`;
    this.http.get(url).subscribe((res: any) => {
      const { users, hospitals, doctors } = res.data;
      this.users = users;
      this.hospitals = hospitals;
      this.doctors = doctors;
    console.log(this.users.length, this.hospitals.length, this.doctors.length);
    });
  }
}
