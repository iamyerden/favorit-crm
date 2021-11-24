import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import {NbModel} from '../model/nb.model';

@Component({
    selector: 'vex-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

    static id = 100;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    icMoreVert = icMoreVert;
    icClose = icClose;

    icPrint = icPrint;
    icDownload = icDownload;
    icDelete = icDelete;

    icPerson = icPerson;
    icMyLocation = icMyLocation;
    icLocationCity = icLocationCity;
    icEditLocation = icEditLocation;
    icPhone = icPhone;

    constructor(@Inject(MAT_DIALOG_DATA) public item: any,
                private dialogRef: MatDialogRef<ItemDetailComponent>,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        if (this.item) {
            this.mode = 'update';
        } else {
            this.item = {} as NbModel;
            console.log('this.ite111m:', this.item);
        }
        console.log('this.item:', this.item);
    }

    save() {
        if (this.mode === 'create') {
            this.createCustomer();
        } else if (this.mode === 'update') {
            this.updateCustomer();
        }
    }

    createCustomer() {
        const item = this.form.value;

        if (!item.imageSrc) {
            item.imageSrc = 'assets/img/avatars/1.jpg';
        }

        this.dialogRef.close(item);
    }

    updateCustomer() {
        const item = this.item;
        item.id = this.item.id;

        this.dialogRef.close(item);
    }

    isCreateMode() {
        return this.mode === 'create';
    }

    isUpdateMode() {
        return this.mode === 'update';
    }

}
