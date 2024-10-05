import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

function initializeAppFactory(httpClient: HttpClient): () => Observable<any> {
  return () => httpClient.get("assets/config/config.dev.json")
    .pipe(
      tap(config=> Object.assign(environment, config))
    );
 }

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),
  {
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    multi: true,
    deps: [HttpClient],
  },
  provideRouter(routes)]
};
