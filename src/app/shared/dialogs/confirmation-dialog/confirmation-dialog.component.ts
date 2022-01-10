import {Component, Inject, OnInit} from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import icDelete from '@iconify/icons-ic/twotone-delete';

@Component({
    selector: 'vex-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

    icClose = icClose;
    icDelete = icDelete;
    text: string;

    constructor(private dialog: MatDialogRef<ConfirmationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        if (this.data && this.data.text) {
            this.text = this.data.text;
        }
    }

    close(ok: string) {
        this.dialog.close(ok);
    }
}
