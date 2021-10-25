import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuicklinkModule} from "ngx-quicklink";
import {VexRoutes} from "../../../../@vex/interfaces/vex-route.interface";
import {OrganizationComponent} from "./organization.component";

const routes: VexRoutes = [
    {
        path: '',
        component: OrganizationComponent,
        data: {
            toolbarShadowEnabled: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class OrganizationRoutingModule {

}
