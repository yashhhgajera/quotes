import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginAPI = "http://localhost:4040/api/auth/login";
  private userRoleAPI = "http://localhost:4040/api/userRole";
  private userAPI = "http://localhost:4040/api/users/";


  constructor(
    private http: HttpClient,
    private google: SocialAuthService,
  ) { }

  getUserRole() {
    return this.http.get(this.userRoleAPI);
  }
  getUser() {
    return this.http.get(`${this.userAPI}auth`);
  }
  createUser(data: any) {
    return this.http.post<any>(`${this.userAPI}signup`, data);
  }
  loginUser(data: any) {
    return this.http.post<any>(this.loginAPI, data);
  }
  userLoggedin() {
    return localStorage.getItem('userRoleName') === 'user';
  }
  adminLoggedin() {
    return localStorage.getItem('userRoleName') === 'admin';
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getOtp(email: any) {
    return this.http.post<any>(`${this.userAPI}sendOtp`, email);
  }
  resetPassword(data: any) {
    return this.http.post<any>(`${this.userAPI}forgatePassword`, data);
  }

  googlesignin(data:any){
    return this.http.post(`${this.userAPI}googleLogin`,data);
  }
  signinwithGoogle() {
    return this.google.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOutGoogle() {
    return this.google.signOut();
  }
}
