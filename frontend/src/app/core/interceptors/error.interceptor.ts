import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Dejamos que los códigos 401, 403 y 0 sean procesados prioritariamente por authInterceptor
      if (error.status === 401 || error.status === 403 || error.status === 0) {
        return throwError(() => error);
      }

      let errorMessage = 'Ocurrió un error inesperado';
      
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        if (error.status === 400) {
          errorMessage = error.error?.error?.message || error.error?.error || error.error?.message || 'Solicitud incorrecta';
        } else if (error.status === 404) {
          errorMessage = error.error?.error?.message || 'Recurso no encontrado';
        } else if (error.status === 500) {
          errorMessage = error.error?.error?.message || 'Error interno del servidor';
        } else {
          errorMessage = error.error?.error?.message || error.error?.message || error.message;
        }
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#007782'
      });
      
      return throwError(() => new Error(errorMessage));
    })
  );
};
