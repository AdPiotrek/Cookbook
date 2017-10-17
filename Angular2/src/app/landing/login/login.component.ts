import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../../core/session.service";
import {RestService} from "../../../core/rest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    email: '',
    password: ''
  };
  goodLogin: boolean;

  constructor(private sessionService: SessionService,
              private restService: RestService,
              private router: Router) { }

  ngOnInit() {
  }

  isGoodLogin(){
    console.log(JSON.stringify(this.user))
    this.restService.isGoodLogin(JSON.stringify(this.user))
        .subscribe((data: any) => {
            this.goodLogin = JSON.parse(data.isExist);
            console.log(this.goodLogin);
            if(this.goodLogin)
            {
              this.logIn(this.user);
            }
        });
  }

  logIn(user){
    this.restService.logIn(JSON.stringify(user))
        .subscribe(
            (data: any)=> this.user = data,
            () => {},
            () => {
              this.sessionService.setCurrentUser(this.user);
              this.router.navigateByUrl('/user');

            }
        )
  }

}
