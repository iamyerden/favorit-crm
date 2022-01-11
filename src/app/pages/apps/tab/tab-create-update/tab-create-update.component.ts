import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import icClose from '@iconify/icons-ic/twotone-close';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TabService} from "../../../../core/service/tab.service";
import {TabModel} from "../../../../core/models/tab.model";

@Component({
    selector: 'vex-tab-create-update',
    templateUrl: './tab-create-update.component.html',
    styleUrls: ['./tab-create-update.component.scss']
})
export class TabCreateUpdateComponent implements OnInit {

    form: FormGroup;
    mode: 'create' | 'update' = 'create';
    allTabs;

    icClose = icClose;
    icEditLocation = icEditLocation;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<TabCreateUpdateComponent>,
                private fb: FormBuilder,
                private tabService: TabService) {
    }

    ngOnInit() {
        if (this.data && this.data.tabModel) {
            this.mode = 'update';
        } else {
            this.data.tabModel = {} as TabModel;
        }

        this.form = this.fb.group({
            id: [this.data.tabModel.id],
            name: [this.data.tabModel.name]
        });
        this.getData();
    }

    save() {
        if (this.isCreateMode()) {
            console.log('create mod')
            this.createTab();
        } else {
            console.log('update mod')
            this.updateTab();
        }
    }

    createTab() {
        const tab = this.form.value;

        this.tabService.createTab(tab).subscribe(res => {

            console.log('saved tab: ' + res)

            this.dialogRef.close(tab);
        }, error => {
            console.log('Error occurred creating tab :: ', error);
        });
    }

    updateTab() {
        const tab = this.form.value;

        this.tabService.updateTab(tab.id, tab).subscribe(res => {

            console.log('updated tab: ' + res)

            this.dialogRef.close(tab);
        }, error => {
            console.log('Error occurred updating tab :: ', error);
        });
    }

    isCreateMode() {
        return this.mode === 'create';
    }

    isUpdateMode() {
        return this.mode === 'update';
    }

    getData() {
        this.allTabs = this.data.all.filter(message =>
            this.mode === 'create');
    }

}
