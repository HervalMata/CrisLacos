import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserListComponent} from "./user-list.component";

@Injectable({
  providedIn: 'root'
})
export class UserInsertService {

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value;
    }

    showModalInsert(userId: number) {
        this._userListComponent.userId = userId;
        this._userListComponent.userEditModal.showModal();
    }

    onInsertSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success(`Usuário cadastrado com sucesso!.`);
        this._userListComponent.getUsers();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Erro ao cadastrar o usuário!.`);
    }
}
