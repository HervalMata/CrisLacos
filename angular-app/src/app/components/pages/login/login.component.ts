import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    credentials = {
        email : 'admin@user.com',
        password: 'secret'
    };

    // ###################################### INFORMAÇÕES IMPORTANTES ########################################
    // property biding -> [innerHTML]
    // Símbolo [] - O TS(Type Script) reflete alterações no template | Dados alteram ---> Template
    // Símbolo () - O Evento reflete alterações no TS(Type Script) | Template alteram ---> Dados
    // Two way data biding

    constructor(private http: HttpClient, private router: Router) { // injeção de dependência automática

    }

    ngOnInit() {

    }

    submit(){
        // Enviar uma requisição ajax com as credenciais para API
        this.http.post<any>('http://localhost:8000/api/login', this.credentials)
            .subscribe((data) => {
                this.router.navigate(['categories/list']);
                const token = data.token;
                window.localStorage.setItem('token', token);
                this.router.navigate(['categories/list']);
            });

        return false;
    }

}
