import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public toast: NgToastService) { }

  success(msg:string){
    this.toast.success({detail:'Success Message',summary:msg,duration:5000})
  }
  error(msg:string){
    this.toast.error({detail:'Error Message',summary:msg,duration:5000})
  }
  warning(msg:string){
    this.toast.warning({detail:'Warning Message',summary:msg,duration:5000})
  }
  info(msg:string){
    this.toast.info({detail:'Info Message',summary:msg,duration:10000})
  }

}
