import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private auth:AuthService, private router:Router){}

  canActivate(): boolean{
    if(this.auth.userLoggedin() || this.auth.adminLoggedin()){
      return true;
    }else{
      this.router.navigate(['./']);
      return false;
    }
  }
}
