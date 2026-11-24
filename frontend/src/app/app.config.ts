import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth/auth.interceptor';
import { AuthService } from './core/auth/auth.service';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(
      withInterceptors([loadingInterceptor, authInterceptor, errorInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => firstValueFrom(authService.restoreSession()),
      deps: [AuthService],
      multi: true,
    },
  ]
};
