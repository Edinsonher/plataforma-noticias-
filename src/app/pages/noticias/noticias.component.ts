import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './noticias.css',
  templateUrl: './noticias.html',
})
export class NoticiasComponent implements OnInit {
  listaNoticias: Noticia[] = [];
  noticiasFiltradas: Noticia[] = [];
  busqueda = '';
  categoriaActiva = 'Todas';
  paginaActual = 1;
  readonly noticiasPorPagina = 6;
  categorias: string[] = [];

  constructor(
    private readonly noticiasService: NoticiasService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    // El buscador global envia el termino como query param; la suscripcion permite reaccionar sin recrear la vista.
    this.route.queryParamMap.subscribe((params) => {
      this.busqueda = params.get('q') || '';
      this.aplicarFiltros();
    });
    const favoritosIds = new Set(this.noticiasService.getFavorites().map((noticia) => noticia.id));
    this.listaNoticias = (await this.noticiasService.getNoticias()).map((noticia) => ({
      ...noticia,
      isFavorite: favoritosIds.has(noticia.id),
    }));
    this.categorias = [...new Set(this.listaNoticias.map((noticia) => noticia.categoria))];
    this.aplicarFiltros();
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.noticiasFiltradas.length / this.noticiasPorPagina));
  }

  get noticiasVisibles(): Noticia[] {
    const inicio = (this.paginaActual - 1) * this.noticiasPorPagina;
    return this.noticiasFiltradas.slice(inicio, inicio + this.noticiasPorPagina);
  }

  /** Cambia categoria y reinicia la paginacion para evitar paginas vacias. */
  seleccionarCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    this.paginaActual = 1;
    this.aplicarFiltros();
  }

  /** Filtra por categoria y por coincidencia de texto en titulo o resumen. */
  aplicarFiltros(): void {
    const termino = this.busqueda.trim().toLowerCase();
    this.noticiasFiltradas = this.listaNoticias.filter((noticia) => {
      const coincideCategoria =
        this.categoriaActiva === 'Todas' || noticia.categoria === this.categoriaActiva;
      const coincideTexto = `${noticia.titulo} ${noticia.resumen}`.toLowerCase().includes(termino);
      return coincideCategoria && coincideTexto;
    });
    this.paginaActual = Math.min(this.paginaActual, this.totalPaginas);
  }

  /** Mantiene el indice de pagina dentro de los limites disponibles. */
  cambiarPagina(pagina: number): void {
    this.paginaActual = Math.min(Math.max(pagina, 1), this.totalPaginas);
  }

  verDetalle(id: number): void {
    this.router.navigate(['/detalle', id]);
  }

  toggleFavorite(noticia: Noticia): void {
    noticia.isFavorite = this.noticiasService.toggleFavorite(noticia);
  }

  getCardColorClass(categoria: string): string {
    const colors: Record<string, string> = {
      Ciberseguridad: 'card-red',
      'Seguridad Nacional': 'card-light-green',
      'Desarrollo de Software': 'card-purple',
      Tecnologia: 'card-blue',
      'Inteligencia Artificial': 'card-orange',
      Deportes: 'card-green',
    };
    return colors[categoria] || 'card-default';
  }
}
