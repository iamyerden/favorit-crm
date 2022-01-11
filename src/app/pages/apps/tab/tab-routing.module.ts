import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuicklinkModule} from "ngx-quicklink";

import {VexRoutes} from "../../../../@vex/interfaces/vex-route.interface";
import {TabComponent} from "./tab.component";
const routes: VexRoutes = [
    {
        path: '',
        component: TabComponent,
        data: {
            toolbarShadowEnabled: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class TabRoutingModule {

}
