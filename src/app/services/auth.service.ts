import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerAPI = "http://localhost:4040/api/users/signup";
  private loginAPI = "http://localhost:4040/api/auth/login";
  private userRoleAPI = "http://localhost:4040/api/userRole";
  private userAPI = "http://localhost:4040/api/users/auth";

  constructor(private http:HttpClient) { }

  getUserRole(){
    return this.http.get(this.userRoleAPI);
  }
<<<<<<< HEAD
=======

>>>>>>> e850075ba7b88fd56ecd2e8a51a96a209842fc27
  getUser(){
    return this.http.get(this.userAPI);
  }
  createUser(data:any){
    return this.http.post<any>(this.registerAPI,data);
  }
  loginUser(data:any){
    return this.http.post<any>(this.loginAPI,data);
  }
  userLoggedin(){
    return localStorage.getItem('userRoleName')==='user';
  }
  adminLoggedin(){
    return localStorage.getItem('userRoleName')==='admin';
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
