import { Injectable } from '@angular/core';
import { LoginUser } from '../models/LoginUser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt'
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router, private alertifyService: AlertifyService) { }

  path = "http://localhost:8080/";
  userId: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";
  USER_ID = "userId";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders;
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + "login", loginUser, { headers: headers })
      .subscribe(data => {
        this.saveToken(JSON.stringify(data));
        this.saveUserId(JSON.stringify(data));
        this.decodedToken = this.jwtHelper.decodeToken(JSON.stringify(data));
        this.alertifyService.success("Giriş Başarıyla Yapıldı");
        this.router.navigateByUrl('city')
      });

  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders;
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + 'register', registerUser, { headers: headers })
      .subscribe(data => {
        this.saveToken(Object.values(data).toString());
        this.decodedToken = this.jwtHelper.decodeToken(Object.values(data).toString());
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
    localStorage.setItem(this.USER_ID,userId.userId)
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY)
  }

  getCurrentUserId(){
    return this.jwtHelper.decodeToken(this.token).nameid;
  }

  get token(){
    
    return localStorage.getItem(this.TOKEN_KEY);
  }
  loggedInn(){
    return !!localStorage.getItem(this.TOKEN_KEY); 
  }
}
