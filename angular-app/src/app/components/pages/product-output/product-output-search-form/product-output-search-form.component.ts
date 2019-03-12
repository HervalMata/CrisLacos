import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'product-output-search-form',
  templateUrl: './product-output-search-form.component.html',
  styleUrls: ['./product-output-search-form.component.css']
})
export class ProductOutputSearchFormComponent implements OnInit {

    search = '';

    @Output()
    OnSearch: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    submit() {
        this.OnSearch.emit(this.search);
        return false;
    }

}
