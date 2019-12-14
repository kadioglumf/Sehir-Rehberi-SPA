import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable({
  providedIn: 'root'
})
export class AuthHtppInterceptorService implements HttpInterceptor{

constructor() { }

intercept(req: HttpRequest<any>, next: HttpHandler) {

  if (localStorage.getItem('token')) {
    req = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + localStorage.getItem('token'))})
  }

  return next.handle(req);

}

}
