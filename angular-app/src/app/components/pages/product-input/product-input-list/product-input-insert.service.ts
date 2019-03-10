import { Injectable } from '@angular/core';
import {ProductInputListComponent} from "./product-input-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductInputInsertService {

  private _inputListComponent: ProductInputListComponent;

  constructor(private notifyMessage: NotifyMessageService) { }

  set inputListComponent(value: ProductInputListComponent) {
    this._inputListComponent = value;
  }

  showModalInsert() {
    this._inputListComponent.inputNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    this.notifyMessage.success('Entrada de produto cadastrada com sucesso!.');
    console.log($event);
    this._inputListComponent.getInputs();
  }

  onInsertErrors($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao cadastrar entrada de produto!.')
  }
}
