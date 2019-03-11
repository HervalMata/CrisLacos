import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductInputHttpService} from "../../../../services/http/product-input-http.service";
import {ProductOutputHttpService} from "../../../../services/http/product-output-http.service";
import fieldsOptions from "../../product-input/product-input-form/product-input-fields-options";

@Component({
  selector: 'product-output-new-modal',
  templateUrl: './product-output-new-modal.component.html',
  styleUrls: ['./product-output-new-modal.component.css']
})
export class ProductOutputNewModalComponent implements OnInit {

    form: FormGroup;
    errors = {};

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<any>();

  constructor(
      public productOutputHttp: ProductOutputHttpService,
      private formBuilder: FormBuilder
  ) {
      this.form = this.formBuilder.group({
          product_id: ['null', Validators.required],
          amount: ['', [Validators.required, Validators.min(fieldsOptions.amount.validationMessage.min)]],
      });
  }

  ngOnInit() {
  }

    submit() {
        this.productOutputHttp.create(this.form.value)
            .subscribe((output) => {
                this.form.reset({
                    amount: '',
                    product_id: null
                });
                this.onSuccess.emit(output);
                this.modal.hide();
            }, responseError => {
                if (responseError.status === 422) {
                    this.errors = responseError.error.errors;
                }
                this.onError.emit(responseError)
            });
    }

    showModal() {
        this.modal.show();
    }

    showErrors() {
        return Object.keys(this.errors).length != 0;
    }

    hideModal($event: Event) {
        console.log($event);
    }
}
