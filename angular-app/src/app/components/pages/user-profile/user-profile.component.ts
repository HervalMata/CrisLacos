import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserHttpService} from "../../../services/http/user-http.service";
import {UserProfileHttpService} from "../../../services/http/user-profile-http.service";
import {NotifyMessageService} from "../../../services/notify-message.service";
import fieldsOptions from "../user/user-form/user-fields-options";
import {AuthService} from "../../../services/auth.service";
import {PhoneNumberAuthModalComponent} from "../../common/phone-number-auth-modal/phone-number-auth-modal.component";
import {FirebaseAuthService} from "../../../services/firebase-auth-service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form: FormGroup;
  errors = {};
  has_photo: boolean;

  @ViewChild(PhoneNumberAuthModalComponent)
  phoneNumberAuthModal: PhoneNumberAuthModalComponent;

  constructor(
      private userProfileHttp: UserProfileHttpService,
      private formBuilder: FormBuilder,
      private notifyMessage: NotifyMessageService,
      public authService: AuthService,
      private firebaseAuth: FirebaseAuthService
  ) {
      this.form = this.formBuilder.group({
          name: ['', [Validators.maxLength(fieldsOptions.name.validationMessage.maxLength)]],
          email: ['', [Validators.email, Validators.maxLength(fieldsOptions.email.validationMessage.maxLength)]],
          password: ['', [Validators.min(fieldsOptions.password.validationMessage.minLength), Validators.maxLength(fieldsOptions.password.validationMessage.maxLength)]],
          phone_number: null,
          token: null,
          photo: false
      });

      this.form.patchValue(this.authService.me);
      this.form.get('phone_number').setValue(this.authService.me.profile.phone_number);
      this.setHasPhoto();
  }

  ngOnInit() {
  }

  get fieldOptions() : any {
      return fieldsOptions;
  }

    submit(){
        const data = Object.assign({}, this.form.value);
        delete data.phone_number;

        this.userProfileHttp.update(data)
            .subscribe((data) => {
                this.form.get('photo').setValue(false);
                this.form.get('token').setValue(null);
                this.setHasPhoto();
                this.notifyMessage.success('Perfil atualizado com sucesso!.')}
                    , (responseError) => {
                    if (responseError.status === 422) {
                        this.errors = responseError.error.errors;
                    }
                }
            );
        return false;


    }

    setHasPhoto() {
        this.has_photo = this.authService.me.profile.has_photo;
    }
    removePhoto() {
      this.form.get('photo').setValue(null);
      this.has_photo = false;
    }

    onChoosePhoto(files: FileList) {
      if (!files.length) {
        return;
      }

      this.form.get('photo').setValue(files[0]);
    }

    openPhoneNumberAuthModal() {
      this.phoneNumberAuthModal.showModal();
    }

    onPhoneNumberVerification() {
      this.firebaseAuth.getUser().then(user => this.form.get('phone_number').setValue(user.phoneNumber));
      this.firebaseAuth.getToken().then(token => this.form.get('token').setValue(token));
    }

    showErrors() {
      return Object.keys(this.errors).length != 0;
    }
}
