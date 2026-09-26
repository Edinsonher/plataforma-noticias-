import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './admin.css',
  templateUrl: './admin.html'
})
export class AdminComponent implements OnInit {
  noticias: Noticia[] = [];
  readonly fechaActual = new Intl.DateTimeFormat('es-CO').format(new Date());
  guardada = false;
  readonly categorias = ['Tecnologia', 'Nacional', 'Deportes', 'Ciberseguridad', 'Inteligencia Artificial'];
  readonly noticiaForm;

  constructor(private readonly formBuilder: FormBuilder, private readonly noticiasService: NoticiasService) {
    this.noticiaForm = this.formBuilder.nonNullable.group({
      titulo: ['', [Validators.required, Validators.minLength(8)]],
      categoria: ['', Validators.required],
      imagen: ['assets/images/gadgets_tecnologicos.jpg'],
      resumen: ['', [Validators.required, Validators.minLength(20)]],
      contenido: ['', [Validators.required, Validators.minLength(40)]]
    });
  }

  async ngOnInit(): Promise<void> {
    const almacenadas = this.noticiasService.getStoredNoticias();
    const noticias = almacenadas.length > 0 ? almacenadas : await this.noticiasService.getNoticias();
    this.noticias = noticias.map((noticia) => ({
      ...noticia,
      fecha: noticia.fecha || this.fechaActual
    }));
  }

  publicar(): void {
    this.guardada = false;
    if (this.noticiaForm.invalid) {
      this.noticiaForm.markAllAsTouched();
      return;
    }
    const value = this.noticiaForm.getRawValue();
    const created = this.noticiasService.createNoticia({ ...value, alt: `Imagen de ${value.titulo}`, fecha: this.fechaActual });
    this.noticias = [...this.noticias, created];
    this.noticiaForm.reset({ categoria: '', imagen: 'assets/images/gadgets_tecnologicos.jpg', titulo: '', resumen: '', contenido: '' });
    this.guardada = true;
  }

  eliminar(id: number): void {
    this.noticiasService.deleteNoticia(id);
    this.noticias = this.noticias.filter((noticia) => noticia.id !== id);
  }
}
