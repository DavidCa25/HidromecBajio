import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService{
    url = 'http://localhost:3001/auth'

    constructor(private http: HttpClient){}

    login(user: User): Observable<any>{
        return this.http.post(this.url + '/iniciarSesion', user);
    }

    registrar(user: User): Observable<any>{
        return this.http.post(this.url + '/registro', user)
    }
}