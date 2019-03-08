import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {Category} from "../../../../model";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import {NotifyMessageService} from "../../../../services/notify-message.service";

declare let $;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    categories: Array<Category> = [];

    @ViewChild(CategoryNewModalComponent)
    categoryNewModal: CategoryNewModalComponent;

    @ViewChild(CategoryEditModalComponent)
    categoryEditModal: CategoryEditModalComponent;

    @ViewChild(CategoryDeleteModalComponent)
    categoryDeleteModal: CategoryDeleteModalComponent;

    categoryId: number;

    constructor(
        private categoryHttp: CategoryHttpService,
        private notifyMessage: NotifyMessageService
        ) {
//      console.log('construtor');
    }

    ngOnInit() {
        this.getCategories();
    }

    showModalInsert() {
        this.categoryNewModal.showModal();
    }

    showModalEdit(categoryId: number) {
        this.categoryId = categoryId;
        this.categoryEditModal.showModal();
    }

    showModalDelete(categoryId: number) {
        this.categoryId = categoryId;
        this.categoryEditModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success(`Categoria cadastrada com sucesso!.`);
        console.log($event);
        this.getCategories();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Erro ao cadastrar a categoria!.`);
    }

    onEditSuccess($event: any) {
        console.log($event);
        this.getCategories();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
    }

    onDeleteSuccess($event: any) {
        console.log($event);
        this.getCategories();
    }

    onDeleteError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error(`Não foi possível excluir a categoria!
            Verifique se a mesma não está relacionada com produtos.`);
    }

    getCategories() {
        this.categoryHttp.list().
            subscribe((response) => {this.categories = response.data});
    }

}
