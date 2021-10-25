import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsBlogComponent} from './news-blog.component';
import {NewsBlogRoutingModule} from './news-blog-routing.module';
import {PageLayoutModule} from "../../../../@vex/components/page-layout/page-layout.module";
import {BreadcrumbsModule} from "../../../../@vex/components/breadcrumbs/breadcrumbs.module";


@NgModule({
    declarations: [
        NewsBlogComponent
    ],
    imports: [
        CommonModule,
        NewsBlogRoutingModule,
        PageLayoutModule,
        BreadcrumbsModule
    ]
})
export class NewsBlogModule {
}
