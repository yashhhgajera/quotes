import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ], 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
})
export class AuthModule { }
