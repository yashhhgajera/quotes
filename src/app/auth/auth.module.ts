import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AlertService } from '../services/alert.service';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
  ], 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService,AlertService],
})
export class AuthModule { }
