import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ChatGroupListComponent} from "./chat-group-list.component";

@Injectable({
  providedIn: 'root'
})
export class ChatGroupEditService {

    private _chatGroupListComponent: ChatGroupListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set chatGroupListComponent(value: ChatGroupListComponent) {
        this._chatGroupListComponent = value;
    }

    showModalEdit(chatGroupId: number) {
        this._chatGroupListComponent.chatGroupId = chatGroupId;
        this._chatGroupListComponent.chatGroupEditModal.showModal();
    }

    onEditSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success(`Grupo atualizado com sucesso!.`);
        this._chatGroupListComponent.getChatGroups();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Não foi possível atualizar o grupo!
            Tente novamente.`);
    }
}
