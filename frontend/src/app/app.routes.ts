import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { adminGuard } from './core/auth/admin.guard';

export const routes: Routes = [
  // Public Marketplace Layout
  {
    path: '',
    loadComponent: () => import('./layouts/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      // Rutas públicas de catálogo
      {
        path: 'products',
        loadComponent: () => import('./features/products/pages/product-list/product-list.component').then(m => m.ProductListComponent)
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./features/products/pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
      },
      // Rutas de autenticación públicas
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      },
      // Ruta privada de Perfil de Usuario
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfilePageComponent)
      },
      // Rutas protegidas por authGuard (publicar y editar prendas)
      {
        path: 'products/new',
        canActivate: [authGuard],
        loadComponent: () => import('./features/products/pages/product-create/product-create.component').then(m => m.ProductCreatePageComponent)
      },
      {
        path: 'products/:id/edit',
        canActivate: [authGuard],
        loadComponent: () => import('./features/products/pages/product-edit/product-edit.component').then(m => m.ProductEditPageComponent)
      }
    ]
  },

  // Admin Dashboard Layout (Protegido por adminGuard)
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadComponent: () => import('./features/admin/products/admin-products.component').then(m => m.AdminProductsComponent)
      },
      {
        path: 'recycle-bin',
        loadComponent: () => import('./features/admin/recycle-bin/recycle-bin.component').then(m => m.RecycleBinComponent)
      },
      {
        path: 'products/new',
        loadComponent: () => import('./features/products/pages/product-create/product-create.component').then(m => m.ProductCreatePageComponent)
      },
      {
        path: 'products/:id/edit',
        loadComponent: () => import('./features/products/pages/product-edit/product-edit.component').then(m => m.ProductEditPageComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/users/admin-users.component').then(m => m.AdminUsersComponent)
      },
      {
        path: 'brands',
        loadComponent: () => import('./features/admin/brands/admin-brands.component').then(m => m.AdminBrandsComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/admin/categories/admin-categories.component').then(m => m.AdminCategoriesComponent)
      },
      {
        path: 'conditions',
        loadComponent: () => import('./features/admin/conditions/admin-conditions.component').then(m => m.AdminConditionsComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/admin/orders/admin-orders.component').then(m => m.AdminOrdersComponent)
      }
    ]
  },

  // Fallback Route
  {
    path: '**',
    loadComponent: () => import('./shared/components/empty-state/empty-state.component').then(m => m.EmptyStateComponent)
  }
];
