import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard, AdminGuard } from '../services/service.index';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progress' }
      },
      {
        path: 'charts1',
        component: Charts1Component,
        data: { title: 'Charts' }
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Settings' }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Profile' }
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Promises' }
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { title: 'RxJs' }
      },
      {
        path: 'search/:term',
        component: SearchComponent,
        data: { title: 'Search' }
      },
      // Admin
      {
        path: 'users',
        canActivate: [AdminGuard],
        component: UsersComponent,
        data: { title: 'Admin Users' }
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: { title: 'Admin Hospitals' }
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        data: { title: 'Admin Doctors' }
      },
      {
        path: 'doctor/:_id',
        component: DoctorComponent,
        data: { title: 'Update Doctor' }
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
