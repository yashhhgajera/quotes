import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  accounts:any;
  blogs:any;

  constructor(
    private account:AccountsService,
    private blog:BlogService
  ) { }

  ngOnInit(): void {
    this.account.getAccounts().subscribe((res:any)=>this.accounts=res.data);
    this.blog.getallBlog().subscribe((res:any)=>this.blogs=res.data);
  }

}
