import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-politicas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './politicas.html',
  styleUrl: './politicas.css',
})
export class PoliticasComponent {
  readonly tipo: string;

  constructor(route: ActivatedRoute) {
    // El segmento tipo decide si se presenta privacidad o terminos de uso.
    this.tipo = route.snapshot.paramMap.get('tipo') || 'privacidad';
  }
}
