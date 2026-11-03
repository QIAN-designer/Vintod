import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';
import Swal from 'sweetalert2';

/**
 * Functional Guard que restringe el acceso a usuarios autenticados con JWT.
 * Si no está autenticado, redirige a /login guardando la ruta de destino en queryParams.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isAuthenticated()) {
    return true;
  }

  Swal.fire({
    icon: 'info',
    title: 'Autenticación requerida',
    text: 'Debes iniciar sesión para acceder a esta sección.',
    confirmButtonColor: '#007782',
    confirmButtonText: 'Ir a Iniciar Sesión'
  });

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

