import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    credentials = {
    email : 'admin@user.com',
    password : 'secret'
  };

    showMessageError = false;

    //###################################### INFORMAÇÕES IMPORTANTES ########################################
    //property biding -> [innerHTML]
    //Símbolo [] - O TS(Type Script) reflete alterações no template | Dados alteram ---> Template
    //Símbolo () - O Evento reflete alterações no TS(Type Script) | Template alteram ---> Dados
    //Two way data biding

  constructor(
      private authService: AuthService,
      private router: Router
  ) { //injeção de dependência automática
  }

  ngOnInit() {
  }

  submit(){
        //Enviar uma requisição ajax com as credenciais para API
        this.authService.login(this.credentials)
            .subscribe((data) => {
                const token = data.token;
                window.localStorage.setItem('token', token);
                this.router.navigate(['categories/list']);
            }, () => this.showMessageError = true);

        return false;
  }

}
