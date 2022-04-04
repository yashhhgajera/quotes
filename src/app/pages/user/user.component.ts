import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  admin = false;

  constructor(
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    if(this.auth.adminLoggedin()){
      this.admin = true    
    }else{
      this.admin = false
    }
  }

}
