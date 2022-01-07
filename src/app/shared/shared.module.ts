import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './modules/material.module';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import {IconModule} from "@visurel/iconify-angular";

@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    IconModule
  ],
  exports: [MaterialModule],
  providers: [],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule { }
