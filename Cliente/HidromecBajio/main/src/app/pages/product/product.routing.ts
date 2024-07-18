import { Routes } from '@angular/router';
import { AppFormProductoComponent } from './form-crear-producto/product.component';

// producto


export const ProductosComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'form-crear-producto',
        component: AppFormProductoComponent
      },
      
    ],
  },
];
