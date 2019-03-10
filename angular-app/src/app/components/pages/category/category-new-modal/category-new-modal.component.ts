import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import fieldsOptions from "../category-form/category-fields-options";

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    form: FormGroup;


  constructor(
      private categoryHttp: CategoryHttpService,
      private formBuilder: FormBuilder
      ) {
      const maxlength = fieldsOptions.name.validationMessage.maxlength;
      this.form = this.formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(maxlength)]],
          active: true
      })
  }

  ngOnInit() {
  }

  submit(){
      this.categoryHttp.create(this.form.value)
      .subscribe((category) => {
        this.onSuccess.emit(category);
        this.modal.hide();
      }, error => this.onError.emit(error));
  }


    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }

}
