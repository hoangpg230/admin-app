import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { RolesGuard } from './../core/guards/roles.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: MainComponent, children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule), },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule), },
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), },
      { path: 'permision', loadChildren: () => import('./permision/permision.module').then(m => m.PermisionModule), },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
