import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserHttpService} from "../../../services/http/user-http.service";
import {UserProfileHttpService} from "../../../services/http/user-profile-http.service";
import {NotifyMessageService} from "../../../services/notify-message.service";
import fieldsOptions from "../user/user-form/user-fields-options";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form: FormGroup;
  errors = {};

  constructor(
      private userProfileHttp: UserProfileHttpService,
      private formBuilder: FormBuilder,
      private notifyMessage: NotifyMessageService
  ) {
      this.form = this.formBuilder.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.min(fieldsOptions.price.validationMessage.minLength)]],
          phone_number: null,
          photo: false
      });
  }

  ngOnInit() {
  }

    submit(){
        this.userProfileHttp.update(this.form.value)
            .subscribe((data) => this.notifyMessage.success('Perfil atualizado com sucesso!.')
            , responseError => {
                if (responseError.status === 422) {
                    this.errors = responseError.error.errors;
                }
            });
        return false;
    }

    onChoosePhoto(files: FileList) {
      if (!files.length) {
        return;
      }

      this.form.get('photo').setValue(files[0]);
    }

    showErrors() {
      return Object.keys(this.errors).length != 0;
    }
}
