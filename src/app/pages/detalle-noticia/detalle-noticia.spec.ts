// Comprueba el detalle con ActivatedRoute y servicio de noticias simulados.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { DetalleNoticiaComponent } from './detalle-noticia.component';
import { NoticiasService } from '../../services/noticias.service';

describe('DetalleNoticiaComponent', () => {
  let component: DetalleNoticiaComponent;
  let fixture: ComponentFixture<DetalleNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleNoticiaComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        {
          provide: NoticiasService,
          useValue: {
            getStoredNoticias: () => [
              {
                id: 1,
                categoria: 'Tecnologia',
                titulo: 'Prueba',
                imagen: '',
                alt: '',
                resumen: 'Resumen',
                contenido: 'Contenido',
              },
            ],
            getNoticias: async () => [
              {
                id: 1,
                categoria: 'Tecnologia',
                titulo: 'Prueba',
                imagen: '',
                alt: '',
                resumen: 'Resumen',
                contenido: 'Contenido',
              },
            ],
            getFavorites: () => [],
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleNoticiaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
