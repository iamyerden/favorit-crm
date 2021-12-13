import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrganizationModel} from "../../organization/model/organization-model";
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
import {CategoryModel} from "../model/category.model";

@Component({
  selector: 'vex-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

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
              private dialogRef: MatDialogRef<CategoryDetailComponent>,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.item) {
      this.mode = 'update';
    } else {
      this.item = {} as CategoryModel;
    }
    console.log('this.item:', this.item);
  }

  save() {
    if (this.mode === 'create') {
      this.createCategory();
    } else if (this.mode === 'update') {
      this.updateCategory();
    }
  }

  createCategory() {
    const item = this.form.value;

    if (!item.imageSrc) {
      item.imageSrc = 'assets/img/avatars/1.jpg';
    }

    this.dialogRef.close(item);
  }

  updateCategory() {
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
