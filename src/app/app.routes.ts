import {Routes} from '@angular/router';
import AuthComponent from './core/auth/auth.component';
import {inject} from '@angular/core';
import {UserService} from './core/_service/user.service';
import {map} from 'rxjs/operators';
import {MovieComponent} from './core/movie/movie.component';
import {PersonComponent} from './core/person/person.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: "register",
    component: AuthComponent,
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: "movie",
    component: MovieComponent,
  },
  {
    path: "person",
    component: PersonComponent,
  },
];
