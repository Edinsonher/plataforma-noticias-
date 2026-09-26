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
