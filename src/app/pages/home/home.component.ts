import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  noticiaDestacada: Noticia | null = null;
  ultimasNoticias: Noticia[] = [];

  constructor(
    private noticiasService: NoticiasService,
    private router: Router,
  ) {}

  async ngOnInit() {
    // Se prioriza el cache local para que Home renderice de inmediato los cambios del CRUD.
    const almacenadas = this.noticiasService.getStoredNoticias();
    if (almacenadas.length > 0) {
      this.mostrarNoticias(almacenadas);
      return;
    }
    this.mostrarNoticias(await this.noticiasService.getNoticias());
  }

  private mostrarNoticias(todasLasNoticias: Noticia[]): void {
    // La noticia destacada ocupa el banner; las otras seis forman el catalogo del Home.
    const favoritos = this.noticiasService.getFavorites();

    const noticiasMapeadas = todasLasNoticias.map((n) => ({
      ...n,
      isFavorite: favoritos.some((fav: Noticia) => fav.id === n.id),
    }));

    // Filtrar la noticia destacada
    this.noticiaDestacada = noticiasMapeadas.find((n) => n.categoria === 'Destacada') || null;

    // Las demás van a últimas noticias
    this.ultimasNoticias = noticiasMapeadas.filter((n) => n.categoria !== 'Destacada');
  }

  verMas(id: number) {
    this.router.navigate(['/detalle', id]);
  }

  toggleFavorite(noticia: Noticia) {
    // El servicio mantiene la persistencia y aqui solo actualizamos la tarjeta.
    noticia.isFavorite = this.noticiasService.toggleFavorite(noticia);
  }

  // Método para asignar colores a las tarjetas basándose en la categoría
  getCardColorClass(categoria: string): string {
    // Asocia cada categoria con el color definido en los mockups.
    const classMap: { [key: string]: string } = {
      Ciberseguridad: 'card-red',
      'Seguridad Nacional': 'card-light-green',
      'Desarrollo de Software': 'card-purple',
      Tecnología: 'card-blue',
      'Inteligencia Artificial': 'card-orange',
      Deportes: 'card-green',
    };
    return classMap[categoria] || 'card-default';
  }
}
