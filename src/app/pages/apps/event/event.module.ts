import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventComponent} from './event.component';
import {EventRoutingModule} from "./event-routing.module";
import {PageLayoutModule} from "../../../../@vex/components/page-layout/page-layout.module";
import {BreadcrumbsModule} from "../../../../@vex/components/breadcrumbs/breadcrumbs.module";


@NgModule({
    declarations: [
        EventComponent
    ],
    imports: [
        CommonModule,
        EventRoutingModule,
        PageLayoutModule,
        BreadcrumbsModule
    ]
})
export class EventModule {
}
