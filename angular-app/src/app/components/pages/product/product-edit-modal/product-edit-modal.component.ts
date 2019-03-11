import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Product} from "../../../../model";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import fieldsOptions from "../product-form/product-fields-options";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

    product: Product;
    form: FormGroup;
    errors = {};

    @Input()
    _productId: number;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    constructor(
        private productHttp: ProductHttpService,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(fieldsOptions.price.validationMessage.min)]],
            active: true
        });
    }

    ngOnInit() {
    }

    @Input()
    set productId(value) {

        this._productId = value;
        if (this._productId) {
            this.productHttp.get(this._productId).
            subscribe(
                product => this.form.patchValue(product),
                responseError => {
                    if (responseError.status === 401) {
                        this.modal.hide();
                    }
                })
            }

    }

    submit(){
        this.productHttp.update(this._productId, this.form.value)
            .subscribe((product) => {
                this.onSuccess.emit(product);
                this.modal.hide();
            }, error => this.onError.emit(error));
    }

    showErrors() {
        return Object.keys(this.errors).length != 0;
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }

}
