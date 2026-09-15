import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Agregamos la importación

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink], // 2. Lo declaramos aquí para que funcione en el HTML
  templateUrl: './header.html',
  styleUrl: './header.css'

})
export class HeaderComponent {}
