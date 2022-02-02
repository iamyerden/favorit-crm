import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'vex-news-status-reason-dialog',
  templateUrl: './news-status-reason-dialog.component.html',
  styleUrls: ['./news-status-reason-dialog.component.scss']
})
export class NewsStatusReasonDialogComponent implements OnInit {
  reasonForm = new FormControl('', [Validators.required]);

  constructor(
      public newsStatusDialogRef: MatDialogRef<NewsStatusReasonDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(cancelStatus: boolean): void {
    const data = {
      cancel: cancelStatus,
      data: {
        reason: this.reasonForm.value
      }
    };

    if (cancelStatus) {
      this.newsStatusDialogRef.close(data);
      return;
    }

    if (this.reasonForm.valid && this.reasonForm.value.trim()) {
      this.newsStatusDialogRef.close(data);
    }
  }

}
