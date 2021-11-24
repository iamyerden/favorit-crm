import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpCenterRoutingModule } from './help-center-routing.module';
import { HelpCenterComponent } from './help-center.component';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { MatRippleModule } from '@angular/material/core';
import {HelpCenterPricingModule} from './help-center-pricing/help-center-pricing.module';


@NgModule({
  declarations: [HelpCenterComponent],
  imports: [
    CommonModule,
    HelpCenterRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatButtonModule,
    IconModule,
    MatRippleModule,
    HelpCenterPricingModule
  ]
})
export class HelpCenterModule {
}
