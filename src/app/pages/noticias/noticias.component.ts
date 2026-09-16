import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule],
  styleUrl: './noticias.css',
  templateUrl: './noticias.html'
})
export class NoticiasComponent implements OnInit {
  // Arreglo donde se guardarán las noticias cargadas del JSON
  listaNoticias: any[] = [];

  // Inyectamos el HttpClient en el constructor
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Leemos el archivo JSON que creamos en la carpeta public
    this.http.get<any[]>('noticias.json').subscribe({
      next: (data) => {
        this.listaNoticias = data;
        console.log('Noticias cargadas con éxito:', this.listaNoticias);
      },
      error: (err) => {
        console.error('Error al cargar el archivo JSON:', err);
      }
    });
  }
}

