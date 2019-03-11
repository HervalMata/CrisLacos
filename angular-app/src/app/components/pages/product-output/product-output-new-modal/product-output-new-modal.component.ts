import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";

@Component({
  selector: 'product-output-new-modal',
  templateUrl: './product-output-new-modal.component.html',
  styleUrls: ['./product-output-new-modal.component.css']
})
export class ProductOutputNewModalComponent implements OnInit {

    errors = {};

    @ViewChild(ModalComponent) modal: ModalComponent;

  constructor() { }

  ngOnInit() {
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
