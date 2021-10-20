import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { AppRoutingModule } from './app-routing.module';
import { ShowComponent } from './components/show/show.component';
import { OptionComponent } from './components/show/option/option.component';
import { TableComponent } from './components/show/table/table.component';
import { PaginateComponent } from './components/show/paginate/paginate.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';




@NgModule({
  declarations: [
    MainComponent,
    ShowComponent,
    OptionComponent,
    TableComponent,
    PaginateComponent,
    InputComponent,
    SelectComponent,
   
  ],
  exports: [
    MainComponent, 
    ShowComponent, 
    InputComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class MainModule { }
