import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from "src/app/models/producto";
import { ProductoService } from "src/app/services/producto.service";

@Component({
    selector: 'app-producto',
    templateUrl: './product.component.html'
})

export class AppFormProductoComponent implements OnInit{
    agregarProductoForm: FormGroup;
    
    constructor(
      private toastr: ToastrService,
      private route: Router,
      private _productoService: ProductoService

    ){
      this.agregarProductoForm = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      producto: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      precio: new FormControl('',[Validators.required]),
      cantidad: new FormControl('', [Validators.required])
    })
    }
    ngOnInit(): void {
        
    }
    
    hidden = false;

    toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  showSuccess(){
      this.toastr.info('El Producto fue registrado con éxito', 'Producto Registrado', {
      timeOut: 3000,
      }
  )}
    showError(){
      this.toastr.error('Error', 'No se pudo registrar el producto', {
      timeOut: 3000,
      }
  )}
  showInfo(){
      this.toastr.info('El Producto fue registrado con éxito', 'Producto Registrado', {
      timeOut: 3000,
      closeButton: true,
    });
  }

  submit() {
    if(this.agregarProductoForm.valid){
      const productoForm: Producto = {

        codigo: this.agregarProductoForm.get('codigo')?.value,
        producto: this.agregarProductoForm.get('producto')?.value,
        descripcion: this.agregarProductoForm.get('descripcion')?.value,
        categoria: this.agregarProductoForm.get('categoria')?.value,
        precio: this.agregarProductoForm.get('precio')?.value,
        cantidad: this.agregarProductoForm.get('cantidad')?.value
      }   

      this._productoService.addProducto(productoForm).subscribe(response =>{
          this.showSuccess();
       
      },error =>{
        console.log(error);
        this.agregarProductoForm.reset();
        this.showError();
      });
    } 
  }
}