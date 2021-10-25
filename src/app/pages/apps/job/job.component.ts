import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'vex-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  layoutCtrl = new FormControl('boxed');

  constructor() { }

  ngOnInit(): void {
  }

}
