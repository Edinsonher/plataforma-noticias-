# Flash News

Aplicacion web responsiva tipo periodico desarrollada con Angular. Permite explorar noticias, consultar su detalle, guardar favoritos, contactar a la redaccion y gestionar publicaciones desde un panel administrativo local.

## Funcionalidades implementadas

### Home

- Banner con la noticia destacada.
- Seis tarjetas de noticias con imagen, categoria, resumen y enlace a detalle.
- Accion para guardar o quitar favoritos.
- Header, navegacion, buscador y footer.

### Noticias

- Catalogo dinamico desde `public/data/noticias.json`.
- Busqueda por titulo o resumen desde el buscador del header o el buscador interno.
- Filtros por categoria.
- Paginacion.
- Acceso a detalle y favoritos desde cada tarjeta.

### Detalle de noticia

- Categoria, titular, metadatos, imagen representativa y resumen.
- Lectura completa del contenido.
- Noticias relacionadas.
- Accion para agregar o quitar favoritos.
- Enlace para contactar a la redaccion.

### Favoritos

- Persistencia con `localStorage` usando la clave `favoritos_app`.
- Listado personalizado.
- Acceso al detalle.
- Eliminacion individual de favoritos.
- Estado vacio con acceso al catalogo.

### Contacto

- Formulario reactivo con validacion de nombre, correo, asunto y mensaje.
- Mensajes de error para campos obligatorios, correo invalido y longitudes minimas.
- Confirmacion de envio exitoso.
- Correo accionable: `mailto:redaccion@flashnews.com`.
- Telefono accionable: `tel:+5710000000`.
- Mapa interactivo de OpenStreetMap y enlace para abrirlo en una nueva pestaña.

### Administracion

- Formulario para crear noticias.
- Validacion de titulo, categoria, resumen y contenido.
- Fecha automatica para publicaciones nuevas.
- Tabla de noticias con ID, titulo, categoria, fecha y acciones.
- Eliminacion de noticias desde el gestor local.
- Persistencia del CRUD con `localStorage` usando la clave `noticias_app_data_v2`.

### Politicas

- `/politicas/privacidad`: uso de datos del formulario y almacenamiento local.
- `/politicas/terminos`: condiciones basicas de uso del portal.

## Tecnologias

- Angular 22.
- TypeScript.
- HTML semantico.
- CSS responsive con variables y media queries.
- Angular Router.
- Reactive Forms.
- JSON local.
- `localStorage`.
- Vitest mediante Angular CLI.
- OpenStreetMap para el mapa embebido.

## Rutas de la aplicacion

| Ruta | Vista | Funcion principal |
| --- | --- | --- |
| `/home` | Inicio | Banner y seis noticias |
| `/noticias` | Catalogo | Busqueda, filtros y paginacion |
| `/detalle/:id` | Detalle | Lectura completa y favoritos |
| `/favoritos` | Favoritos | Gestion de la seleccion personal |
| `/contacto` | Contacto | Formulario, enlaces y mapa |
| `/admin` | Administracion | Crear y eliminar noticias |
| `/politicas/:tipo` | Politicas | Privacidad y terminos |

## Estructura principal

```text
public/
  data/noticias.json       Fuente inicial de noticias
  assets/images/           Imagenes del portal
  mockups/                 Referencias visuales recibidas
src/app/
  models/                  Interfaces de dominio
  services/                Datos, favoritos y CRUD local
  pages/                   Home, catalogo, detalle, favoritos, contacto, admin y politicas
  shared/                  Header y footer
src/styles.css             Sistema visual y responsive global
```

## Ejecucion local

Requisitos: Node.js y npm.

```bash
npm install
npm start
```

Abrir `http://localhost:4200/`.

## Validacion tecnica

```bash
npm run build
npm test -- --watch=false
```

Resultado actual: build de produccion exitoso y 10 pruebas exitosas en 9 archivos.

El build se genera en `dist/plataforma-noticias`.

## Despliegue

Generar la version optimizada:

```bash
npm run build
```

## Alcance y persistencia

Es una aplicacion frontend sin backend. Las noticias iniciales se cargan desde JSON local. Los favoritos y cambios del CRUD se almacenan en el navegador del usuario; por eso no se comparten entre dispositivos ni navegadores.

## Documentacion academica

El contenido base del informe de entrega esta en [docs/INFORME-ENTREGA.md](docs/INFORME-ENTREGA.md). Debe complementarse con datos del estudiante, capturas, URL definitivas y referencias antes de exportarlo a PDF.
