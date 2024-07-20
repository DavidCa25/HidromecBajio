import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';


import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MatNativeDateModule } from '@angular/material/core';
import { InventoryFormComponent } from './inventoryView/inventory.component';
import { inventoryComponentsRoutes } from './inventory.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(inventoryComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
  ],
  declarations: [
    InventoryFormComponent
  ],
})
export class inventorycomponentsModule {}
