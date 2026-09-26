import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './detalle-noticia.css',
  templateUrl: './detalle-noticia.html',
})
export class DetalleNoticiaComponent implements OnInit {
  noticia: Noticia | null = null;
  relacionadas: Noticia[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly noticiasService: NoticiasService,
  ) {}

  async ngOnInit(): Promise<void> {
    // El id de la URL determina la noticia y las relacionadas se calculan desde el mismo catalogo.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const almacenadas = this.noticiasService.getStoredNoticias();
    const noticias =
      almacenadas.length > 0 ? almacenadas : await this.noticiasService.getNoticias();
    const favoritosIds = new Set(this.noticiasService.getFavorites().map((item) => item.id));
    this.noticia = noticias.find((item) => item.id === id) || null;
    if (!this.noticia) {
      this.router.navigate(['/noticias']);
      return;
    }
    this.noticia = { ...this.noticia, isFavorite: favoritosIds.has(this.noticia.id) };
    this.relacionadas = noticias.filter((item) => item.id !== id).slice(0, 3);
  }

  toggleFavorite(): void {
    // La accion se ofrece solo cuando la noticia solicitada existe.
    if (this.noticia) {
      this.noticia.isFavorite = this.noticiasService.toggleFavorite(this.noticia);
    }
  }
}
