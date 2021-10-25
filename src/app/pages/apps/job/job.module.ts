import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobComponent} from './job.component';
import {JobRoutingModule} from "./job-routing.module";
import {PageLayoutModule} from "../../../../@vex/components/page-layout/page-layout.module";
import {BreadcrumbsModule} from "../../../../@vex/components/breadcrumbs/breadcrumbs.module";


@NgModule({
    declarations: [
        JobComponent
    ],
    imports: [
        CommonModule,
        JobRoutingModule,
        PageLayoutModule,
        BreadcrumbsModule
    ]
})
export class JobModule {
}
