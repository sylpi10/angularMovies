import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from "@angular/common/http";
import { SearchComponent } from './pages/home/search/search.component';
import { UiModule } from './shared/ui/ui.module';
import { MovieComponent } from './pages/movie/movie.component';
import { ModifyComponent } from './pages/modify/modify.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    MovieComponent,
    ModifyComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
