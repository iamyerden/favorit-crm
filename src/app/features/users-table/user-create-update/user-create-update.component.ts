import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
import {UsersService} from '../../../core/service/users.service';
import {User} from '../../../core/models/user.model';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'vex-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {

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

  roles: Role[] = [
    {value: 'ROLE_USER', viewValue: 'ROLE_USER'},
    {value: 'ROLE_ADMIN', viewValue: 'ROLE_ADMIN'},
    {value: 'ROLE_EMPLOYEE', viewValue: 'ROLE_EMPLOYEE'},
    {value: 'ROLE_SUPER_ADMIN', viewValue: 'ROLE_SUPER_ADMIN'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
              private fb: FormBuilder,
              private userService: UsersService) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as User;
    }

    this.form = this.fb.group({
      id: [this.defaults.id, Validators.required],
      imageSrc: this.defaults.imageSrc,
      username: [this.defaults.username, Validators.required],
      firstName: [this.defaults.firstName || '', Validators.required],
      lastName: [this.defaults.lastName || '', Validators.required],
      about: this.defaults.about || '',
      language: this.defaults.language || '',
      email: [this.defaults.email || '', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: this.defaults.password || '',
      roles: [this.defaults.roles, Validators.required],
      notes: this.defaults.notes || ''
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createUser();
    } else if (this.mode === 'update') {
      this.updateUser();
    }
  }

  createUser() {
    const user = this.form.value;
    const body = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      password: user.password,
      roles: user.roles,

    };
    debugger
    console.log(this.form.valid);
    debugger
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.userService.createUser(user).subscribe(res => {
        console.log('create user: ', res);
      });
      this.dialogRef.close(user);
    }
  }

  updateUser() {
    const user = this.form.value;
    user.id = this.defaults.id;
    debugger
    console.log(this.form.valid);
    debugger
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.userService.createUser(user).subscribe(res => {
        console.log('create user: ', res);
      });
      this.dialogRef.close(user);
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
