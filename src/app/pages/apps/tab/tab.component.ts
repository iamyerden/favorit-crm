import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {FormControl} from '@angular/forms';
import {TableColumn} from '../../../../@vex/interfaces/table-column.interface';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {aioTableLabels} from '../../../../static-data/aio-table-data';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material/select';
import {TabModel} from '../../../core/models/tab.model';
import {TabService} from '../../../core/service/tab.service';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import {TabCreateUpdateComponent} from './tab-create-update/tab-create-update.component';
import {ConfirmationDialogComponent} from '../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import {CommonConstants} from '../../../core/constant/CommonConstants';
import {TabTable} from '../../../core/constant/TabTable';
import {Pagination} from '../../../core/models/pagination.model';

@Component({
    selector: 'vex-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
    animations: [
        fadeInUp400ms,
        stagger40ms
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'standard'
            } as MatFormFieldDefaultOptions
        }
    ]
})
export class TabComponent implements OnInit, AfterViewInit {
    /******* SYSTEM CONSTANTS *******/
    columns: TableColumn<TabModel>[] = TabTable.tabColumns;

    pageSize = CommonConstants.pageSize;
    pageIndex = CommonConstants.pageIndex;
    pageSizeOptions = CommonConstants.pageSizeOptions;
    length: number;
    tabs: any;

    labels = aioTableLabels;
    icPhone = icPhone;
    icMail = icMail;
    icMap = icMap;
    icEdit = icEdit;
    icSearch = icSearch;
    icDelete = icDelete;
    icAdd = icAdd;
    icFilterList = icFilterList;
    icMoreHoriz = icMoreHoriz;
    icFolder = icFolder;
    /******* SYSTEM VARIABLES *******/

    layoutCtrl = new FormControl('boxed');
    dataSource: MatTableDataSource<TabModel> = new MatTableDataSource();
    selection = new SelectionModel<TabModel>(true, []);

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private dialog: MatDialog,
                private tabService: TabService) {
    }

    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngOnInit() {
        this.getAllTabs(null);
    }

    ngAfterViewInit() {
    }

    getAllTabs(searchValue: string, $event?: PageEvent) {
        const pagination = new Pagination();
        pagination.pageSize = $event ? $event.pageSize : this.pageSize;
        pagination.pageNumber = $event ? $event.pageIndex : 0;
        if (searchValue) {
            pagination.searchString = searchValue;
        }
        this.tabService.getAllTabsPageable(pagination).subscribe(res => {
            this.dataSource.data = res.content;
            this.pageIndex = res.page;
            this.pageSize = res.size;
            this.length = res.total;
        });
    }

    createTab(tabModel?: TabModel) {
        this.dialog.open(TabCreateUpdateComponent, {
            data: {
                tabModel: tabModel ? tabModel : null,
                all: this.dataSource.data,
                tabs: this.tabs
            }
        }).afterClosed().subscribe((tabModel: TabModel) => {
            if (tabModel) {
                this.getAllTabs(null);
            }
        });
    }

    deleteTab(tabModel: TabModel) {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                text: 'Are you sure to delete tab '
                    + tabModel.name + '?'
            }
        }).afterClosed().subscribe(res => {
            if (res && res === 'OK') {
                this.delete(tabModel);
            }
        });
    }

    delete(tabModel: TabModel) {
        this.tabService.deleteTab(tabModel.id).subscribe(res => {
            console.log('Tab has been deleted successfully: ' + res);
        }, error => {
            console.log('There is an error with deletion: ' + error);
        });
        this.dataSource.data.splice(this.dataSource.data.indexOf(tabModel), 1);
        this.dataSource.data = [...this.dataSource.data];
        this.selection.deselect(tabModel);
    }

    deleteItems(tabModel: TabModel[]) {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                text: 'You want to delete selected categories?'
            }
        }).afterClosed().subscribe(res => {
            if (res && res === 'OK') {
                tabModel.forEach(c => this.delete(c));
            }
        });
    }

    onFilterChange(value: string) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
    }

    toggleColumnVisibility(column, event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        column.visible = !column.visible;
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    trackByProperty<T>(index: number, column: TableColumn<T>) {
        return column.property;
    }

    onLabelChange(change: MatSelectChange, row: TabModel) {
        // const index = this.tabModels.findIndex(c => c === row);
        // this.tabModels[index].id = change.value;
        // this.subject$.next(this.tabModels);
    }


}
