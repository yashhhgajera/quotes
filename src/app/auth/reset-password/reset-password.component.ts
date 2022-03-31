import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert.service';
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
  showPassword: boolean = false;
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

  constructor(
    private auth:AuthService, 
    private modalService: BsModalService, 
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder, 
    public alert:AlertService) { }

  ngOnInit(): void {
  }

  passwordVisibility(){
    this.showPassword = !this.showPassword;
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

  otp(template:any){
    if(this.resetPassword.get('email')?.valid){
      this.isValid = true;
      let req = {
        "email":this.resetPassword.value.email
      }
      this.auth.getOtp(req).subscribe((res:any)=>{
        this.alert.info(res.data.user.otp);
        this.bsModalRef?.hide();
        this.openModal(template);
      },err=>{
        this.alert.error(err.statusText);
      });
    }
    else{
      this.isValid = false
    }
    
  }

  
  setPassword(){
    if(this.resetPassword.valid){
      this.isValid = true;
      this.auth.resetPassword(this.resetPassword.value).subscribe((res:any)=>{
        this.alert.success(res.message)
        this.bsModalRef = this.modalService.show(LoginComponent);
        this.closeModal(1);
      },err=>{
        this.alert.error(err.statusText);
      })
    }
    else{
      this.isValid = false
    }
  }
}
