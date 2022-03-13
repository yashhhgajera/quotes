import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerAPI = "http://localhost:4040/api/users/signup";
  private loginAPI = "http://localhost:4040/api/auth/login";

  constructor(private http:HttpClient) { }

  createUser(data:any){
    return this.http.post<any>(this.registerAPI,data);
  }
  loginUser(data:any){
    return this.http.post<any>(this.loginAPI,data);
  }
  loggedin(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
