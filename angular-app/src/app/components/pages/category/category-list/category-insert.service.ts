import { Injectable } from '@angular/core';
import {CategoryListComponent} from "./category-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryInsertService {

    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value;
    }

    showModalInsert() {
        this._categoryListComponent.categoryNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success(`Categoria cadastrada com sucesso!.`);
        this._categoryListComponent.getCategories();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Erro ao cadastrar a categoria!.`);
    }
}
