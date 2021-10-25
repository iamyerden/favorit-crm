import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {UserRoutingModule} from "./user-routing.module";
import {PageLayoutModule} from "../../../../@vex/components/page-layout/page-layout.module";
import {BreadcrumbsModule} from "../../../../@vex/components/breadcrumbs/breadcrumbs.module";


@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        PageLayoutModule,
        BreadcrumbsModule
    ]
})
export class UserModule {
}
