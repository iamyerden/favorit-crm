import { Component, OnInit } from '@angular/core';
import {NewsAndBlogs} from '../../../core/models/news-and-blogs.model';
import {NewsAndBlogsService} from '../../../core/service/news-and-blogs.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../core/service/auth.service';

@Component({
  selector: 'vex-news-blog-details',
  templateUrl: './news-blog-details.component.html',
  styleUrls: ['./news-blog-details.component.scss']
})
export class NewsBlogDetailsComponent implements OnInit {
  newsAndBlogs: NewsAndBlogs;
  newsAndBlogsId: string;

  constructor(
      private newsBlogsService: NewsAndBlogsService,
      private route: ActivatedRoute,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.defineNewsAndBlogs();
  }

  defineNewsAndBlogs(): void {
    this.route.paramMap.subscribe(params => {
      this.newsAndBlogsId = params.get('id');

      this.newsBlogsService.getByIdNewsAndBlog(this.newsAndBlogsId).subscribe(resNewsAndBlogs => {
        this.newsAndBlogs = resNewsAndBlogs;
      });
    });
  }

  approvedNewsAndBlogs() {
    this.newsBlogsService.updateNewsStatus(this.newsAndBlogsId, 'APPROVED', this.authService.currentUserValue.username)
        .subscribe(resNewsAndBlogs => {
          this.newsAndBlogs = resNewsAndBlogs;
        });
  }
}
