import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TariffRoutingModule } from './tariff-routing.module';
import { TariffComponent } from './tariff.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [TariffComponent],
  exports: [
    TariffComponent
  ],
  imports: [
    CommonModule,
    TariffRoutingModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule
  ]
})
export class TariffModule {
}
