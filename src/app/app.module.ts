import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { UsersComponent } from './Components/users/users.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { PostsComponent } from './Components/posts/posts.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    UsersComponent,
    SettingsComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
