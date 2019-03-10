import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryHttpService} from "../../../../services/http/category-http.service";

@Component({
  selector: 'product-input-new-modal',
  templateUrl: './product-input-new-modal.component.html',
  styleUrls: ['./product-input-new-modal.component.css']
})
export class ProductInputNewModalComponent implements OnInit {

  form: FormGroup;
  errors = {};

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<any>();

  constructor(
      public categoryHttp: CategoryHttpService,
      private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
        name: [''],
        active: true
    });
  }

  ngOnInit() {
  }

  submit() {
    this.categoryHttp.create(this.form.value)
        .subscribe((category) => {
          this.form.reset({
              name: '',
              active: true
          });
          this.onSuccess.emit(category);
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
