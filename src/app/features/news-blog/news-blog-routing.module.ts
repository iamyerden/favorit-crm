import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuicklinkModule} from 'ngx-quicklink';
import {NewsBlogComponent} from './news-blog.component';
import {ItemContentEditorComponent} from './item-content-editor/item-content-editor.component';
import {VexRoutes} from '../../../@vex/interfaces/vex-route.interface';
import {NewsBlogDetailsComponent} from './news-blog-details/news-blog-details.component';
import {ApplicaionCoachComponent} from './applicaion-coach/applicaion-coach.component';


const routes: VexRoutes = [
    {
        path: '',
        component: NewsBlogComponent,
        data: {
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'tournament/:id',
        component: NewsBlogDetailsComponent,
        data: {
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'tournament/content-editor/:id',
        component: ItemContentEditorComponent,
        data: {
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'coach/:id',
        component: ApplicaionCoachComponent,
        data: {
            toolbarShadowEnabled: true
        }
    },
    {
        path: 'coach/content-editor/:id',
        component: ItemContentEditorComponent,
        data: {
            toolbarShadowEnabled: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class NewsBlogRoutingModule {

}
