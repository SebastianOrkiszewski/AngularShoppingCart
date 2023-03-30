import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './component/articles/articles.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'articles', pathMatch: 'full'},
  {path: 'articles', component: ArticlesComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
