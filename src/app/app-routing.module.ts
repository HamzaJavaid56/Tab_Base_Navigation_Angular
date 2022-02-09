import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { PostsComponent } from './Components/posts/posts.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { UsersComponent } from './Components/users/users.component';


const routes: Routes = [
  { path: '', redirectTo: 'pagination', pathMatch: 'full' },

  {
path:'pagination',
component:PaginationComponent
  },
 {
   path:'posts',
   component:PostsComponent

 },
 {
   path:'users',
   component:UsersComponent
 },
 {
   path:'setting',
   component:SettingsComponent
 },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
