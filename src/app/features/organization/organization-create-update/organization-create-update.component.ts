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
import {OrganizationsService} from '../../../core/service/organizations.service';
import {OrganizationModel} from '../../../core/models/organization-model';

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
              private fb: FormBuilder,
              private organizationService: OrganizationsService) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as OrganizationModel;
    }

    this.form = this.fb.group({
      id: this.defaults.id,
      name: [this.defaults.name || ''],
      description: [this.defaults.description || ''],
      contacts: this.defaults.contacts || '',
      city: this.defaults.city || '',
      country: this.defaults.country || '',
      address: this.defaults.address || '',
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
    const organization = this.form.value;
    if (organization.contacts === '') { organization.contacts = null; }
    //debugger;
    this.organizationService.createOrganizations(organization).subscribe(res => {
      console.log(res, ' << res');
    });

    this.dialogRef.close(organization);
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
