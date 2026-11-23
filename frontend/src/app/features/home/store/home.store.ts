import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Category, Brand } from '../../../core/models/marketplace.model';

export interface TopSeller {
  id: string;
  userId?: string;
  username: string;
  fullName?: string;
  avatarUrl?: string;
  rating?: number;
  ratingAverage?: number;
  salesCount?: number;
  bio?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeStore {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Signals de solo lectura
  readonly categories = signal<Category[]>([]);
  readonly brands = signal<Brand[]>([]);
  readonly topSellers = signal<TopSeller[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  /**
   * Carga los datos de la Home en paralelo evitando peticiones redundantes si ya existen en caché
   */
  async loadHomeData(force = false): Promise<void> {
    // Si ya tenemos datos cacheados y no se fuerza la recarga, evitamos requests
    if (!force && this.categories().length > 0 && this.brands().length > 0) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const [categoriesRes, brandsRes, topSellersRes] = await Promise.all([
        firstValueFrom(this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/categories`)).catch(() => null),
        firstValueFrom(this.http.get<ApiResponse<Brand[]>>(`${this.apiUrl}/brands`)).catch(() => null),
        firstValueFrom(this.http.get<ApiResponse<TopSeller[]>>(`${this.apiUrl}/users/top-sellers`)).catch(() => null),
      ]);

      if (categoriesRes?.success && Array.isArray(categoriesRes.data)) {
        this.categories.set(categoriesRes.data);
      } else if (this.categories().length === 0) {
        // Fallback por defecto si la base de datos está vacía
        this.categories.set([
          { id: '1', name: 'Mujer', slug: 'mujer', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80' } as any,
          { id: '2', name: 'Hombre', slug: 'hombre', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&auto=format&fit=crop&q=80' } as any,
          { id: '3', name: 'Accesorios', slug: 'accesorios', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80' } as any,
          { id: '4', name: 'Calzado', slug: 'calzado', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&auto=format&fit=crop&q=80' } as any,
          { id: '5', name: 'Vintage', slug: 'vintage', img: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=300&auto=format&fit=crop&q=80' } as any,
        ]);
      }

      if (brandsRes?.success && Array.isArray(brandsRes.data)) {
        this.brands.set(brandsRes.data);
      } else if (this.brands().length === 0) {
        // Fallback por defecto si no hay marcas en la base de datos
        this.brands.set([
          { id: 'b1', name: "Levi's", slug: 'levis' } as any,
          { id: 'b2', name: 'Nike', slug: 'nike' } as any,
          { id: 'b3', name: 'Zara', slug: 'zara' } as any,
          { id: 'b4', name: 'Adidas', slug: 'adidas' } as any,
          { id: 'b5', name: 'Carhartt', slug: 'carhartt' } as any,
          { id: 'b6', name: 'Converse', slug: 'converse' } as any,
        ]);
      }

      if (topSellersRes?.success && Array.isArray(topSellersRes.data) && topSellersRes.data.length > 0) {
        this.topSellers.set(topSellersRes.data);
      } else if (this.topSellers().length === 0) {
        // Fallback enriquecido de vendedores destacados
        this.topSellers.set([
          {
            id: 's1',
            username: 'maria_vintage',
            fullName: 'María García',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
            rating: 4.9,
            salesCount: 142,
            bio: 'Streetwear 90s & archivo italiano'
          },
          {
            id: 's2',
            username: 'carlos_denim',
            fullName: 'Carlos Ramos',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
            rating: 5.0,
            salesCount: 89,
            bio: 'Denim japonés selvedge y cuero'
          },
          {
            id: 's3',
            username: 'sofia_couture',
            fullName: 'Sofía Valdés',
            avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
            rating: 4.8,
            salesCount: 210,
            bio: 'Bolsos de lujo y prendas de fiesta'
          },
          {
            id: 's4',
            username: 'alvaro_archive',
            fullName: 'Álvaro Gómez',
            avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
            rating: 4.9,
            salesCount: 76,
            bio: 'Sneakers exclusivas y chaquetas vintage'
          }
        ]);
      }
    } catch (err: any) {
      this.error.set(err?.message || 'Error al conectar con los servicios de Vintod. Inténtalo de nuevo.');
    } finally {
      this.loading.set(false);
    }
  }
}
