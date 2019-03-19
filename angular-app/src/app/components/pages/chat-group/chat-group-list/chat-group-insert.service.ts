import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ChatGroupListComponent} from "./chat-group-list.component";

@Injectable({
  providedIn: 'root'
})
export class ChatGroupInsertService {

    private _chatGroupListComponent: ChatGroupListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set chatGroupListComponent(value: ChatGroupListComponent) {
        this._chatGroupListComponent = value;
    }

    showModalInsert(chatGroupId: number) {
        this._chatGroupListComponent.chatGroupId = chatGroupId;
        this._chatGroupListComponent.chatGroupEditModal.showModal();
    }

    onInsertSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success(`Grupo cadastrado com sucesso!.`);
        this._chatGroupListComponent.getChatGroups();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Não foi possível cadastrar o grupo!. Tente novamente`);
    }
}
