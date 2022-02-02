import { Component, OnInit } from '@angular/core';
import {NewsAndBlogs} from '../../../core/models/news-and-blogs.model';
import {NewsAndBlogsService} from '../../../core/service/news-and-blogs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../core/service/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {NewsStatusReasonDialogComponent} from './news-status-reason-dialog/news-status-reason-dialog.component';

@Component({
  selector: 'vex-news-blog-details',
  templateUrl: './news-blog-details.component.html',
  styleUrls: ['./news-blog-details.component.scss']
})
export class NewsBlogDetailsComponent implements OnInit {
  newsAndBlogs: NewsAndBlogs;
  newsAndBlogsId: string;
  username: string;
  publishedDate: Date;

  constructor(
      private newsBlogsService: NewsAndBlogsService,
      private route: ActivatedRoute,
      private authService: AuthService,
      private router: Router,
      public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.defineNewsAndBlogs();
  }

  defineNewsAndBlogs(): void {
    this.route.paramMap.subscribe(params => {
      this.newsAndBlogsId = params.get('id');

      this.newsBlogsService.getByIdNewsAndBlog(this.newsAndBlogsId).subscribe(resNewsAndBlogs => {
        this.newsAndBlogs = resNewsAndBlogs;
        console.log('this.newsAndBlogs', this.newsAndBlogs);

        this.username = this.newsAndBlogs.author.username;
        this.publishedDate = this.newsAndBlogs.publishedDate;
      });
    });
  }

  approvedNewsAndBlogs() {
    this.newsBlogsService.updateNewsStatus(this.newsAndBlogsId, 'APPROVED', '', this.authService.currentUserValue.username)
        .subscribe(resNewsAndBlogs => {
          this.newsAndBlogs = resNewsAndBlogs;
        });
  }

  rejectedNewsAndBlogs() {
    const newsStatusDialogRef = this.dialog.open(NewsStatusReasonDialogComponent);
    newsStatusDialogRef.afterClosed().subscribe(res => {
      console.log(res);

      if (!res?.cancel && res?.data?.reason && res?.data?.reason.trim()) {
        const reason = res.data.reason;

        this.newsBlogsService.updateNewsStatus(this.newsAndBlogsId, 'REJECTED', reason, this.authService.currentUserValue.username)
            .subscribe(resNewsStatus => {
              this.newsAndBlogs = resNewsStatus;
            });
      }
    });
  }

  modifiedNewsAndBlogs() {
    const newsStatusDialogRef = this.dialog.open(NewsStatusReasonDialogComponent);
    newsStatusDialogRef.afterClosed().subscribe(res => {
      console.log(res);

      if (!res?.cancel && res?.data?.reason && res?.data?.reason.trim()) {
        const reason = res.data.reason;

        this.newsBlogsService.updateNewsStatus(this.newsAndBlogsId, 'MODIFIED', reason, this.authService.currentUserValue.username)
            .subscribe(resNewsStatus => {
              this.newsAndBlogs = resNewsStatus;
            });
      }
    });
  }

  navigateBack() {
    this.router.navigate(['/nb']);
  }
}
