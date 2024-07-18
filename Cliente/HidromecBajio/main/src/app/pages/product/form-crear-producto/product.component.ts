import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-producto',
    templateUrl: './product.component.html'
})

export class AppFormProductoComponent implements OnInit{
    constructor(){

    }
    ngOnInit(): void {
        
    }
    
    hidden = false;

    toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}