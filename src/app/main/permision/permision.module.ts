import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisionComponent } from './permision.component';
import { AppRoutingModule } from './app-routing.module';
import { ShowPerComponent } from './show-per/show-per.component';
import { MainModule } from '../main.module';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';



@NgModule({
  declarations: [
    PermisionComponent,
    ShowPerComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MainModule,
  ]
})
export class PermisionModule { }
