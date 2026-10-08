// Verifica la inicializacion del panel CRUD administrativo.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    const noticiasServiceMock = {
      getStoredNoticias: () => [],
      getNoticias: async () => [],
      createNoticia: (noticia: Omit<Noticia, 'id'>): Noticia => ({
        ...noticia,
        id: 1,
      }),
      deleteNoticia: () => undefined,
    };

    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [{ provide: NoticiasService, useValue: noticiasServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('publica una noticia valida y la agrega a la tabla', () => {
    component.noticiaForm.setValue({
      titulo: 'Noticia de prueba',
      categoria: 'Tecnologia',
      imagen: 'assets/images/prueba.jpg',
      resumen: 'Este resumen tiene suficiente longitud para validar.',
      contenido:
        'Este contenido tiene mas de cuarenta caracteres para superar la validacion requerida.',
    });

    component.publicar();
    fixture.detectChanges();

    expect(component.noticias).toHaveLength(1);
    expect(fixture.nativeElement.textContent).toContain('Noticia de prueba');
    expect(component.guardada).toBe(true);
  });

  it('muestra las validaciones cuando se intenta publicar sin completar el formulario', () => {
    component.publicar();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('El titulo es obligatorio.');
    expect(fixture.nativeElement.textContent).toContain('Selecciona una categoria.');
    expect(component.noticias).toHaveLength(0);
  });
});
