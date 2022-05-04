import { Component, OnInit } from '@angular/core';
import { CanonicalService } from './services/canonical.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  <lib-ng-toast></lib-ng-toast>
  `,
})
export class AppComponent implements OnInit{
  constructor(private canonicalService: CanonicalService,
              private metaTag: Meta,
              private titleTag: Title ){}
  title = 'quotes';
  ngOnInit() {
    this.canonicalService.setCanonicalURL();

    this.titleTag.setTitle("Quotes");
      this.metaTag.addTags([
          { name: 'description', content: "Quotes" },
          { name: 'keywords', content: 'blog | quotes | ideas '},
          { name: 'robots', content: 'index, follow' },
          { name: 'title', content: "Quotes | Blogs | Blog" },
          { property: 'og:title', content: "Quotes | blogs | blog" },
          // { property: 'og:type', content: 'article' },
          { property: 'og:site_name', content: 'Quotes' },
          // { name: 'author', content: this.blogList[0].userId.fullName },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          // { property: "article:published_time", content: this.blogList[0].createdAt },
          { charset: 'UTF-8' },
          // { property: 'og:url', content:'https://www.quotes.in/'+ this.blogList[0].blogTitle},
          // { name: 'url', content:'https://www.quotes.in/'+ this.blogList[0].blogTitle},
      ]);
  }
}
