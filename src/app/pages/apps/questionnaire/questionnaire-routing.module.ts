import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuicklinkModule} from "ngx-quicklink";
import {VexRoutes} from "../../../../@vex/interfaces/vex-route.interface";
import {QuestionnaireComponent} from "./questionnaire.component";


const routes: VexRoutes = [
    {
        path: '',
        component: QuestionnaireComponent,
        data: {
            toolbarShadowEnabled: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class QuestionnaireRoutingModule {

}
