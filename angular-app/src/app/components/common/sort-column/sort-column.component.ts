import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[sortcolumn]',
  templateUrl: './sort-column.component.html',
  styleUrls: ['./sort-column.component.css']
})
export class SortColumnComponent implements OnInit {

  constructor() { }

  @Input()
  sortColumn : {column: string, sort: string};
  @Input()
  columnName: string;

  ngOnInit() {
  }

}
