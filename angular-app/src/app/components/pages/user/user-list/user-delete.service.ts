import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserListComponent} from "./user-list.component";

@Injectable({
  providedIn: 'root'
})
export class UserDeleteService {

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent;
    }

    showModalDelete(userId: number) {
        this._userListComponent.userId = userId;
        this._userListComponent.userDeleteModal.showModal();
    }

    onDeleteSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success(`Usuário excluído com sucesso!.`);
        this._userListComponent.getUsers();
    }

    onDeleteError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Não foi possível excluir o usuário!
            Verifique se a mesmo não está relacionado com produtos.`);
    }
}
