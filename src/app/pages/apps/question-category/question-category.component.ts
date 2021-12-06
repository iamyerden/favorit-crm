import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {stagger40ms} from "../../../../@vex/animations/stagger.animation";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from "@angular/material/form-field";
import {FormControl} from "@angular/forms";
import {TableColumn} from "../../../../@vex/interfaces/table-column.interface";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {aioTableLabels, categoryData} from "../../../../static-data/aio-table-data";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {filter} from "rxjs/operators";
import {ItemDetailComponent} from "../news-blog/item-detail/item-detail.component";
import {MatSelectChange} from "@angular/material/select";
import {Observable, of, ReplaySubject} from 'rxjs';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import {QuestionCategory} from "./model/question-category";

@Component({
  selector: 'vex-question-category',
  templateUrl: './question-category.component.html',
  styleUrls: ['./question-category.component.scss'],
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
export class QuestionCategoryComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<QuestionCategory[]> = new ReplaySubject<QuestionCategory[]>(1);
  data$: Observable<QuestionCategory[]> = this.subject$.asObservable();
  questionCategories: QuestionCategory[];

  @Input()
  columns: TableColumn<QuestionCategory>[] = [
    {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
    {label: 'Image', property: 'image', type: 'image', visible: false},
    {label: 'Name', property: 'category_name', type: 'text', visible: true, cssClasses: ['font-medium']},
    {label: 'Category id', property: 'category_id', type: 'text', visible: true},
    {label: 'Short description', property: 'shortDescription', type: 'text', visible: false},
    {label: 'Content', property: 'content', type: 'text', visible: false},
    {label: 'Author', property: 'author', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium']},
    {label: 'Status', property: 'labels', type: 'button', visible: false},
    {label: 'Actions', property: 'actions', type: 'button', visible: true}
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<QuestionCategory> | null;
  selection = new SelectionModel<QuestionCategory>(true, []);
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

  constructor(private dialog: MatDialog) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(categoryData.map(questionCategory => new QuestionCategory(questionCategory)));
  }

  ngOnInit() {
    this.getData().subscribe(newsAndBlogs => {
      this.subject$.next(newsAndBlogs);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
        filter<QuestionCategory[]>(Boolean)
    ).subscribe(questionCategory => {
      this.questionCategories = questionCategory;
      this.dataSource.data = questionCategory;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.dialog.open(ItemDetailComponent).afterClosed().subscribe((questionCategory: QuestionCategory) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (questionCategory) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.questionCategories.unshift(new QuestionCategory(questionCategory));
        this.subject$.next(this.questionCategories);
      }
    });
  }

  updateItem(questionCategory: QuestionCategory) {
    this.dialog.open(ItemDetailComponent, {
      data: questionCategory
    }).afterClosed().subscribe(updatedQuestionCategory => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      console.log('Return item:', updatedQuestionCategory);
      if (updatedQuestionCategory) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.questionCategories.findIndex((existingQuestionCategory) => existingQuestionCategory.id === updatedQuestionCategory.id);
        this.questionCategories[index] = new QuestionCategory(updatedQuestionCategory);
        this.subject$.next(this.questionCategories);
      }
    });
  }

  deleteQuestionCategory(questionCategory: QuestionCategory) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.questionCategories.splice(this.questionCategories.findIndex((existingCustomer) => existingCustomer.id === questionCategory.id), 1);
    this.selection.deselect(questionCategory);
    this.subject$.next(this.questionCategories);
  }

  deleteItems(questionCategories1: QuestionCategory[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    questionCategories1.forEach(c => this.deleteQuestionCategory(c));
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

  onLabelChange(change: MatSelectChange, row: QuestionCategory) {
    const index = this.questionCategories.findIndex(c => c === row);
    this.questionCategories[index].category_name = change.value;
    this.subject$.next(this.questionCategories);
  }

}
