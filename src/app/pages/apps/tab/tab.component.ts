import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {fadeInUp400ms} from "../../../../@vex/animations/fade-in-up.animation";
import {stagger40ms} from "../../../../@vex/animations/stagger.animation";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from "@angular/material/form-field";
import {FormControl} from "@angular/forms";
import {Observable, ReplaySubject} from "rxjs";
import {TableColumn} from "../../../../@vex/interfaces/table-column.interface";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {aioTableLabels} from "../../../../static-data/aio-table-data";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {filter} from "rxjs/operators";
import {MatSelectChange} from "@angular/material/select";
import {TabModel} from "../../../core/models/tab.model";
import {TabService} from "../../../core/service/tab.service";
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
import {TabCreateUpdateComponent} from "./tab-create-update/tab-create-update.component";
import {TabDetailsComponent} from "./tab-details/tab-details.component";

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

  layoutCtrl = new FormControl('boxed');

  subject$: ReplaySubject<TabModel[]> = new ReplaySubject<TabModel[]>(1);
  data$: Observable<TabModel[]> = this.subject$.asObservable();
  tabModels: TabModel[];

  @Input()
  columns: TableColumn<TabModel>[] = [
    {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
    {label: 'Id', property: 'id', type: 'text', visible: true},
    {label: 'Name', property: 'name', type: 'text', visible: true},
    {label: 'Actions', property: 'actions', type: 'button', visible: true}
  ];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<TabModel> | null;
  selection = new SelectionModel<TabModel>(true, []);
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
              private tabService: TabService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.tabService.getTabs().subscribe(res => {
      console.log('tabs :: ', res);

      this.subject$.next(res);

    }, error => {
      console.log(error);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
        filter<TabModel[]>(Boolean)
    ).subscribe(tabModel => {
      this.tabModels = tabModel;
      this.dataSource.data = tabModel;
    });
  }

  createTab() {
    this.dialog.open(TabCreateUpdateComponent).afterClosed().subscribe((tabModel: TabModel) => {

      if (tabModel) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.tabModels.unshift(tabModel);
        this.subject$.next(this.tabModels);
      }
    });
  }

  updateItem(tabModel: TabModel) {
    this.dialog.open(TabDetailsComponent, {
      data: tabModel
    }).afterClosed().subscribe(updatedTabModels => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updatedTabModels) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.tabModels.findIndex((existingTab) => existingTab.id === updatedTabModels.id);
        this.tabModels[index] = updatedTabModels;
        this.subject$.next(this.tabModels);
      }
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteTabs(tabModel: TabModel) {
    this.tabService.deleteTab(tabModel.id).subscribe(res => {
      console.log('tab deleted = ', res)

    }, error => {
      console.log('error deleting tab')
      console.log(error)
    });

    this.dataSource.data.splice(this.dataSource.data.indexOf(tabModel), 1);
    this.dataSource.data = [...this.dataSource.data];

    this.selection.deselect(tabModel);
    this.subject$.next(this.tabModels);
  }

  deleteItems(tabModel: TabModel[]) {
    tabModel.forEach(c => this.deleteTabs(c));
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
    const index = this.tabModels.findIndex(c => c === row);
    this.tabModels[index].id = change.value;
    this.subject$.next(this.tabModels);
  }

}
