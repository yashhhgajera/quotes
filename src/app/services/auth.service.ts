import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id:any;
  private registerAPI = "http://localhost:4040/api/users/signup";
  private loginAPI = "http://localhost:4040/api/auth/login";
  private userRoleAPI = "http://localhost:4040/api/userRole"

  constructor(private http:HttpClient) { }

  getUserRole(){
    return this.http.get(this.userRoleAPI);
  }

  adminRole(){
    let aid;
    this.getUserRole().subscribe((res:any)=>{
      // let id = res.data.listRole.find((role:any)=>{
      //   return role.userRoleName==='admin';

      // })
      // console.log(id)
      aid=res;
    
      console.log("uid", aid);
    }); 
    return aid;
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
