import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.scss']
})
export class UserBlogComponent implements OnInit {


  blogList: any | null;
  user: any;
  accountData:any;

  constructor(
    private blog: BlogService, 
    private auth: AuthService, 
    private account : AccountsService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.showBlog();
  }
  
  showBlog() {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res.data;
    });
    let accId: any;
    this.route.paramMap.subscribe((params: ParamMap) => {
      accId = params.get('id');
    })
    this.account.getAccounts().subscribe((res: any) => {
      this.accountData = res.data.find((u: any) => {
        return u._id == accId
      });
    });
    this.blog.getuserBlog(accId).subscribe((res: any) => {
      this.blogList = res.data;
    })
  }
}
