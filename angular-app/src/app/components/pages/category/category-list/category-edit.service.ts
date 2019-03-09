import { Injectable } from '@angular/core';
import {CategoryListComponent} from "./category-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryEditService {

    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value;
    }

    showModalEdit(categoryId: number) {
      this._categoryListComponent.categoryId = categoryId;
      this._categoryListComponent.categoryEditModal.showModal();
    }

    onEditSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success(`Categoria atualizada com sucesso!.`);
        this._categoryListComponent.getCategories();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Não foi possível atualizar a categoria!
            Tente novamente.`);
    }
}
