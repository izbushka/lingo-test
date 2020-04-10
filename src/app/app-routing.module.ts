import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {FavoritesPageComponent} from './favorites-page/favorites-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'favorites', component: FavoritesPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
