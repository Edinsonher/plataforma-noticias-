import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private readonly JSON_URL = 'data/noticias.json';
  private readonly STORAGE_KEY = 'noticias_app_data_v2';
  private readonly FAVORITES_KEY = 'favoritos_app';

  constructor() { }

  /**
   * Obtiene la lista de noticias.
   * Primero revisa el localStorage (para mantener el CRUD). 
   * Si no hay, carga desde el JSON y lo guarda en localStorage.
   */
  async getNoticias(): Promise<Noticia[]> {
    const localData = this.readStorage(this.STORAGE_KEY);
    if (localData) {
      return JSON.parse(localData) as Noticia[];
    }

    try {
      const response = await fetch(this.JSON_URL);
      const data: Noticia[] = await response.json();
      this.saveToLocal(data);
      return data;
    } catch (error) {
      console.error('Error al obtener noticias:', error);
      return [];
    }
  }

  /**
   * Guarda la lista de noticias en localStorage.
   */
  saveToLocal(noticias: Noticia[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(noticias));
  }

  getStoredNoticias(): Noticia[] {
    const data = this.readStorage(this.STORAGE_KEY);
    return data ? (JSON.parse(data) as Noticia[]) : [];
  }

  getFavorites(): Noticia[] {
    const data = this.readStorage(this.FAVORITES_KEY);
    return data ? (JSON.parse(data) as Noticia[]) : [];
  }

  toggleFavorite(noticia: Noticia): boolean {
    const favorites = this.getFavorites();
    const exists = favorites.some((favorite) => favorite.id === noticia.id);
    const updated = exists
      ? favorites.filter((favorite) => favorite.id !== noticia.id)
      : [...favorites, { ...noticia, isFavorite: true }];
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(updated));
    return !exists;
  }

  createNoticia(noticia: Omit<Noticia, 'id'>): Noticia {
    const noticias = this.getNoticiasFromStorage();
    const created: Noticia = { ...noticia, id: this.getNextId(noticias) };
    this.saveToLocal([...noticias, created]);
    return created;
  }

  deleteNoticia(id: number): void {
    this.saveToLocal(this.getNoticiasFromStorage().filter((noticia) => noticia.id !== id));
    localStorage.setItem(
      this.FAVORITES_KEY,
      JSON.stringify(this.getFavorites().filter((noticia) => noticia.id !== id))
    );
  }

  private getNoticiasFromStorage(): Noticia[] {
    return this.getStoredNoticias();
  }

  private getNextId(noticias: Noticia[]): number {
    return noticias.reduce((maxId, noticia) => Math.max(maxId, noticia.id), 0) + 1;
  }

  private readStorage(key: string): string | null {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem(key);
  }
}
