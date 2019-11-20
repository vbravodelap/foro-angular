import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
    public url = global.url;
    public identity: any ;
    public token: any;

    constructor(private _http: HttpClient) {

    }

    register(user): Observable<any> {
        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save', params, { headers });
    }

    signup(user, gettoken = null): Observable<any> {
        if ( gettoken != null ) {
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'login', params, { headers });
    }

    getIdentity() {
        const identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != null && identity !== undefined && identity !== 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        const token = localStorage.getItem('session_token');

        if (token && token != null && token !== undefined && token !== 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }
}