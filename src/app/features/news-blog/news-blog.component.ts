import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';
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
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {fadeInUp400ms} from '../../../@vex/animations/fade-in-up.animation';
import {stagger40ms} from '../../../@vex/animations/stagger.animation';
import {NbModel} from '../../core/models/nb.model';
import {TableColumn} from '../../../@vex/interfaces/table-column.interface';
import {NewsAndBlogsService} from '../../core/service/news-and-blogs.service';
import {aioTableLabels, newsAndBlogsTableData} from '../../../static-data/aio-table-data';
import {CommonConstants} from '../../core/constant/CommonConstants';
import {NewsAndBlogs} from '../../core/models/news-and-blogs.model';
import {Router} from '@angular/router';

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
    dataSource: MatTableDataSource<NewsAndBlogs> = new MatTableDataSource();
    selection = new SelectionModel<NewsAndBlogs>(true, []);

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    // sfjksdhhfhsjk
    newsAndBlogs: NewsAndBlogs[];

    @Input()
    columns: TableColumn<NbModel>[] = [
        // {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
        // {label: 'Image', property: 'image', type: 'image', visible: true},
        {label: 'Title', property: 'title', type: 'text', visible: true, cssClasses: ['font-medium']},
        {label: 'Description', property: 'description', type: 'text', visible: false},
        {label: 'Short description', property: 'shortDescription', type: 'text', visible: false},
        {label: 'Content', property: 'content', type: 'text', visible: false},
        {label: 'Author', property: 'author', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium']},
        {label: 'Status', property: 'status', type: 'text', visible: true},
        // {label: 'Actions', property: 'actions', type: 'button', visible: true}
    ];

    params = null;
    searchCtrl = new FormControl();

    constructor(private dialog: MatDialog,
                private newsService: NewsAndBlogsService,
                private router: Router) {
    }

    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    getData() {
        return of(newsAndBlogsTableData.map(newsAndBlogs => new NbModel(newsAndBlogs.id, newsAndBlogs.imageSrc,
            newsAndBlogs.title, newsAndBlogs.description, newsAndBlogs.shortDescription,
            newsAndBlogs.content, newsAndBlogs.author, null, null)));
    }

    onChangePage(event: PageEvent) {
        this.params = {
            pageNo: event.pageIndex,
            pageSize: event.pageSize,
            sortBy: 'id'
        };
        // this.newsService.getNewsAndBlogs(this.params).subscribe(news => {
        //     this.paginator.length = news.totalElements;
        //     this.subject$.next(news.content);
        // });
    }


    ngOnInit() {
        // this.params = {
        //     pageNo: 0,
        //     pageSize: this.pageSize,
        //     sortBy: 'id'
        // };

        this.getNews();

        // this.newsService.getNewsAndBlogs(this.params).subscribe(res => {
        //     this.paginator.length = res.totalElements;
        //     this.subject$.next(res.content);
        // });

        // this.dataSource = new MatTableDataSource();

        // this.data$.pipe(
        //     filter<NbModel[]>(Boolean)
        // ).subscribe(newsAndBlog => {
        //     this.newsAndBlogs = newsAndBlog;
        //     this.dataSource.data = newsAndBlog;
        // });
    }

    getNews(): void {
        this.newsService.getNewsAndBlogsByStatus('WAITING_APPROVE').subscribe(res => {
            this.dataSource.data = res;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    createNewsAndBlogs() {
        this.dialog.open(ItemDetailComponent).afterClosed().subscribe((newsAndBlogs: NbModel) => {
            if (newsAndBlogs) {
                // this.newsAndBlogs.unshift(new NbModel(newsAndBlogs.id, newsAndBlogs.imageSrc,
                //     newsAndBlogs.title, newsAndBlogs.description, newsAndBlogs.shortDescription,
                //     newsAndBlogs.content, newsAndBlogs.author, null, null));
                // this.subject$.next(this.newsAndBlogs);
            }
        });
    }

    updateItem(newsAndBlogs: NbModel) {
        this.dialog.open(ItemDetailComponent, {
            data: {
                model: newsAndBlogs,
                mode: 'approve'
            },
        }).afterClosed().subscribe(updatedNewsAndBlogs => {
            console.log('Return item:', updatedNewsAndBlogs);
            if (updatedNewsAndBlogs) {
                const index = this.newsAndBlogs.findIndex((existingNewsAndBlogs) => existingNewsAndBlogs.id === updatedNewsAndBlogs.id);
                // this.newsAndBlogs[index] = new NbModel(updatedNewsAndBlogs.id, updatedNewsAndBlogs.imageSrc,
                //     updatedNewsAndBlogs.title, updatedNewsAndBlogs.description, updatedNewsAndBlogs.shortDescription,
                //     updatedNewsAndBlogs.content, updatedNewsAndBlogs.author, null, null);
                // this.subject$.next(this.newsAndBlogs);
                this.getNews();
            }
        });
    }

    deleteNewsAndBlogs(newsAndBlogs: NbModel) {
        // this.newsAndBlogs.splice(this.newsAndBlogs.findIndex((existingNewsAndBlogs) => existingNewsAndBlogs.id === newsAndBlogs.id), 1);
        // this.selection.deselect(newsAndBlogs);
        // this.subject$.next(this.newsAndBlogs);
    }

    deleteItems(newsAndBlogs: NewsAndBlogs[]) {
        newsAndBlogs.forEach(c => {
            this.newsService.deleteNewsAndBlogs(c.id).subscribe(res => {
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

    onLabelChange(change: MatSelectChange, row: NbModel) {
        // const index = this.newsAndBlogs.findIndex(c => c === row);
        // this.newsAndBlogs[index].labels = change.value;
        // this.subject$.next(this.newsAndBlogs);
    }

    navigateToNewsBlogDetails(newsId) {
        this.router.navigate(['/nb', newsId]);
    }
}
