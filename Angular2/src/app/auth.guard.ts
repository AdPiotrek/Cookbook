import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {SessionService} from "../core/session.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.sessionService.isLogged){
      return true;
    }else{
      this.router.navigateByUrl('/registration');
    }
  }
}
