import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  loginData:boolean
  constructor(
    public authService:AuthenticationService,
    private router: Router
    
  ) {this.authService.isAuthenticated().subscribe
    (data=>this.loginData = data) }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginData) {
      //alert("authgaurd "+this.loginData)
        return true;    
    }
      this.router.navigateByUrl("/login");;
      return false;
  }
}
