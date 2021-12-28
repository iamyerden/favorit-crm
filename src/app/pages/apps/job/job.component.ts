import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {TableColumn} from '../../../../@vex/interfaces/table-column.interface';
import {aioTableLabels, jobsTableData, newsAndBlogsTableData} from '../../../../static-data/aio-table-data';
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
import {JobModel} from '../../../core/models/job.model';
import {JobDetailComponent} from './job-detail/job-detail.component/job-detail.component';


@Component({
    selector: 'vex-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss'],
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
export class JobComponent implements OnInit, AfterViewInit {
    layoutCtrl = new FormControl('boxed');

    /**
     * Simulating a service with HTTP that returns Observables
     * You probably want to remove this and do all requests in a service with HTTP
     */
    subject$: ReplaySubject<JobModel[]> = new ReplaySubject<JobModel[]>(1);
    data$: Observable<JobModel[]> = this.subject$.asObservable();
    job: JobModel[];

    @Input()
    columns: TableColumn<JobModel>[] = [
        {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
        // {label: 'Image', property: 'image', type: 'image', visible: true},
        {label: 'Name', property: 'title', type: 'text', visible: true, cssClasses: ['font-medium']},
        {label: 'Description', property: 'description', type: 'text', visible: false},
        {label: 'Status', property: 'labels', type: 'button', visible: true},
        {label: 'Type', property: 'type', type: 'text', visible: true},
        {label: 'Price start', property: 'priceStart', type: 'text', visible: true},
        {label: 'Price end', property: 'priceEnd', type: 'text', visible: true},
        {label: 'Actions', property: 'actions', type: 'button', visible: true}
    ];
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    dataSource: MatTableDataSource<JobModel> | null;
    selection = new SelectionModel<JobModel>(true, []);
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
        return of(jobsTableData.map(job => new JobModel(job)));
    }

    ngOnInit() {
        this.getData().subscribe(job => {
            this.subject$.next(job);
        });

        this.dataSource = new MatTableDataSource();

        this.data$.pipe(
            filter<JobModel[]>(Boolean)
        ).subscribe(job => {
            this.job = job;
            this.dataSource.data = job;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    createCustomer() {
        this.dialog.open(JobDetailComponent).afterClosed().subscribe((job: JobModel) => {
            /**
             * Customer is the updated customer (if the user pressed Save - otherwise it's null)
             */
            if (job) {
                /**
                 * Here we are updating our local array.
                 * You would probably make an HTTP request here.
                 */
                this.job.unshift(new JobModel(job));
                this.subject$.next(this.job);
            }
        });
    }

    updateItem(job: JobModel) {
        this.dialog.open(JobDetailComponent, {
            data: job
        }).afterClosed().subscribe(updatedJob => {
            /**
             * Customer is the updated customer (if the user pressed Save - otherwise it's null)
             */
            console.log('Return item:', updatedJob);
            if (updatedJob) {
                /**
                 * Here we are updating our local array.
                 * You would probably make an HTTP request here.
                 */
                const index = this.job.findIndex((existingCustomer) => existingCustomer.id === updatedJob.id);
                this.job[index] = new JobModel(updatedJob);
                this.subject$.next(this.job);
            }
        });
    }

    deleteNewsAndBlogs(job: JobModel) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.job.splice(this.job.findIndex((existingCustomer) => existingCustomer.id === job.id), 1);
        this.selection.deselect(job);
        this.subject$.next(this.job);
    }

    deleteItems(job: JobModel[]) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        job.forEach(c => this.deleteNewsAndBlogs(c));
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

    onLabelChange(change: MatSelectChange, row: JobModel) {
        const index = this.job.findIndex(c => c === row);
        this.job[index].labels = change.value;
        this.subject$.next(this.job);
    }
}
