import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../core/rest.service";
import {Router} from "@angular/router";
import {SessionService} from "../../../core/session.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    user: any = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }
    isValid: boolean;
    availableEmail: boolean;
    isRequireAlertVisible: boolean;



  constructor(private restService: RestService,
              private router: Router,
              private sessionService: SessionService) {
  }

  ngOnInit() {

  }

  isAvailableEmail(){
      this.restService.prepareTypedEmail({"email" : `${this.user.email}`})
          .subscribe(
            (data: any) => {
              const bool: boolean = JSON.parse(data.isFree);
              this.prepareForRegistration(bool);
            }
          );
  }

  prepareForRegistration(bool){
    console.log(bool);
    if(!bool){
      this.registerUser();
    }else{
      this.availableEmail = false;
    }
  }
  registerUser(){
      console.log(JSON.stringify(this.user));
        if(this.isValid){
            this.restService.registerUser(JSON.stringify(this.user))
                .subscribe(
                    (data: any) => {
                        this.user.id = data.id;
                        this.sessionService.setCurrentUser(this.user);
                        console.log(this.sessionService.getCurrentUser().id)
                        this.router.navigateByUrl('/user');
                    }
                );
        }
  }

  isValidInput(){
      console.log(this.user.firstName)
      if(this.user.firstName == '' || this.user.lastName == '' || this.user.email == '' || this.user.password == ''){
          this.isValid = false;
      }else{
          this.isValid = true;
      }

  }

}
