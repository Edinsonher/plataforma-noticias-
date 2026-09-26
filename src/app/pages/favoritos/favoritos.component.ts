import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './favoritos.css',
  templateUrl: './favoritos.html'
})
export class FavoritosComponent implements OnInit {
  misFavoritos: Noticia[] = [];

  constructor(private readonly noticiasService: NoticiasService, private readonly router: Router) {}

  ngOnInit(): void { this.cargarFavoritos(); }

  eliminarDeFavoritos(id: number): void {
    const favorito = this.misFavoritos.find((item) => item.id === id);
    if (favorito) {
      this.noticiasService.toggleFavorite(favorito);
      this.cargarFavoritos();
    }
  }

  verDetalle(id: number): void { this.router.navigate(['/detalle', id]); }

  private cargarFavoritos(): void { this.misFavoritos = this.noticiasService.getFavorites(); }
}
