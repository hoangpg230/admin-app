import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesGuard } from './../../core/guards/roles.guard';
import { CreateComponent } from './create/create.component';
import { PermisionComponent } from './permision.component';
import { ShowPerComponent } from './show-per/show-per.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'index', pathMatch: 'full', 
  },
  {
    path: 'index', component: ShowPerComponent, canActivate: [RolesGuard]
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
