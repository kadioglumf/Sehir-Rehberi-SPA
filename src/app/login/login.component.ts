import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  loginUser: any = {};
  span: boolean = false;

  ngOnInit() {
    this.inputValidator();
  }

  login() {
    this.spinner.show();
    this.authService.login(this.loginUser).pipe(first()).subscribe(data => {
    }, error => {
      this.spinner.hide();
      this.span = true;
    });
  }

  logOut() {
    this.authService.logOut();
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }

  inputValidator() {
    $(document).ready(function () {

      $("input").click(function () {
        $("div").removeClass("span");
      })

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
