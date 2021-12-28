import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {FormControl} from '@angular/forms';
import {Observable, of, ReplaySubject} from 'rxjs';
import {TableColumn} from '../../../../@vex/interfaces/table-column.interface';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {aioTableLabels, categoryModelData} from '../../../../static-data/aio-table-data';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {filter} from 'rxjs/operators';
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
import {CategoryDetailComponent} from './category-detail/category-detail.component';
import {CategoryCreateUpdateComponent} from './category-create-update/category-create-update.component';
import {CategoryService} from '../../../core/service/category.service';

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

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<CategoryModel[]> = new ReplaySubject<CategoryModel[]>(1);
  data$: Observable<CategoryModel[]> = this.subject$.asObservable();
  categoryModels: CategoryModel[];

  @Input()
  columns: TableColumn<CategoryModel>[] = [
    {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
    {label: 'Image', property: 'image', type: 'image', visible: false},
    {label: 'Id', property: 'id', type: 'text', visible: true},
    {label: 'Parent id', property: 'parentId', type: 'text', visible: true, cssClasses: ['font-medium']},
    {label: 'Name', property: 'name', type: 'text', visible: true},
    {label: 'Logo id', property: 'logoId', type: 'text', visible: true},
    {label: 'Author', property: 'author', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium']},
    {label: 'Status', property: 'labels', type: 'button', visible: false},
    {label: 'Actions', property: 'actions', type: 'button', visible: true}
  ];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<CategoryModel> | null;
  selection = new SelectionModel<CategoryModel>(true, []);
  searchCtrl = new FormControl();

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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog,
              private categoryService: CategoryService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(categoryModelData.map(categoryModel => categoryModel));
  }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(res => {
      console.log('categories :: ', res);

      this.subject$.next(res);

    }, error => {
      console.log(error);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
        filter<CategoryModel[]>(Boolean)
    ).subscribe(categoryModel => {
      this.categoryModels = categoryModel;
      this.dataSource.data = categoryModel;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCategory() {
    this.dialog.open(CategoryCreateUpdateComponent).afterClosed().subscribe((category: CategoryModel) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (category) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.categoryModels.unshift(category);
        this.subject$.next(this.categoryModels);
      }
    });
  }

  updateItem(categoryModel: CategoryModel) {
    this.dialog.open(CategoryDetailComponent, {
      data: categoryModel
    }).afterClosed().subscribe(updatedCategoryModels => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updatedCategoryModels) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.categoryModels.findIndex((existingcategory) => existingcategory.id === updatedCategoryModels.id);
        this.categoryModels[index] = updatedCategoryModels;
        this.subject$.next(this.categoryModels);
      }
    });
  }

  deleteNewsAndBlogs(categoryModel: CategoryModel) {
    this.categoryService.deleteCategory(categoryModel.id).subscribe(res => {

    }, error => {
    });

    this.dataSource.data.splice(this.dataSource.data.indexOf(categoryModel), 1);
    this.dataSource.data = [...this.dataSource.data];

    this.selection.deselect(categoryModel);
    this.subject$.next(this.categoryModels);
  }

  deleteItems(categoryModel: CategoryModel[]) {
    categoryModel.forEach(c => this.deleteNewsAndBlogs(c));
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
    const index = this.categoryModels.findIndex(c => c === row);
    this.categoryModels[index].id = change.value;
    this.subject$.next(this.categoryModels);
  }

}
