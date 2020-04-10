import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { NavbarComponent } from './shared/layouts/main-layout/navbar/navbar.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { CarCardComponent } from './home-page/car-card/car-card.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import {NgxWebstorageModule} from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainLayoutComponent,
    NavbarComponent,
    FavoritesPageComponent,
    CarCardComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxWebstorageModule.forRoot()
  ],
  exports: [
    NgxWebstorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
