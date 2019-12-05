import { Component } from '@angular/core';

@Component({
    selector : 'app-products',
    template : `
        <h1>Products</h1>
        <hr>
        <label for="">Product Name :</label>
        <input type="text" #txtNewProductName>
        <input type="button" value="Add New" (click)="onAddClick(txtNewProductName.value)">
        <ol>
            <li *ngFor="let product of productList">{{product}}</li>
        </ol>
        <div *ngIf="productList.length > 0" >[{{productList.length}}] products found!!</div>
    `
})
export class ProductsComponent{
    productList : string[] = [ ];

    onAddClick(newProductName : string){
        this.productList.push(newProductName);
    }
}