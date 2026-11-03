import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';
import Swal from 'sweetalert2';

/**
 * Functional Guard que restringe el acceso al panel /admin.
 * Requiere que el usuario esté autenticado y que su rol sea estrictamente 'ADMIN'.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  // 1. Validar autenticación
  if (!authStore.isAuthenticated()) {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso Restringido',
      text: 'Debes iniciar sesión con una cuenta de Administrador para acceder al panel.',
      confirmButtonColor: '#007782',
      confirmButtonText: 'Iniciar sesión'
    });
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  // 2. Validar rol ADMIN
  if (authStore.isAdmin()) {
    return true;
  }

  // Si está autenticado pero no es ADMIN
  Swal.fire({
    icon: 'error',
    title: 'Permisos Insuficientes',
    text: 'Esta sección está reservada exclusivamente para el equipo de Administración de Vintod.',
    confirmButtonColor: '#007782',
    confirmButtonText: 'Volver al Catálogo'
  });

  return router.createUrlTree(['/products']);
};

