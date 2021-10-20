import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesGuard } from 'src/app/core/guards/roles.guard';
import { CreateComponent } from './create/create.component';
import { ProductComponent } from './product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'index', pathMatch: 'full'
  },
  {
    path: 'index', component: ShowProductComponent, canActivate: [RolesGuard]
  },
  {
    path: 'create', component: CreateComponent, canActivate: [RolesGuard]
  },
  {
    path: 'update/:id', component: UpdateComponent, canActivate: [RolesGuard]
  },
  {
    path: '**', redirectTo: 'index', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
