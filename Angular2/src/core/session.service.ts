import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
    user: any = {};
    isLogged = false;

    constructor() {
    }

    setCurrentUser(user){
        this.user = user;
        this.isLogged = true;
    }
    getCurrentUser(){
        return this.user;
    }


}
