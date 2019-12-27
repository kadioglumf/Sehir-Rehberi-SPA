import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { 

  }

  loginUser:any ={};

  ngOnInit() {
    this.inputValidator();
  }

  login(){
    this.authService.login(this.loginUser);
  }

  logOut(){
    this.authService.logOut();
  }

  get isAuthenticated(){
    return this.authService.loggedIn();
  }
  

  inputValidator() {
    $(document).ready(function () {
      $("input").keyup(function () {
        const id = $(this).attr("id");
        var value = $(this).val();
        if (id === "email") {
          if (value.includes("@")) {
            $(this).removeClass("input error").addClass("input");
          }
          else {
            $(this).addClass("input error");
          }
        }
        
        else if (id === "password") {
          if (value.length < 8) {
            $(this).addClass("input error");
          }
          else {
            $(this).removeClass("input error").addClass("input");

          }
        }

      });
    });
  }

}
