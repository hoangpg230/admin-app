import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesGuard } from 'src/app/core/guards/roles.guard';
import { CreateComponent } from './create/create.component';
import { PermisionComponent } from './permision/permision.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { UpdateComponent } from './update/update.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  
  {
    path: '', redirectTo: 'index', pathMatch: 'full'
  },
  {
    path: 'index', component: ShowUserComponent, canActivate: [RolesGuard]
  },
  {
    path: 'create', component: CreateComponent, canActivate: [RolesGuard]
  },
  {
    path: 'update/:id', component: UpdateComponent, canActivate: [RolesGuard]
  },
  {
    path: 'permision/:id', component: PermisionComponent, canActivate: [RolesGuard]
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
