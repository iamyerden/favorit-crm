import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionnaireComponent} from './questionnaire.component';
import {QuestionnaireRoutingModule} from "./questionnaire-routing.module";
import {PageLayoutModule} from "../../../../@vex/components/page-layout/page-layout.module";
import {BreadcrumbsModule} from "../../../../@vex/components/breadcrumbs/breadcrumbs.module";


@NgModule({
    declarations: [
        QuestionnaireComponent
    ],
    imports: [
        CommonModule,
        QuestionnaireRoutingModule,
        PageLayoutModule,
        BreadcrumbsModule
    ]
})
export class QuestionnaireModule {
}
