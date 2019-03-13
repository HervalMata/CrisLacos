import { Injectable } from '@angular/core';
import scriptjs from 'scriptjs';
import * as firebase from 'firebase';
import firebaseConfig from '../../app/firebase-config';

declare const firebaseui;
(<any>window).firebase = firebase;

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  async makePhoneNumberForm(selectorElement: string) {
    const firebaseui = await this.getFirebaseUI();
    const uiConfig = {
      signInOptions : [
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            return false;
          }
        }
    }
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(selectorElement, uiConfig);
  }

    private async getFirebaseUI() : Promise<any> {
        return new Promise(((resolve, reject) => {
          if (window.hasOwnProperty('firebaseui')) {
            resolve(firebaseui);
            return;
          }

          scriptjs('http://www.gstatic.com/firebasejs/ui/3.4.0/firebase-ui-auth__pt.js', () => {
            resolve(firebaseui);
          });
        }));
    }

    getFirebase() {
      return firebase;
    }

    getUser() : Promise<firebase.User | null> {
        const currentUser = this.getCurrentUser();

        if (currentUser) {
          return Promise.resolve(currentUser);
        }
            return new Promise((resolve, reject) => {
        // @ts-ignore
                const unsubscribed = this.firebase
            .auth()
            .onAuthStateChanged(
                (user) => {
                  resolve(user);
                  unsubscribed();
                },
                (error) => {
                  reject(error);
                  unsubscribed();
                }
            );
      });
    }

    private getCurrentUser() {
        // @ts-ignore
        return this.firebase.auth().currentUser;
    }
}
