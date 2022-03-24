import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  isValid: boolean = true;
  resetPassword = this.fb.group({
    email:['',
      [
        Validators.email,
        Validators.required
      ]],
    password:['',
      [
        Validators.required,
        // Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
      ]],
    otp: ['',
        [
          Validators.required,
    ]]
      
  });

  constructor(private auth:AuthService, private modalService: BsModalService, public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-md' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {id: 2, class: 'second' });
  }
  // closeFirstModal() {
  //   if (!this.modalRef) {
  //     return;
  //   }
 
  //   this.modalRef.hide();
  //   this.modalRef = null;
  // }
  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  otp(){
    let req = {
      "email":this.resetPassword.value.email
    }
    this.auth.getOtp(req).subscribe((res:any)=>{
      console.log(res.data.user.otp);
      this.bsModalRef?.hide();
    })
    
  }

  
  setPassword(){
    this.bsModalRef?.hide()
    this.auth.resetPassword(this.resetPassword.value).subscribe(()=>{
      this.bsModalRef = this.modalService.show(LoginComponent);
      this.closeModal(1);
    })
  }
}
