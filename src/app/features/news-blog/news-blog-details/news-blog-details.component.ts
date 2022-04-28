import { Component, OnInit } from '@angular/core';
import {NewsAndBlogsService} from '../../../core/service/news-and-blogs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../core/service/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {NewsStatusReasonDialogComponent} from './news-status-reason-dialog/news-status-reason-dialog.component';
import {Tournament} from '../../../core/models/tournament.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Group} from '../../../core/models/group.model';
import {ApplicationsService} from '../../../core/service/applications.service';

@Component({
  selector: 'vex-news-blog-details',
  templateUrl: './news-blog-details.component.html',
  styleUrls: ['./news-blog-details.component.scss']
})
export class NewsBlogDetailsComponent implements OnInit {
  applicationId: string;
  tournament: Tournament;
  tournamentId: string;
  username: string;
  publishedDate: Date;

  groupColumns: string[] = ['id', 'ageGroup', 'weight', 'belt'];
  manGroupDataSource: Group[] = [];
  womanGroupDataSource: Group[] = [];

  constructor(
      private newsBlogsService: NewsAndBlogsService,
      private applicationsService: ApplicationsService,
      private route: ActivatedRoute,
      private authService: AuthService,
      private router: Router,
      public dialog: MatDialog,
      private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.defineNewsAndBlogs();
  }

  defineNewsAndBlogs(): void {
    this.route.paramMap.subscribe(params => {
      this.applicationId = params.get('id');

      this.applicationsService.getByIdApplication(this.applicationId).subscribe(res => {
        this.tournamentId = res.objectId;
        this.newsBlogsService.getByIdTournament(this.tournamentId).subscribe(res2 => {
          this.tournament = res2;
          console.log('this.tournament', this.tournament);

          this.username = this.tournament.author.email;
          this.publishedDate = this.tournament.createdAt;
          this.manGroupDataSource = this.tournament?.reglament?.groupList.filter(t => t.gender === 'MAN');
          this.womanGroupDataSource = this.tournament?.reglament?.groupList.filter(t => t.gender === 'WOMAN');
          console.log('manGroupDataSource:', this.manGroupDataSource[0].ageGroup);
        });
      });
    });
  }

  approvedNewsAndBlogs() {
    this.newsBlogsService.updateNewsStatus(this.tournamentId, 'APPROVED', '', this.authService.currentUserValue.username)
        .subscribe(res => {
          this.tournament = res;
    });
  }

  approveTournament() {
    this.newsBlogsService.approveTournament(this.tournamentId).subscribe(res => {
      console.log('res:', res);
      this.openSnackBar('Соренование было подверждено');
      this.navigateBack();
    });
  }

  rejectTournament() {
    this.newsBlogsService.declineTournament(this.tournamentId).subscribe(res => {
      console.log('res:', res);
      this.openSnackBar('Соренование было отклонено');
      this.navigateBack();
    });
  }

  rejectedNewsAndBlogs() {
    const newsStatusDialogRef = this.dialog.open(NewsStatusReasonDialogComponent);
    newsStatusDialogRef.afterClosed().subscribe(res => {
      console.log(res);

      if (!res?.cancel && res?.data?.reason && res?.data?.reason.trim()) {
        const reason = res.data.reason;

        this.newsBlogsService.updateNewsStatus(this.tournamentId, 'REJECTED', reason, this.authService.currentUserValue.username)
            .subscribe(res2 => {
              this.tournament = res2;
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

        this.newsBlogsService.updateNewsStatus(this.tournamentId, 'MODIFIED', reason, this.authService.currentUserValue.username)
            .subscribe(res2 => {
              this.tournament = res2;
            });
      }
    });
  }

  substringDate(string) {
    return string.substring(0, 19);
  }

  openSnackBar(message) {
    this.snackbar.open(message, null, {
      duration: 5000
    });
  }

  navigateBack() {
    this.router.navigate(['/applications/tournament']);
  }
}
