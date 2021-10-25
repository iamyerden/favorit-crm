import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrganizationComponent} from './organization.component';
import {OrganizationRoutingModule} from "./organization-routing.module";
import {PageLayoutModule} from "../../../../@vex/components/page-layout/page-layout.module";
import {BreadcrumbsModule} from "../../../../@vex/components/breadcrumbs/breadcrumbs.module";


@NgModule({
    declarations: [
        OrganizationComponent
    ],
    imports: [
        CommonModule,
        OrganizationRoutingModule,
        PageLayoutModule,
        BreadcrumbsModule
    ]
})
export class OrganizationModule {
}
