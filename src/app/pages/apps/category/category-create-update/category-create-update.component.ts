import {Component, Inject, OnInit} from '@angular/core';
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
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrganizationModel} from "../../organization/model/organization-model";
import {CategoryService} from "../../../../service/category.service";
import {CategoryModel} from "../model/category.model";
import {Observable} from "rxjs";

@Component({
  selector: 'vex-category-create-update',
  templateUrl: './category-create-update.component.html',
  styleUrls: ['./category-create-update.component.scss']
})
export class CategoryCreateUpdateComponent implements OnInit {

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

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<CategoryCreateUpdateComponent>,
              private fb: FormBuilder,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as CategoryModel;
    }

    this.form = this.fb.group({
      // id: [CategoryCreateUpdateComponent.id++],
      parentId: [this.defaults.parentId || ''],
      name: [this.defaults.name || ''],
      logoId: [this.defaults.logoId || '']
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createCategory();
    } else if (this.mode === 'update') {
      this.updateCategory();
    }
  }

  createCategory() {

    const category = this.form.value;
    console.log('---- Creating category ---- ')
    console.log(category)

    this.categoryService.createCategory(category).subscribe(res => {
      console.log('Created successfully :: ' , res)
    }, error => {
      console.log('Error occurred creating category :: ' , error)
    });

    this.dialogRef.close(category);
  }

  updateCategory() {
    const customer = this.form.value;
    console.log('Updating customer :: ')
    console.log(customer)

    this.dialogRef.close(customer);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
