import { Injectable } from '@angular/core';
import { LoginUser } from '../models/LoginUser';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt'
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router, private alertifyService: AlertifyService) { }

  path = "https://city-guide-01.herokuapp.com/";
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";
  USER_ID = "userId";

  // login(loginUser: LoginUser){
  //   let headers = new HttpHeaders;
  //   headers = headers.append("Content-Type", "application/json");
  //   this.httpClient.post(this.path + "login", loginUser, { headers: headers })
  //     .subscribe(data => {
  //       this.saveToken(JSON.stringify(data));
  //       this.saveUserId(JSON.stringify(data));
  //       this.alertifyService.success("Giriş Başarıyla Yapıldı");
  //       this.router.navigateByUrl('city');
  //     });

  // }


  login(loginUser: LoginUser){
    let headers = new HttpHeaders;
    headers = headers.append("Content-Type", "application/json");
    return this.httpClient.post<any>(this.path + "login", loginUser, { headers: headers })
      .pipe(map(data => {
        this.saveToken(JSON.stringify(data));
        this.saveUserId(JSON.stringify(data));
        this.alertifyService.success("Giriş Başarıyla Yapıldı");
        this.router.navigateByUrl('city');
      }));

  }


  register(registerUser: RegisterUser){
    let headers = new HttpHeaders;
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + 'register', registerUser, { headers: headers })
      .subscribe(data => {
        this.saveToken(JSON.stringify(data));
        this.saveUserId(JSON.stringify(data));
        this.alertifyService.success("Sisteme giriş yapıldı");
        this.router.navigateByUrl('city')
      })
  }

  saveToken(data) {
    let saveToken = JSON.parse(data)
    localStorage.setItem(this.TOKEN_KEY, saveToken.token)

  }

  saveUserId(data){
    let userId = JSON.parse(data)
    localStorage.setItem(this.USER_ID,userId.id)
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('city');
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }

  get token(){
    
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get userId(){
    return Number(localStorage.getItem('userId'));
  }

  loggedInn(){
    return !!localStorage.getItem(this.TOKEN_KEY); 
  }
}
