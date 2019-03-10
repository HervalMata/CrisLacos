import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'product-search-form',
  templateUrl: './product-search-form.component.html',
  styleUrls: ['./product-search-form.component.css']
})
export class ProductSearchFormComponent implements OnInit {

  search = '';

  @Output()
  onSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  submit() {
     this.onSearch.emit(this.search);
     return false;
   }
}
