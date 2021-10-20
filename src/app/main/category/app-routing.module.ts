import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CreateComponent } from './create/create.component';
import { ShowCateComponent } from './show-cate/show-cate.component';
import { UpdateComponent } from './update/update.component';
import { RolesGuard } from './../../core/guards/roles.guard';


const routes: Routes = [
  {
    path: '', redirectTo: 'index', pathMatch: 'full', 
  },
  {
    path: 'index', component: ShowCateComponent, canActivate: [RolesGuard]
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
