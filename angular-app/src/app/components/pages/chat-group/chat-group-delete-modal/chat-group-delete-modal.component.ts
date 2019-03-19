import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChatGroup, User} from "../../../../model";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {ChatGroupHttpService} from "../../../../services/http/chat-group-http.service";

@Component({
  selector: 'chat-group-delete-modal',
  templateUrl: './chat-group-delete-modal.component.html',
  styleUrls: ['./chat-group-delete-modal.component.css']
})
export class ChatGroupDeleteModalComponent implements OnInit {

    chatGroup: ChatGroup = null;

    @Input()
    _chatGroupId: number;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    constructor(
        private chatGroupHttp: ChatGroupHttpService
    ) { }

    ngOnInit() {
    }

    @Input()
    set chatGroupId(value) {

        this._chatGroupId = value;
        if (this._chatGroupId) {
            this.chatGroupHttp.get(this._chatGroupId).
            subscribe(chatGroup => this.chatGroup = chatGroup);
        }

    }

    destroy(){
        this.chatGroupHttp.destroy(this._chatGroupId).
        subscribe((chatGroup) => {
            this.onSuccess.emit(chatGroup);
            this.modal.hide();
        }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }

}
