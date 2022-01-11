import {Component, Inject, OnInit} from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoryService} from '../../../../core/service/category.service';
import {CategoryModel} from '../../../../core/models/category.model';

@Component({
    selector: 'vex-category-create-update',
    templateUrl: './category-create-update.component.html',
    styleUrls: ['./category-create-update.component.scss']
})
export class CategoryCreateUpdateComponent implements OnInit {

    form: FormGroup;
    mode: 'create' | 'update' = 'create';
    allCategories;

    // icMoreVert = icMoreVert;
    icClose = icClose;

    // icPrint = icPrint;
    // icDownload = icDownload;
    // icDelete = icDelete;

    // icPerson = icPerson;
    // icMyLocation = icMyLocation;
    icEditLocation = icEditLocation;

    // icPhone = icPhone;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<CategoryCreateUpdateComponent>,
                private fb: FormBuilder,
                private categoryService: CategoryService) {
    }

    ngOnInit() {
        if (this.data && this.data.categoryModel) {
            this.mode = 'update';
        } else {
            this.data.categoryModel = {} as CategoryModel;
        }

        this.form = this.fb.group({
            id: [this.data.categoryModel.id],
            parentId: [this.data.categoryModel.parentId],
            name: [this.data.categoryModel.name]
        });
        this.getData();
    }

    save() {
        const category = this.form.value;

        this.categoryService.createCategory(category).subscribe(res => {
            this.dialogRef.close(category);
        }, error => {
            console.log('Error occurred creating category :: ', error);
        });
    }

    isCreateMode() {
        return this.mode === 'create';
    }

    isUpdateMode() {
        return this.mode === 'update';
    }

    getData() {
        this.allCategories = this.data.all.filter(message =>
            this.mode === 'create' || (message.id !== this.data.categoryModel.id));
    }

}
