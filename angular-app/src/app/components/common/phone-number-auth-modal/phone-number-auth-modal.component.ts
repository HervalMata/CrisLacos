import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../bootstrap/modal/modal.component";
import { FirebaseAuthService } from '../../../services/firebase-auth-service';

@Component({
  selector: 'phone-number-auth-modal',
  templateUrl: './phone-number-auth-modal.component.html',
  styleUrls: ['./phone-number-auth-modal.component.css']
})
export class PhoneNumberAuthModalComponent implements OnInit {

    unsubscribed;

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fiebaseAuth: FirebaseAuthService) { }

  ngOnInit() {
    this.fiebaseAuth.makePhoneNumberForm('#firebase-ui');
  }

  showModal() {
    this.fiebaseAuth.makePhoneNumberForm('#firebase-ui');
    this.fiebaseAuth.logout().then(() => {
        this.onAuthStateChanged();
    });
    this.modal.show();
  }

  onAuthStateChanged() {
     // @ts-ignore
      this.unsubscribed = this.fiebaseAuth.firebase.auth().onAuthStateChanged((user) => {
         if (user) {
             this.modal.hide();
             this.onSuccess.emit(user);
         }
     })
  }

  onHideModal() {
      this.unsubscribed();
  }
}
