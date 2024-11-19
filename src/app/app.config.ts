import {APP_INITIALIZER, ApplicationConfig} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {tokenInterceptor} from './core/interceptors/token.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([tokenInterceptor]), // Используем обновленный interceptor
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
      },
      deps: [],
      multi: true,
    },
  ],
};

