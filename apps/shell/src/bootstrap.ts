import { bootstrapApplication } from '@angular/platform-browser';
import { setRemoteDefinitions } from '@nx/angular/mf';
import { appConfig } from './app/app.config';
import { App } from './app/app';

fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => bootstrapApplication(App, appConfig))
  .catch((err) => console.error(err));
