import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Punto de entrada: inicia la aplicacion standalone con su configuracion global.
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
