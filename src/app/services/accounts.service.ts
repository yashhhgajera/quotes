import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private accountsAPI = "http://localhost:4040/api/users/";

  constructor(private http:HttpClient) { }

  getAccounts(){
    return this.http.get(this.accountsAPI);
  }

  follow(accountId:any,userId:any){
    return this.http.put(`${this.accountsAPI+accountId}/follow`,userId);
  }

  unfollow(accountId:any,userId:any){
    return this.http.put(`${this.accountsAPI+accountId}/unfollow`,userId);
  }
}
