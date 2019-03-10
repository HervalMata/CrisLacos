import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {Category} from "../../../../model";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

    category: Category = {
        name: '',
        active: true
    };

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    form: FormGroup;


  constructor(private categoryHttp: CategoryHttpService) {}

  ngOnInit() {
  }

  submit(){
      this.categoryHttp.create(this.category)
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
