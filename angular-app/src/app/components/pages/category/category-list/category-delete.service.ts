import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryDeleteService {

  private _categoryListComponent: CategoryListComponent;

  constructor(private notifyMessage: NotifyMessageService) { }

  set categoryListComponent(value: CategoryListComponent) {
    this._categoryListComponent = value;
  }

  showModalDelete(categoryId: number) {
    this._categoryListComponent.categoryId = categoryId;
    this._categoryListComponent.categoryDeleteModal.showModal();
  }

  onDeleteSuccess($event: any) {
    console.log($event);
    this.notifyMessage.success(`Categoria excluída com sucesso!.`);
    this._categoryListComponent.getCategories();
  }

  onDeleteError($event: HttpErrorResponse) {
      console.log($event);
      this.notifyMessage.error(`Não foi possível excluir a categoria!
            Verifique se a mesma não está relacionada com produtos.`);
  }
}
