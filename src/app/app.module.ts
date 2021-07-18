import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashDevComponent } from './dash-dev/dash-dev.component';
import { LinkDashDevService } from './link-dash-dev.service'; /*AgGridModule.withComponents([])*/
//import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, DashDevComponent],
  bootstrap: [AppComponent],
  providers: [
    //Unnecessary if providedIn: 'root'
    LinkDashDevService
  ]
})
export class AppModule {
  /*columnDefs = [{ field: 'make' }, { field: 'model' }, { field: 'price' }];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];*/
}
