import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchParams, SearchParamsBuilder} from "./http-resource";
import {Observable} from "rxjs";
import {User} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

    private baseUrl = 'http://localhost:8000/api/users';
    private token = window.localStorage.getItem('token');

    constructor(private http: HttpClient) { }

    list(searchParams: SearchParams) : Observable<{data: Array<User>, meta: any}> {

        const sParams: any = new SearchParamsBuilder(searchParams).makeObject();

        const params = new HttpParams({
            fromObject: (<any>sParams)
        });

        return this.http.get<{data: Array<User>, meta: any}>
        (this.baseUrl, {
            params,
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        });
    }

    get(id: number) : Observable<User> {
        return this.http.get<{data: User}>
        (`{this.baseUrl}/${id}`, {
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        })
            .pipe(
                map(response => response.data )
            );
    }

    create(data: User) : Observable<User> {
        return this.http.post<{data: User}>
        (this.baseUrl, data,{
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        })
            .pipe(
                map(response => response.data )
            );
    }

    update(id: number, data: User) : Observable<User> {
        return this.http.put<{data: User}>
        (`${this.baseUrl}/${id}`, data,{
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        })
            .pipe(
                map(response => response.data )
            );
    }

    destroy(id: number) {
        return this.http.delete<{data: User}>
        (`${this.baseUrl}/${id}`,{
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        });
    }
}
