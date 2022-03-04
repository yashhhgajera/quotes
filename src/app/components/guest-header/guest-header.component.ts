import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-header',
  templateUrl: './guest-header.component.html',
  styleUrls: ['./guest-header.component.scss']
})
export class GuestHeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    this.router.navigate(['user']);
  }

}
