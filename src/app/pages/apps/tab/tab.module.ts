import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabComponent} from "./tab.component";
import {TabRoutingModule} from "./tab-routing.module";
import {PageLayoutModule} from "../../../../@vex/components/page-layout/page-layout.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {BreadcrumbsModule} from "../../../../@vex/components/breadcrumbs/breadcrumbs.module";
import {CustomerCreateUpdateModule} from "../aio-table/customer-create-update/customer-create-update.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {IconModule} from "@visurel/iconify-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ContainerModule} from "../../../../@vex/directives/container/container.module";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import { TabDetailsComponent } from './tab-details/tab-details.component';

@NgModule({
    declarations: [
        TabComponent,
        TabDetailsComponent
    ],
    imports: [
        CommonModule,
        TabRoutingModule,
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
        MatButtonToggleModule,
        MatDialogModule,
        MatDividerModule,
        MatInputModule
    ]
})
export class TabModule {
}
