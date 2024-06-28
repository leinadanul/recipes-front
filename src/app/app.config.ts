import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appEffects, appStore } from './core/store/store';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';




export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(appStore),
    provideEffects(appEffects),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAnimations()
    ]
};
