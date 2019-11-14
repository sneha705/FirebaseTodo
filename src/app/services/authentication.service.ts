import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState=new BehaviorSubject<any>(false);
  constructor() { }
 
  public setUserAuth(data){
    this.authState.next(data);
  }
  isAuthenticated() {
    return this.authState.asObservable();
  }
}

