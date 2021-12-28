import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
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
import {aioTableData, aioTableLabels} from 'src/static-data/aio-table-data';
import {UsersService} from '../../core/service/users.service';
import {fadeInUp400ms} from '../../../@vex/animations/fade-in-up.animation';
import {stagger40ms} from '../../../@vex/animations/stagger.animation';


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
    { label: 'About', property: 'about', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Language', property: 'language', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Email', property: 'email', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Labels', property: 'labels', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<User> | null;
  selection = new SelectionModel<User>(true, []);
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

  getData() {
    return of(aioTableData.map(customer => new User(customer)));
  }

  onChangePage(event: PageEvent) {
    this.params = {
      pageNo: event.pageIndex,
      pageSize: event.pageSize,
      sortBy: 'id'
    };
    // this.usersService.getUsers(this.params).subscribe(res => {
    //   this.paginator.length = res.totalElements;
    //   this.subject$.next(res.content);
    // });
  }

  ngOnInit() {
    this.params = {
      pageNo: 0,
      pageSize: this.pageSize,
      sortBy: 'id'
    };
    // this.usersService.getUsers(this.params).subscribe(res => {
    //   this.paginator.length = res.totalElements;
    //   this.subject$.next(res.content);
    // });
    console.log(this.subject$, ' uU');
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<User[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
    console.log(this.dataSource, ' uU');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.dialog.open(UserCreateUpdateComponent).afterClosed().subscribe((customer: User) => {
      if (customer) {
        this.customers.unshift(new User(customer));
        this.subject$.next(this.customers);
      }
    });
  }

  updateCustomer(customer: User) {
    this.dialog.open(UserCreateUpdateComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      if (updatedCustomer) {
        const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
        this.customers[index] = new User(updatedCustomer);
        this.subject$.next(this.customers);
      }
    });
  }

  deleteCustomer(user: User) {
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === user.id), 1);
    this.selection.deselect(user);
    this.subject$.next(this.customers);
    window.location.reload();
  }

  deleteCustomers(users: User[]) {
    users.forEach(c => {
      this.usersService.deleteUser(c.id).subscribe(res => {
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
}
