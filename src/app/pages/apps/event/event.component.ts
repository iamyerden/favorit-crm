import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'vex-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  layoutCtrl = new FormControl('boxed');

  constructor() { }

  ngOnInit(): void {
  }

}
