import { Component } from '@angular/core';

/**
 * Generated class for the ComponentsChatGroupListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'chat-group-list',
  templateUrl: 'chat-group-list.html',
})
export class ChatGroupListComponent {

  text: string;

  constructor() {
    console.log('Hello ChatGroupListComponent Component');
    this.text = 'Hello World';
  }

}
