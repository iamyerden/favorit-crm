import {VexRoutes} from "../../../../@vex/interfaces/vex-route.interface";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuicklinkModule} from "ngx-quicklink";
import {EventComponent} from "./event.component";

const routes: VexRoutes = [
    {
        path: '',
        component: EventComponent,
        data: {
            toolbarShadowEnabled: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class EventRoutingModule {

}
