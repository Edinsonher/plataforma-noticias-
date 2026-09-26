import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  termino = '';

  constructor(private readonly router: Router) {}

  buscar(): void {
    // El termino viaja en la URL para que el catalogo pueda filtrarlo y compartirlo.
    const termino = this.termino.trim();
    this.router.navigate(['/noticias'], { queryParams: termino ? { q: termino } : {} });
  }
}
