import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.componente';
import { NoticiasComponent } from './pages/noticias/noticias.componente';
import { DetalleNoticiaComponent } from './pages/detalle-noticia/detalle-noticia.componente';
import { FavoritosComponent } from './pages/favoritos/favoritos.componente';
import { ContactoComponent } from './pages/contacto/contacto.componente';
import { AdminComponent } from './pages/admin/admin.componente';

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
