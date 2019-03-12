import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductInput} from "../../../../model";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ProductOutputHttpService} from "../../../../services/http/product-output-http.service";
import {ProductOutputInsertService} from "./product-output-insert.service";

@Component({
  selector: 'product-output-list',
  templateUrl: './product-output-list.component.html',
  styleUrls: ['./product-output-list.component.css']
})
export class ProductOutputListComponent implements OnInit {

    outputs: Array<ProductInput> = [];

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    }

    sortColumn = {column: 'id', sort: 'asc'};

    @ViewChild(ModalComponent) modal: ModalComponent;

    @ViewChild(ProductOutputListComponent) outputNewModal: ProductOutputListComponent;

    searchText: string;

    constructor(
        private productOutputHttp: ProductOutputHttpService,
        protected productOutputInsertService: ProductOutputInsertService,
    ) { this.productOutputInsertService.outputListComponent = this;}

    ngOnInit() {
        console.log('ngOnInit');
        this.getOutputs();
    }

    getOutputs() {
        this.productOutputHttp.list({
            page: this.pagination.page,
            sort: this.sortColumn.sort === '' ? null : this.sortColumn,
            search: this.searchText
        })
            .subscribe(response => {
                console.log(response);
                this.outputs = response.data;
                this.pagination.totalItems = response.meta.totalItems;
                this.pagination.itemsPerPage = response.meta.per_page;
            })
    }

    pageChanged(page) {
        this.pagination.page = page;
        this.getOutputs();
    }

    sort(sortColumn) {
        this.getOutputs();
    }

    search(search) {
        console.log(search);
        this.searchText = search;
        this.getOutputs();
    }

    showModal() {
        this.modal.show();
    }

}
