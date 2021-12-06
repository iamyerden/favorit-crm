import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TariffsRoutingModule } from './tariffs-routing.module';
import { TariffsComponent } from './tariffs.component';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { MatRippleModule } from '@angular/material/core';
import {TariffModule} from './components/tariff.module';


@NgModule({
  declarations: [TariffsComponent],
  imports: [
    CommonModule,
    TariffsRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatButtonModule,
    IconModule,
    MatRippleModule,
    TariffModule
  ]
})
export class TariffsModule {
}
