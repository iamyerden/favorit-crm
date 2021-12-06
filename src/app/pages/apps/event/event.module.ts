import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventComponent} from './event.component';
import {EventRoutingModule} from './event-routing.module';
import {PageLayoutModule} from '../../../../@vex/components/page-layout/page-layout.module';
import {BreadcrumbsModule} from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomerCreateUpdateModule} from '../aio-table/customer-create-update/customer-create-update.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {IconModule} from '@visurel/iconify-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {QuillModule} from 'ngx-quill';
import {SecondaryToolbarModule} from '../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {EventDetailComponent} from './job-detail/event-detail.component';


@NgModule({
    declarations: [
        EventComponent,
        EventDetailComponent
    ],
    imports: [
        CommonModule,
        EventRoutingModule,
        PageLayoutModule,
        FlexLayoutModule,
        BreadcrumbsModule,
        CustomerCreateUpdateModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        IconModule,
        FormsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        ContainerModule,
        MatSelectModule,
        MatInputModule,
        MatButtonToggleModule,
        QuillModule.forRoot({
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],

                    [{header: 1}, {header: 2}],               // custom button values
                    [{list: 'ordered'}, {list: 'bullet'}],
                    [{script: 'sub'}, {script: 'super'}],      // superscript/subscript
                    [{indent: '-1'}, {indent: '+1'}],          // outdent/indent
                    [{direction: 'rtl'}],                         // text direction

                    [{size: ['small', false, 'large', 'huge']}],  // custom dropdown
                    [{header: [1, 2, 3, 4, 5, 6, false]}],

                    [{color: []}, {background: []}],          // dropdown with defaults from theme
                    [{align: []}],

                    ['clean'],                                         // remove formatting button

                    ['link', 'image', 'video']                         // link and image, video
                ]
            }
        }),
        SecondaryToolbarModule,
        MatDialogModule,
        MatDividerModule
    ]
})
export class EventModule {
}
