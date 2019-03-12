import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductInput} from "../../../../model";
import {ProductInputHttpService} from "../../../../services/http/product-input-http.service";
import {ProductInputInsertService} from "./product-input-insert.service";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";

@Component({
  selector: 'product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.css']
})
export class ProductInputListComponent implements OnInit {

  inputs: Array<ProductInput> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  }

  sortColumn = {column: 'id', sort: 'asc'};

    @ViewChild(ModalComponent) modal: ModalComponent;

  @ViewChild(ProductInputListComponent) inputNewModal: ProductInputListComponent;

  searchText: string;

  constructor(
      private productInputHttp: ProductInputHttpService,
      protected productInputInsertService: ProductInputInsertService,
  ) { this.productInputInsertService.inputListComponent = this;}

  ngOnInit() {
    console.log('ngOnInit');
    this.getInputs();
  }

  getInputs() {
     this.productInputHttp.list({
         page: this.pagination.page,
         sort: this.sortColumn.sort === '' ? null : this.sortColumn,
         search: this.searchText
     })
     .subscribe(response => {
       console.log(response);
       this.inputs = response.data;
       this.pagination.totalItems = response.meta.totalItems;
       this.pagination.itemsPerPage = response.meta.per_page;
     })
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getInputs();
  }

  sort(sortColumn) {
    this.getInputs();
  }

  search(search) {
    console.log(search);
    this.searchText = search;
    this.getInputs();
  }

    showModal() {
        this.modal.show();
    }
}
