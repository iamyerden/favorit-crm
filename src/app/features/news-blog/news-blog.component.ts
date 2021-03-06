import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import {SelectionModel} from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {FormControl} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import {fadeInUp400ms} from '../../../@vex/animations/fade-in-up.animation';
import {stagger40ms} from '../../../@vex/animations/stagger.animation';
import {NbModel} from '../../core/models/nb.model';
import {TableColumn} from '../../../@vex/interfaces/table-column.interface';
import {aioTableLabels} from '../../../static-data/aio-table-data';
import {CommonConstants} from '../../core/constant/CommonConstants';
import {Router} from '@angular/router';
import {AuthService} from '../../core/service/auth.service';
import {ApplicationsService} from '../../core/service/applications.service';
import {Application} from '../../core/models/application.model';

@Component({
    selector: 'vex-news-blog',
    templateUrl: './news-blog.component.html',
    styleUrls: ['./news-blog.component.scss'],
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
export class NewsBlogComponent implements OnInit, AfterViewInit {
    /******* SYSTEM CONSTANTS *******/
    // columns: TableColumn<TabModel>[] = TabTable.tabColumns;

    pageSize = CommonConstants.pageSize;
    pageIndex = CommonConstants.pageIndex;
    pageSizeOptions = CommonConstants.pageSizeOptions;
    length: number;

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
    dataSource: MatTableDataSource<Application> = new MatTableDataSource();
    selection = new SelectionModel<Application>(true, []);

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    // sfjksdhhfhsjk
    newsAndBlogs: Application[] = [];

    @Input()
    columns: TableColumn<Application>[] = [
        // {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
        // {label: 'Image', property: 'image', type: 'image', visible: true},
        {label: '?????????? ??????????????????', property: 'id', type: 'text', visible: true,
            cssClasses: ['font-medium']},
        {label: '?????????? ??????????????', property: 'objectId', type: 'text', visible: true,
            cssClasses: ['font-medium']},
        {label: '?????????????????? ??????????????????', property: 'title', type: 'text', visible: true},
        {label: '?????????? ??????????????????', property: 'authorId', type: 'text', visible: true},
        {label: '???????? ????????????', property: 'createdAt', type: 'text', visible: true},
        {label: '???????????? ????????????', property: 'type', type: 'text', visible: false},
        {label: '???????????? ????????????', property: 'sportType', type: 'text', visible: false,
            cssClasses: ['text-secondary', 'font-medium'], isObject: true, objectProperty: 'name'},
        {label: '?????? ??????????????????????', property: 'author', type: 'text', visible: false,
            cssClasses: ['text-secondary', 'font-medium'], isObject: true, objectProperty: 'email'},
        {label: 'Status', property: 'status', type: 'text', visible: false},
    ];

    params = null;
    searchCtrl = new FormControl();

    waitingApproveVal = false;
    modifiedVal = false;
    approvedVal = false;
    rejectedVal = false;

    waitingApproveDisable = false;
    modifiedDisable = false;
    approvedDisable = false;
    rejectedDisable = false;

    constructor(private dialog: MatDialog,
                private applicationsService: ApplicationsService,
                private router: Router,
                private authService: AuthService
    ) {}

    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngOnInit() {
        this.getNews();
    }

    ngAfterViewInit() {}

    changePageOptions(event: PageEvent): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getNews();
    }

    getNews(): void {
        const requestParams = {};

        requestParams['pageNumber'] = this.pageIndex;
        requestParams['pageSize'] = this.pageSize;

        // if (this.searchCtrl.value) {
        //     requestParams["searchString"] = this.searchCtrl.value;
        // }

        requestParams['applicationType'] = 'CONFIRM_TOURNAMENT_CREATION';
        requestParams['applicationStatus'] = 'ON_APPROVE';

        this.applicationsService.getPageableApplications(requestParams).subscribe(res => {
            this.dataSource.data = res.content;
            this.pageIndex = res.page;
            this.pageSize = res.size;
            this.length = res.total;

            this.waitingApproveDisable = false;
            this.modifiedDisable = false;
            this.approvedDisable = false;
            this.rejectedDisable = false;
        }, error => {
            this.waitingApproveDisable = true;
            this.modifiedDisable = false;
            this.approvedDisable = false;
            this.rejectedDisable = false;
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

    onLabelChange(change: MatSelectChange, row: NbModel) {
        // const index = this.newsAndBlogs.findIndex(c => c === row);
        // this.newsAndBlogs[index].labels = change.value;
        // this.subject$.next(this.newsAndBlogs);
    }

    navigateToNewsBlogDetails(newsId) {
        this.router.navigate(['/applications/tournament', newsId]);
    }

    setWaitingApprove(checked: boolean) {
        // this.waitingApproveVal = checked;
        // this.pageIndex = 0;
        //
        // this.waitingApproveDisable = true;
        // this.modifiedDisable = true;
        // this.approvedDisable = true;
        // this.rejectedDisable = true;

        this.getNews();
    }

    setModified(checked: boolean) {
        this.modifiedVal = checked;
        this.pageIndex = 0;

        this.waitingApproveDisable = true;
        this.modifiedDisable = true;
        this.approvedDisable = true;
        this.rejectedDisable = true;

        this.getNews();
    }

    setApproved(checked: boolean) {
        this.approvedVal = checked;
        this.pageIndex = 0;

        this.waitingApproveDisable = true;
        this.modifiedDisable = true;
        this.approvedDisable = true;
        this.rejectedDisable = true;

        this.getNews();
    }

    setRejected(checked: boolean) {
        this.rejectedVal = checked;
        this.pageIndex = 0;

        this.waitingApproveDisable = true;
        this.modifiedDisable = true;
        this.approvedDisable = true;
        this.rejectedDisable = true;

        this.getNews();
    }

    submitSearchText() {
        this.pageIndex = 0;
        this.getNews();
    }
}
