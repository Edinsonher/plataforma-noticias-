# Plataforma Web de Noticias Flash News

**Informe final de aplicacion Front-end**

**Estudiante:** [Nombre del estudiante]  
**Programa:** [Programa academico]  
**Modulo:** Desarrollo de Front-end  
**Fecha:** [Fecha de entrega]

## Resumen

Flash News es una aplicacion web tipo periodico que permite explorar noticias de tecnologia, seguridad, deportes e inteligencia artificial. La solucion implementa navegacion por rutas, catalogo dinamico, detalle de contenido, favoritos persistentes, contacto validado y un mini CRUD local para publicar y eliminar noticias.

**Palabras clave:** Angular, frontend, noticias, favoritos, formularios, localStorage.

## 1. Introduccion

El proyecto responde a la necesidad de presentar informacion periodistica en una interfaz clara, responsive y accesible desde computador, tableta y telefono. La propuesta parte de los mockups suministrados para las vistas de inicio, listado, detalle, contacto y administracion.

## 2. Objetivos

### Objetivo general

Desarrollar una aplicacion Front-end funcional para consultar y gestionar noticias mediante Angular, HTML, CSS, TypeScript, JSON local y almacenamiento del navegador.

### Objetivos especificos

- Construir una interfaz responsive coherente con los mockups.
- Renderizar noticias desde una fuente JSON local.
- Permitir busqueda, filtros, paginacion y lectura detallada.
- Implementar favoritos con persistencia local.
- Validar el formulario de contacto.
- Implementar creacion y eliminacion de noticias desde un panel local.

## 3. Alcance

La aplicacion es exclusivamente frontend y no utiliza una API ni base de datos remota. Las noticias iniciales provienen de `public/data/noticias.json`. Los favoritos se guardan con la clave `favoritos_app` y el CRUD con `noticias_app_data_v2` en `localStorage`.

## 4. Descripcion funcional

### 4.1 Inicio

Presenta un banner con la noticia destacada y seis tarjetas con imagen, categoria, resumen, enlace de lectura y accion de favorito. El header ofrece navegacion y busqueda global. El footer contiene categorias, politicas, redes sociales y contacto.

### 4.2 Catalogo de noticias

El usuario puede buscar por titulo o resumen, seleccionar una categoria y recorrer los resultados mediante paginacion. Cada tarjeta permite abrir el detalle o guardar la noticia.

### 4.3 Detalle

La vista muestra la categoria, titular, metadatos, imagen, resumen, contenido completo, noticias relacionadas y acciones de favorito y contacto.

### 4.4 Favoritos

El usuario puede consultar su seleccion personal, abrir una noticia y quitarla de favoritos. La informacion persiste en el navegador.

### 4.5 Contacto

El formulario valida nombre, correo, asunto y mensaje. Al completarlo correctamente muestra confirmacion. La vista incluye correo `redaccion@flashnews.com`, telefono `+57 (1) 000 0000`, mapa interactivo de OpenStreetMap y enlace externo.

### 4.6 Administracion

El formulario permite crear noticias con titulo, categoria, imagen, resumen y contenido. La tabla de gestion presenta ID, titulo, categoria, fecha y acciones para eliminar publicaciones localmente.

## 5. Tecnologias utilizadas

- Angular 22 y TypeScript para componentes, rutas y binding.
- HTML semantico para la estructura de las vistas.
- CSS responsive para adaptacion a diferentes pantallas.
- Angular Reactive Forms para validaciones.
- JSON local para la carga inicial de noticias.
- `localStorage` para favoritos y CRUD.
- Vitest y Angular CLI para pruebas unitarias.
- OpenStreetMap para el mapa de contacto.

## 6. Arquitectura y organizacion

El proyecto separa modelos, servicios, paginas y componentes compartidos. `NoticiasService` centraliza carga, persistencia, favoritos, creacion y eliminacion. `app.routes.ts` define la navegacion entre vistas. Header y footer se reutilizan desde el componente raiz.

## 7. Pruebas y resultados

Los comandos de validacion son:

```bash
npm run build
npm test -- --watch=false
```

Resultado de la version final:

- Build de produccion exitoso.
- 9 archivos de prueba ejecutados.
- 10 pruebas exitosas.
- Sin errores reportados por el analizador del editor.
- Validacion manual en navegador de Home, busqueda, detalle, contacto, mapa y Admin.

## 8. Correspondencia con los mockups

| Mockup | Implementacion |
| --- | --- |
| Inicio | Banner, seis tarjetas, favoritos, header y footer |
| Detalle | Imagen, contenido, favorito, contacto y relacionadas |
| Noticias | Busqueda, filtros, tarjetas y paginacion |
| Contacto | Formulario validado, informacion, mapa y enlaces directos |
| Admin | Publicacion y tabla con ID, categoria, fecha y acciones |

**Anexos sugeridos:** incluir aqui capturas de cada vista y las imagenes de los mockups entregados.

## 9. Enlaces de entrega

- Repositorio: `PENDIENTE_URL_REPOSITORIO_GITHUB`
- Despliegue: `PENDIENTE_URL_DESPLIEGUE`
- Video explicativo: `PENDIENTE_URL_VIDEO`

## 10. Conclusiones

Flash News cumple los requerimientos funcionales de una plataforma frontend de noticias. La separacion por componentes y servicio facilita el mantenimiento, mientras que el uso de rutas, formularios reactivos y almacenamiento local evidencia los fundamentos de Angular solicitados. La interfaz conserva la estructura de los mockups y agrega interacciones necesarias para una experiencia completa en escritorio y dispositivos moviles.

## Referencias

Angular. (2026). *Angular documentation*. https://angular.dev/

Mozilla Developer Network. (2026). *Web technologies*. https://developer.mozilla.org/

OpenStreetMap Foundation. (2026). *OpenStreetMap*. https://www.openstreetmap.org/

Vitest. (2026). *Vitest documentation*. https://vitest.dev/
