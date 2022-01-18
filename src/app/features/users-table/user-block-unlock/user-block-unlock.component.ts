import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icDateRange from '@iconify/icons-ic/twotone-date-range';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import {UsersService} from '../../../core/service/users.service';
import {User} from "../../../core/models/user.model";

@Component({
  selector: 'vex-user-block-unlock',
  templateUrl: './user-block-unlock.component.html',
  styleUrls: ['./user-block-unlock.component.scss']
})
export class UserBlockUnlockComponent implements OnInit {

  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;
  icDateRange = icDateRange;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<UserBlockUnlockComponent>,
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
      id: this.defaults.id,
      imageSrc: this.defaults.imageSrc,
      username: this.defaults.username,
      firstName: [this.defaults.firstName || ''],
      lastName: [this.defaults.lastName || ''],
      startDate: new Date(),
      endDate: new Date()
    });
  }

  save() {
    const userBlockDto = {
      user_id: this.defaults.id,
      blockDate: this.form.value.startDate,
      unlockDate: this.form.value.endDate
    };
    this.userService.blockUser(userBlockDto).subscribe(res => {
      console.log('res>>', res);
    });

    this.dialogRef.close(userBlockDto);
  }
}
