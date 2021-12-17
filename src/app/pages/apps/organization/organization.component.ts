import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {TableColumn} from '../../../../@vex/interfaces/table-column.interface';
import {aioTableLabels, organizationData} from '../../../../static-data/aio-table-data';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import {SelectionModel} from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {FormControl} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import {OrganizationModel} from './model/organization-model';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {OrganizationsService} from '../../../service/organizations.service';
import {untilDestroyed} from '@ngneat/until-destroy';

@Component({
  selector: 'vex-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
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
  export class OrganizationComponent implements OnInit, AfterViewInit {
  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<OrganizationModel[]> = new ReplaySubject<OrganizationModel[]>(1);
  data$: Observable<OrganizationModel[]> = this.subject$.asObservable();
  organizationModels: OrganizationModel[];

  @Input()
  columns: TableColumn<OrganizationModel>[] = [
    {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
    {label: 'Image', property: 'image', type: 'image', visible: true},
    {label: 'Name', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium']},
    {label: 'Description', property: 'description', type: 'text', visible: true},
    {label: 'Contacts', property: 'contacts', type: 'text', visible: false},
    {label: 'Country', property: 'country', type: 'text', visible: false},
    {label: 'City', property: 'city', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium']},
    {label: 'Address', property: 'address', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium']},
    {label: 'Status', property: 'labels', type: 'button', visible: true},
    {label: 'Actions', property: 'actions', type: 'button', visible: true}
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  params: { pageNo: number; pageSize: number; sortBy: string };
  dataSource: MatTableDataSource<OrganizationModel> | null;
  selection = new SelectionModel<OrganizationModel>(true, []);
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
              private organizationService: OrganizationsService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(organizationData.map(organizationModel => new OrganizationModel(organizationModel)));
  }

  ngOnInit() {
    this.params = {
      pageNo: 0,
      pageSize: this.pageSize,
      sortBy: 'id'
    };
    this.organizationService.getOrganizations(this.params).subscribe(res => {
      this.paginator.length = res.totalElements;
      this.subject$.next(res.content);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
        filter<OrganizationModel[]>(Boolean)
    ).subscribe(organizationModel => {
      this.organizationModels = organizationModel;
      this.dataSource.data = organizationModel;
    });

    this.searchCtrl.valueChanges.pipe(
        untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.dialog.open(ItemDetailComponent).afterClosed().subscribe((organization: OrganizationModel) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (organization) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.organizationModels.unshift(new OrganizationModel(organization));
        this.subject$.next(this.organizationModels);
      }
    });
  }

  updateItem(newsAndBlogs: OrganizationModel) {
    this.dialog.open(ItemDetailComponent, {
      data: newsAndBlogs
    }).afterClosed().subscribe(updatedNewsAndBlogs => {
      if (updatedNewsAndBlogs) {
        const index = this.organizationModels.findIndex((existingOrganization) => existingOrganization.id === updatedNewsAndBlogs.id);
        this.organizationModels[index] = new OrganizationModel(updatedNewsAndBlogs);
        this.subject$.next(this.organizationModels);
      }
    });
  }

  deleteOrganizations(organizations: OrganizationModel[]) {
    organizations.forEach(c => {
      this.organizationService.deleteOrganization(c.id).subscribe(res => {
        console.log('res>w> ', res.status);
      });
    });
    window.location.reload();
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

  onLabelChange(change: MatSelectChange, row: OrganizationModel) {
    const index = this.organizationModels.findIndex(c => c === row);
    this.organizationModels[index].nameOrganization = change.value;
    this.subject$.next(this.organizationModels);
  }
}
