import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../enviroments/enviroments';
import { Producto } from '../models/producto';

@Injectable({
    providedIn: 'root'
})
export class UserService{

    private url = environment.apiUrls.auth;

    constructor(private http: HttpClient) {}
  
    login(user: User): Observable<any> {
      return this.http.post(`${this.url}/iniciarSesion`, user);
    }
  
    registrar(user: User): Observable<any> {
      return this.http.post(`${this.url}/registro`, user);
    }
}
