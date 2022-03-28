import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accountData: any = {followers:[],followings:[]};
  user: any;
  blogsCount: any;

  constructor(private account: AccountsService, private route: ActivatedRoute, private blog: BlogService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res.data;
    });
    this.showAccount();
  }

  showAccount() {
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
      this.blogsCount = res.data.length;
    })
  }

  follow(accountId: any) {
    let id = {
      userId: this.user._id
    }
    this.account.follow(accountId, id).subscribe((res: any) => {
      this.showAccount();
    }, err => {
      console.log(err)
    })
  }
  unfollow(accountId: any) {
    let id = {
      userId: this.user._id
    }
    this.account.unfollow(accountId, id).subscribe((res: any) => {
      this.showAccount();
    }, err => {
      console.log(err)
    })
  }
}
