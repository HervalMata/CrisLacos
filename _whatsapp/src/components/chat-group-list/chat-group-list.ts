import { Component } from '@angular/core';
import {FirebaseAuthProvider} from "../../providers/firebase-auth/firebase-auth";

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

  constructor(private firebaseAuth: FirebaseAuthProvider) {
  }

  ngOnInit() {
    const database = this.firebaseAuth.firebase.database();
    database.ref('chat_groups').on('value', function (data) {
      console.log(data.val());
    })
  }
}