import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuicklinkModule} from 'ngx-quicklink';
import {JobComponent} from './job.component';

const routes: VexRoutes = [
    {
        path: '',
        component: JobComponent,
        data: {
            toolbarShadowEnabled: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class JobRoutingModule {

}
