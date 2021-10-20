import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { AppRoutingModule } from './app-routing.module';
import { ShowProductComponent } from './show-product/show-product.component';
import { MainModule } from '../main.module';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';



@NgModule({
  declarations: [
    ProductComponent,
    ShowProductComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    CKEditorModule,
    MainModule
    
  ]
})
export class ProductModule { }
