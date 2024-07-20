import { Routes } from '@angular/router';
import { InventoryFormComponent } from './inventoryView/inventory.component';


// producto


export const inventoryComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'inventoryView',
        component: InventoryFormComponent
      },
      
    ],
  },
];
