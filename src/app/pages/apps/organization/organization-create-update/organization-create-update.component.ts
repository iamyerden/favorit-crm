import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
import {OrganizationModel} from "../model/organization-model";

@Component({
  selector: 'vex-organization-create-update',
  templateUrl: './organization-create-update.component.html',
  styleUrls: ['./organization-create-update.component.scss']
})
export class OrganizationCreateUpdateComponent implements OnInit {

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
              private dialogRef: MatDialogRef<OrganizationCreateUpdateComponent>,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as OrganizationModel;
    }

    this.form = this.fb.group({
      id: [OrganizationCreateUpdateComponent.id++],
      imageSrc: this.defaults.imageSrc,
      firstName: [this.defaults.firstName || ''],
      lastName: [this.defaults.lastName || ''],
      street: this.defaults.street || '',
      city: this.defaults.city || '',
      zipcode: this.defaults.zipcode || '',
      phoneNumber: this.defaults.phoneNumber || '',
      notes: this.defaults.notes || ''
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createOrganization();
    } else if (this.mode === 'update') {
      this.updateOrganization();
    }
  }

  createOrganization() {
    const customer = this.form.value;

    if (!customer.imageSrc) {
      customer.imageSrc = 'assets/img/avatars/1.jpg';
    }

    this.dialogRef.close(customer);
  }

  updateOrganization() {
    const customer = this.form.value;
    customer.id = this.defaults.id;

    this.dialogRef.close(customer);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
