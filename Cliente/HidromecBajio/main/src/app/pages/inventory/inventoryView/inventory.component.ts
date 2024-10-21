import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Inventario } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'inventory-component',
  templateUrl: './inventory.component.html',
})
export class InventoryFormComponent implements OnInit {
  listProductoInventario: Inventario[] = [];
  inventarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _inventarioService: InventoryService
  ) {
    this.inventarioForm = this.fb.group({
      productos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this._inventarioService.getProductosInventario().subscribe(
      response => {
        this.listProductoInventario = response;
        console.log('Productos inventario:', this.listProductoInventario); 
        this.populateForm();
      },
      error => {
        console.error(error);
      }
    );
  }

  get productos(): FormArray {
    return this.inventarioForm.get('productos') as FormArray;
  }

  private populateForm() {
    this.listProductoInventario.forEach(producto => {
      this.productos.push(this.fb.group({
        idProducto: [producto.idProducto.idProducto],
        stockMin: [producto.stockMin, Validators.required],
        stockMax: [producto.stockMax, Validators.required],
        cantidad: [producto.cantidad, Validators.required],
      }));
    });
  }

  actualizarProducto(index: number): void {
    const productoFormGroup = this.productos.at(index) as FormGroup;

    if (productoFormGroup.valid) {
        const inventarioFormActualizar: Inventario = {
            ...productoFormGroup.value,
            idProducto: this.listProductoInventario[index].idProducto.idProducto 
        };

        console.log('Datos enviados para actualizar:', inventarioFormActualizar);

        this._inventarioService.actualizarProductosInventario(inventarioFormActualizar).subscribe(
            response => {
                console.log('Respuesta del servidor:', response);
                this.toastr.success('Producto actualizado correctamente', 'Éxito');
            },
            error => {
                console.error('Error al actualizar producto:', error);
                this.toastr.error('No se pudo actualizar el producto', 'Error');
            }
        );
    } else {
        console.error('Formulario no válido:', productoFormGroup.errors);
        this.toastr.warning('El formulario contiene errores. Por favor, revisa los campos.', 'Advertencia');
    }
  }
}
