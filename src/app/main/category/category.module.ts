import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { AppRoutingModule } from './app-routing.module';
import { ShowCateComponent } from './show-cate/show-cate.component';
import { MainModule } from '../main.module';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';




@NgModule({
  declarations: [
    CategoryComponent,
    ShowCateComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MainModule
  ]
})
export class CategoryModule { }
