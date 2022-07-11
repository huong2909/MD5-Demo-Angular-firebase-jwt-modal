import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  noUser = {
    message: "user_existed"
  }
  createSuccess = {
    message: "yes"
  }

  userForm: FormGroup = new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    roles: new FormControl(),
  });
  constructor(private userService: AuthenticationService,
              private router: Router,) { }
  ngOnInit(): void {
  }
  submit() {
    const user = this.userForm.value;

    console.log(user)
    this.userService.register(user).subscribe((data) => {
      if (JSON.stringify(data) == JSON.stringify(this.noUser)) {
        // @ts-ignore
        document.getElementById('status').innerHTML = 'The username is existed! Please try again!'
      }
      if (JSON.stringify(data) == JSON.stringify(this.createSuccess)) {
        // @ts-ignore
        document.getElementById('status').innerHTML = 'Create User Account Success!'
        this.router.navigate(['/login']);
      }
      // alert('Thành công');
      // this.router.navigate(['/login']);
    }, error => {
      alert('Lỗi');
    }) ;
  }
}
