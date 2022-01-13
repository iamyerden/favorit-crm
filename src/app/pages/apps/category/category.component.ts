import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {FormControl} from '@angular/forms';
import {TableColumn} from '../../../../@vex/interfaces/table-column.interface';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {aioTableLabels} from '../../../../static-data/aio-table-data';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material/select';
import {CategoryModel} from '../../../core/models/category.model';
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
import {CategoryCreateUpdateComponent} from './category-create-update/category-create-update.component';
import {CategoryService} from '../../../core/service/category.service';
import {CategoryTable} from '../../../core/constant/CategoryTable';
import {CommonConstants} from '../../../core/constant/CommonConstants';
import {ConfirmationDialogComponent} from '../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import {TabService} from '../../../core/service/tab.service';

@Component({
    selector: 'vex-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
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
export class CategoryComponent implements OnInit, AfterViewInit {
    /******* SYSTEM CONSTANTS *******/
    columns: TableColumn<CategoryModel>[] = CategoryTable.categoryColumns;
    pageSize = CommonConstants.pageSize;
    pageSizeOptions = CommonConstants.pageSizeOptions;
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
    searchCtrl = new FormControl();
    dataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource();
    selection = new SelectionModel<CategoryModel>(true, []);

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private dialog: MatDialog,
                private categoryService: CategoryService,
                private tabService: TabService) {
    }

    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngOnInit() {
        this.getAllCategories();
        this.getAllTabs();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getAllCategories() {
        this.categoryService.getAllCategories().subscribe(res => {
            this.dataSource.data = res;
            const test = this.dataSource.data[1];
        });
    }

    getAllTabs() {
        this.tabService.getAllTabs().subscribe(res => {
            this.tabs = res;
        });
    }

    saveCategory(categoryModel?: CategoryModel) {
        this.dialog.open(CategoryCreateUpdateComponent, {
            data: {
                categoryModel: categoryModel ? categoryModel : null,
                all: this.dataSource.data,
                tabs: this.tabs
            }
        }).afterClosed().subscribe((category: CategoryModel) => {
            if (category) {
                this.getAllCategories();
            }
        });
    }

    deleteCategory(categoryModel: CategoryModel) {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                text: 'Are you sure to delete category '
                    + categoryModel.name + '?'
            }
        }).afterClosed().subscribe(res => {
            if (res && res === 'OK') {
                this.delete(categoryModel);
            }
        });
    }

    delete(categoryModel: CategoryModel) {
        this.categoryService.deleteCategory(categoryModel.id).subscribe(res => {
            console.log('Category has been deleted successfully: ' + res);
        }, error => {
            console.log('There is an error with deletion: ' + error);
        });
        this.dataSource.data.splice(this.dataSource.data.indexOf(categoryModel), 1);
        this.dataSource.data = [...this.dataSource.data];
        this.selection.deselect(categoryModel);

    }

    deleteItems(categoryModel: CategoryModel[]) {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                text: 'You want to delete selected categories?'
            }
        }).afterClosed().subscribe(res => {
            if (res && res === 'OK') {
                categoryModel.forEach(c => this.delete(c));
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

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    trackByProperty<T>(index: number, column: TableColumn<T>) {
        return column.property;
    }

    onLabelChange(change: MatSelectChange, row: CategoryModel) {
        // const index = this.categoryModels.findIndex(c => c === row);
        // this.categoryModels[index].id = change.value;
        // this.subject$.next(this.categoryModels);
    }

}
