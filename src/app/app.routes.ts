import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { DetalleNoticiaComponent } from './pages/detalle-noticia/detalle-noticia.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'detalle/:id', component: DetalleNoticiaComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'home' }
];
