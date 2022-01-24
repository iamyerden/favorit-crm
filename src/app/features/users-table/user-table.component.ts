import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { User } from 'src/app/core/models/user.model';
import {aioTableStatuses} from 'src/static-data/aio-table-data';
import {UsersService} from '../../core/service/users.service';
import {fadeInUp400ms} from '../../../@vex/animations/fade-in-up.animation';
import {stagger40ms} from '../../../@vex/animations/stagger.animation';
import {UserBlockUnlockComponent} from './user-block-unlock/user-block-unlock.component';
import {CommonConstants} from '../../core/constant/CommonConstants';
import {Pagination} from '../../core/models/pagination.model';
import {CategoryModel} from '../../core/models/category.model';


@UntilDestroy()
@Component({
  selector: 'vex-aio-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
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
export class UserTableComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]> = this.subject$.asObservable();
  customers: User[];

  @Input()
  columns: TableColumn<User>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Image', property: 'image', type: 'image', visible: true },
    { label: 'First Name', property: 'firstName', type: 'text', visible: true },
    { label: 'Last Name', property: 'lastName', type: 'text', visible: true },
    { label: 'Username', property: 'username', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Role', property: 'roles', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'About', property: 'about', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Language', property: 'language', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Email', property: 'email', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Status', property: 'labels', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  selection = new SelectionModel<User>(true, []);
  searchCtrl = new FormControl();

  pageSize = CommonConstants.pageSize;
  pageIndex = CommonConstants.pageIndex;
  pageSizeOptions = CommonConstants.pageSizeOptions;
  length: number;
  sortBy: string;
  direction: string;

  labels = aioTableStatuses;

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
  userList = [];
  params = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
              private usersService: UsersService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getAllUsers(null);
  }

  ngAfterViewInit() {
  }

  createCustomer() {
    this.dialog.open(UserCreateUpdateComponent).afterClosed().subscribe((customer: User) => {
      if (customer) {
        this.getAllUsers(null);
      }
    });
  }

  sortByColumn(e) {
    console.log(e);
    this.sortBy = e.active;
    this.direction = e.direction;
    this.getAllUsers(null);
  }

  updateCustomer(customer: User) {
    this.dialog.open(UserCreateUpdateComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      if (updatedCustomer) {
        this.getAllUsers(null);
      }
    });
  }

  blockUser(customer: User) {
    this.dialog.open(UserBlockUnlockComponent, {
      data: customer
    }).afterClosed().subscribe(() => {
      this.getAllUsers(null);
    });
  }

  unlockUser(customer: User) {
    this.usersService.unlockUser(customer.id).subscribe(() => {
      this.getAllUsers(null);
    });
  }

  deleteCustomers(users: User[]) {
    users.forEach(c => {
      this.usersService.deleteUser(c.id).subscribe(res => {
        console.log('res>w> ', res.status);
      });
    });

    this.selection = new SelectionModel<User>(true, []);
    this.getAllUsers(null);
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

  onLabelChange(change: MatSelectChange, row: User) {
    const index = this.customers.findIndex(c => c === row);
    this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }

  getAllUsers(searchValue: string, $event?: PageEvent) {
    let pagination = new Pagination();
    pagination.pageSize = $event ? $event.pageSize : this.pageSize;
    pagination.pageNumber = $event ? $event.pageIndex : this.pageIndex;

    if (searchValue) {
      pagination.searchString = searchValue;
    }
    if (this.sortBy !== '') {
      pagination.sortBy = this.sortBy;
    }
    if (this.direction !== '') {
      pagination.direction = this.direction;
    }

    this.usersService.getUsersPageable(pagination).subscribe(res => {
      this.dataSource.data = res.content;
      this.pageIndex = res.page;
      this.pageSize = res.size;
      this.length = res.total;
    });
  }
}
