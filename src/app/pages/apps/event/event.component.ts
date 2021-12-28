import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {TableColumn} from '../../../../@vex/interfaces/table-column.interface';
import {aioTableLabels, eventsTableData, jobsTableData, newsAndBlogsTableData} from '../../../../static-data/aio-table-data';
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
import {EventModel} from '../../../core/models/eventModel';
import {EventDetailComponent} from './job-detail/event-detail.component';

@Component({
    selector: 'vex-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
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
export class EventComponent implements OnInit, AfterViewInit {
    layoutCtrl = new FormControl('boxed');

    /**
     * Simulating a service with HTTP that returns Observables
     * You probably want to remove this and do all requests in a service with HTTP
     */
    subject$: ReplaySubject<EventModel[]> = new ReplaySubject<EventModel[]>(1);
    data$: Observable<EventModel[]> = this.subject$.asObservable();
    event: EventModel[];

    @Input()
    columns: TableColumn<EventModel>[] = [
        {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
        // {label: 'Image', property: 'image', type: 'image', visible: true},
        {label: 'Name', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium']},
        {label: 'Description', property: 'description', type: 'text', visible: false},
        {label: 'Type', property: 'labels', type: 'button', visible: true},
        {label: 'Event date', property: 'eventDate', type: 'text', visible: true},
        {label: 'Actions', property: 'actions', type: 'button', visible: true}
    ];
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    dataSource: MatTableDataSource<EventModel> | null;
    selection = new SelectionModel<EventModel>(true, []);
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
        return of(eventsTableData.map(event => new EventModel(event)));
    }

    ngOnInit() {
        this.getData().subscribe(event => {
            this.subject$.next(event);
        });

        this.dataSource = new MatTableDataSource();

        this.data$.pipe(
            filter<EventModel[]>(Boolean)
        ).subscribe(event => {
            this.event = event;
            this.dataSource.data = event;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    createCustomer() {
        this.dialog.open(EventDetailComponent).afterClosed().subscribe((event: EventModel) => {
            /**
             * Customer is the updated customer (if the user pressed Save - otherwise it's null)
             */
            if (event) {
                /**
                 * Here we are updating our local array.
                 * You would probably make an HTTP request here.
                 */
                this.event.unshift(new EventModel(event));
                this.subject$.next(this.event);
            }
        });
    }

    updateItem(event: EventModel) {
        this.dialog.open(EventDetailComponent, {
            data: event
        }).afterClosed().subscribe(updatedEvent => {
            /**
             * Customer is the updated customer (if the user pressed Save - otherwise it's null)
             */
            console.log('Return item:', updatedEvent);
            if (updatedEvent) {
                /**
                 * Here we are updating our local array.
                 * You would probably make an HTTP request here.
                 */
                const index = this.event.findIndex((existingEvent) => existingEvent.id === updatedEvent.id);
                this.event[index] = new EventModel(updatedEvent);
                this.subject$.next(this.event);
            }
        });
    }

    deleteNewsAndBlogs(event: EventModel) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.event.splice(this.event.findIndex((existingCustomer) => existingCustomer.id === event.id), 1);
        this.selection.deselect(event);
        this.subject$.next(this.event);
    }

    deleteItems(event: EventModel[]) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        event.forEach(c => this.deleteNewsAndBlogs(c));
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

    onLabelChange(change: MatSelectChange, row: EventModel) {
        const index = this.event.findIndex(c => c === row);
        this.event[index].labels = change.value;
        this.subject$.next(this.event);
    }
}
