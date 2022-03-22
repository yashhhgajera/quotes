import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor (private auth:AuthService, private router:Router){}

  canActivate(): boolean{
    if(this.auth.adminLoggedin()){
      return true;
    }else{
      if(this.auth.userLoggedin()){
        this.router.navigate(['user']);
        return false;
      }else{
        this.router.navigate(['./']);
        return false
      }
    }
  }
  
}
