import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AppRoutingModule } from './app-routing.module';
import { ShowUserComponent } from './show-user/show-user.component';
import { MainModule } from '../main.module';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { PermisionComponent } from './permision/permision.component';



@NgModule({
  declarations: [
    UserComponent,
    ShowUserComponent,
    CreateComponent,
    UpdateComponent,
    PermisionComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MainModule
  ]
})
export class UserModule { }
