import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {UserService} from '../services/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService)

  let user = userService.getUser()
  if (user) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
    })
  }

  return next(req).pipe(
    // catchError((error) => {
    //   if (error.status === 403) {
    //     userService.purgeAuth()
    //   }
    //   return throwError(() => error)})
  );
};
