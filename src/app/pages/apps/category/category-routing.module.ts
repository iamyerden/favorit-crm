import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuicklinkModule} from 'ngx-quicklink';

import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {CategoryComponent} from './category.component';
const routes: VexRoutes = [
    {
        path: '',
        component: CategoryComponent,
        data: {
            toolbarShadowEnabled: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class CategoryRoutingModule {

}
