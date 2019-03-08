import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductListComponent} from "./product-list.component";

@Injectable({
  providedIn: 'root'
})
export class ProductEditService {

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent;
    }

    showModalEdit(productId: number) {
        this._productListComponent.productId = productId;
        this._productListComponent.productEditModal.showModal();
    }

    onEditSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success(`Produto atualizado com sucesso!.`);
        this._productListComponent.getProducts();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Não foi possível atualizar o produto!
            Tente novamente.`);
    }
}
