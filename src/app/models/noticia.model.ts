/** Contrato de una noticia usada por el catalogo, detalle, favoritos y CRUD. */
export interface Noticia {
  id: number;
  categoria: string;
  titulo: string;
  imagen: string;
  alt: string;
  resumen: string;
  contenido: string;
  fecha?: string;
  isFavorite?: boolean;
}
