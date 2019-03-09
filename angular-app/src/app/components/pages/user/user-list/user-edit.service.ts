import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserListComponent} from "./user-list.component";

@Injectable({
  providedIn: 'root'
})
export class UserEditService {

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent;
    }

    showModalEdit(userId: number) {
        this._userListComponent.userId = userId;
        this._userListComponent.userEditModal.showModal();
    }

    onEditSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success(`Usuário atualizado com sucesso!.`);
        this._userListComponent.getUsers();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Não foi possível atualizar o usuário!
            Tente novamente.`);
    }
}
