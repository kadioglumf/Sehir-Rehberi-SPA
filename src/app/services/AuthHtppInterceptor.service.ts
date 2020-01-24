import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable({
  providedIn: 'root'
})
export class AuthHtppInterceptorService implements HttpInterceptor{

constructor(private authService:AuthService) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  if (localStorage.getItem('token')) {
    req = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + localStorage.getItem('token'))});
    
  }

  return next.handle(req);

//   return next.handle(req).pipe(catchError(err => {
//     if (err.status === 401) {
//         // auto logout if 401 response returned from api
//         //this.authService.logOut();
//         //location.reload(true);
//     }
    
//     const error = err.error.message || err.statusText;
//     return throwError(error);
// }))



  
}

}
