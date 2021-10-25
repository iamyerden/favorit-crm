import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'vex-news-blog',
    templateUrl: './news-blog.component.html',
    styleUrls: ['./news-blog.component.scss']
})
export class NewsBlogComponent implements OnInit {
    layoutCtrl = new FormControl('boxed');

    constructor() {
    }

    ngOnInit(): void {
    }

}
