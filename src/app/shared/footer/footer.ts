import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // 1. Agregamos Router y RouterLink

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink], // 2. Lo declaramos aquí para que funcione en el HTML
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  // 3. Agregamos el constructor para leer la página actual en el HTML
  constructor(public router: Router) {}
}

