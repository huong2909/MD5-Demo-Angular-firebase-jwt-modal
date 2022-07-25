import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {first} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              ) { }

  ngOnInit(): void {

  }
    login(){
    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;

      this.authenticationService.login(username,password)
        .pipe(first())
        .subscribe(
          data => {
            if (data.status == 202) {
              // @ts-ignore
              document.getElementById("status").innerHTML = 'Login Failed! Please try again!'
              return
            }
            localStorage.setItem('ACCESS_TOKEN', data.accessToken);
            localStorage.setItem('ROLE', data.roles[0].authority);
            localStorage.setItem('USERNAME', data.username);
            localStorage.setItem('USERID', data.id);
              console.log(data)
            console.log(data.roles[0])
              // console.log("đăng nhập thành công")
            if (data.roles[0] == "USER") {
              this.router.navigate(['/wallet']);
            }
            else {
              this.router.navigate(['/wallet']);
            }

          },
          error => {
            alert("Tài khoản của bạn sai mật khẩu!");
          });
    }
}
