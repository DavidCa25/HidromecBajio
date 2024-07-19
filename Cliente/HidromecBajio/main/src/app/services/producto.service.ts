import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';
import { Producto } from '../models/producto';

@Injectable({
    providedIn: 'root'
})

export class ProductoService{
    private url = environment.apiUrls.producto

    constructor(private http: HttpClient){}

    addProducto(producto: Producto): Observable<any>{
        return this.http.post(this.url + '/addProducto', producto)
    }
}