import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model";

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {

  variavel = 'Herval';

  constructor(private http: HttpClient) { }

  list() : Observable<{data: Array<Category>}> {
      const token = window.localStorage.getItem('token'); // Pega o token da API.
      return this.http.get<{data: Array<Category>}>
      ('http://localhost:8000/api/categories', {
          headers: {
              'Authorization' : `Bearer ${token}`
          }
      });
  }

  get() {

  }

  create() {

  }

  update() {

  }

  destroy() {

  }
}
