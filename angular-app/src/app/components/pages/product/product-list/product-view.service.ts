import { Injectable } from '@angular/core';
import {ProductListComponent} from "./product-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductViewService {

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value;
    }

    showModalView(productId: number) {
        this._productListComponent.productId = productId;
        this._productListComponent.productViewModal.showModal();
    }


    onViewError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Não foi possível consultar o produto!.`);
    }
}
