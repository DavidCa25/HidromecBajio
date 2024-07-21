import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';
import { Inventario } from '../models/inventory';

@Injectable({
    providedIn: 'root'
})

export class InventoryService{
    private url = environment.apiUrls.inventory

    constructor(private http: HttpClient){}

    getProductosInventario(): Observable<Inventario[]> {
        return this.http.get<Inventario[]>(this.url);
    }
    
    actualizarProductosInventario(inventario: Inventario): Observable<any> {
        return this.http.put<any>(`${this.url}/actualizar/${inventario.idProducto}`, inventario);
    }
      
}