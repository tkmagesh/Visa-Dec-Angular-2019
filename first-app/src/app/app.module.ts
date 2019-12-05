import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ProductsComponent } from './products/products.component';
import { CalculatorResultComponent } from './calculator/calculatorResult.component';

import {CalculatorService } from './calculator/calculator.service';

@NgModule({
  declarations: [
    AppComponent
    , CalculatorComponent
    , ProductsComponent
    , CalculatorResultComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ CalculatorService ],
  bootstrap: [AppComponent, CalculatorComponent, ProductsComponent]
})
export class AppModule { }
