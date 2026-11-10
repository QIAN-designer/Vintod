import { Component, OnInit, OnDestroy, inject, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductsStore } from "../../../../core/store/products.store";
import { AuthStore } from "../../../../core/auth/auth.store";
import { AuthService } from "../../../../core/auth/auth.service";
import { EmptyStateComponent } from "../../../../shared/components/empty-state/empty-state.component";
import { ErrorStateComponent } from "../../../../shared/components/error-state/error-state.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ProductSkeletonComponent } from "../../components/product-skeleton/product-skeleton.component";
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.component";
import { FilterBarComponent, FilterCriteria } from "../../../../shared/components/filter-bar/filter-bar.component";
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { CarouselComponent } from "../../../../shared/components/carousel/carousel.component";
import { CategoryCardComponent, CategoryCardItem } from "../../components/category-card/category-card.component";
import { LocationCardComponent, LocationItem } from "../../components/location-card/location-card.component";
import { HostCardComponent, HostItem } from "../../components/host-card/host-card.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [
    RouterLink,
    ProductCardComponent,
    ProductSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    SearchBarComponent,
    FilterBarComponent,
    PaginationComponent,
    CarouselComponent,
    CategoryCardComponent,
    LocationCardComponent,
    HostCardComponent
  ],
  templateUrl: "./product-list.component.html"
})
export class ProductListComponent implements OnInit, OnDestroy {
  store = inject(ProductsStore);
  authStore = inject(AuthStore);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isUserMenuOpen = signal(false);
  ecoCounter = signal(14280);
  private ecoIntervalId?: any;
  private queryParamsSub?: Subscription;
  private abortCtrl?: AbortController;

  categories: CategoryCardItem[] = [
    {
      id: "vestidos",
      name: "Vestidos",
      count: "3.4k prendas",
      img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "zapatillas",
      name: "Zapatillas",
      count: "2.8k pares",
      img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "chaquetas",
      name: "Chaquetas",
      count: "1.9k abrigos",
      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "bolsos",
      name: "Bolsos",
      count: "890 piezas",
      img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "vintage",
      name: "Vintage",
      count: "4.1k tesoros",
      img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: "punto",
      name: "Punto",
      count: "1.5k prendas",
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=80"
    }
  ];

  locations: LocationItem[] = [
    {
      id: "loc-madrid",
      name: "Madrid Centro",
      slug: "Nike",
      country: "España",
      subtitle: "Hub Malasaña & Vintage",
      itemsCount: "1.2k prendas",
      img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "loc-bcn",
      name: "Barcelona Born",
      slug: "Zara",
      country: "España",
      subtitle: "Archivo & Diseño Local",
      itemsCount: "980 prendas",
      img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "loc-valencia",
      name: "Valencia Ruzafa",
      slug: "Carhartt",
      country: "España",
      subtitle: "Streetwear & Denim",
      itemsCount: "640 prendas",
      img: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "loc-paris",
      name: "París Marais",
      slug: "Sézane",
      country: "Francia",
      subtitle: "Chic Francés & Lino",
      itemsCount: "1.5k prendas",
      img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80"
    }
  ];

  featuredSellers: HostItem[] = [
    {
      id: "s1",
      name: "Andrea Silva",
      rating: "5.0",
      sales: 240,
      city: "Madrid",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      bio: "Armario minimalista escandinavo, linos franceses y prendas de Rouje, Arket y COS.",
      itemsCount: 14,
      isFollowing: false,
      previewImgs: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=300&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "s2",
      name: "Nico Archivist",
      rating: "4.9",
      sales: 312,
      city: "Barcelona",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      bio: "Especializado en archivo 90s, sudaderas universitarias USA originales y ropa de trabajo.",
      itemsCount: 28,
      isFollowing: false,
      previewImgs: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "s3",
      name: "Marta Atelier",
      rating: "5.0",
      sales: 185,
      city: "Valencia",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
      bio: "Accesorios de lujo, bolsos descatalogados y vestidos de invitada con etiqueta.",
      itemsCount: 9,
      isFollowing: false,
      previewImgs: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80"
      ]
    }
  ];

  ngOnInit() {
    // 1. Leer queryParams de la URL y sincronizar con el Store + ejecutar petición con AbortController
    this.queryParamsSub = this.route.queryParams.subscribe(params => {
      this.store.setFiltersFromQueryParams(params);
      this.loadProductsWithAbort();
    });

    this.ecoIntervalId = setInterval(() => {
      if (Math.random() > 0.5) {
        this.ecoCounter.update(c => c + Math.floor(Math.random() * 3) + 1);
      }
    }, 4500);
  }

  ngOnDestroy() {
    if (this.ecoIntervalId) {
      clearInterval(this.ecoIntervalId);
    }
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
    if (this.abortCtrl) {
      this.abortCtrl.abort();
    }
  }

  /**
   * Cancela cualquier petición en vuelo (AbortController) y solicita los productos/eventos actualizados
   */
  loadProductsWithAbort() {
    if (this.abortCtrl) {
      this.abortCtrl.abort();
    }
    this.abortCtrl = new AbortController();
    this.store.fetchShopProducts(this.abortCtrl.signal);
  }

  loadProducts() {
    this.loadProductsWithAbort();
  }

  /**
   * Recibe el término con debounce desde <app-search-bar>, actualiza filtros, sync_url y obtiene eventos
   */
  onSearchDebounced(term: string) {
    this.store.updateFilters({ search: term, page: 1 }, true);
  }

  /**
   * Recibe cambios de <app-filter-bar>, actualiza filtros, sync_url y obtiene eventos
   */
  onFilterBarChange(changes: Partial<FilterCriteria>) {
    this.store.updateFilters({ ...changes, page: 1 }, true);
  }

  /**
   * Recibe cambio de página de <app-pagination>, actualiza página, sync_url y obtiene eventos
   */
  onPageChange(page: number) {
    this.store.setPage(page, true);
    this.scrollToFeed();
  }

  selectCategory(categoryName: string) {
    this.store.updateFilters({ category: categoryName, page: 1 }, true);
    this.scrollToFeed();
  }

  selectLocation(loc: LocationItem) {
    this.store.updateFilters({ brand: loc.slug || '', page: 1 }, true);
    this.scrollToFeed();
  }

  selectHost(host: HostItem) {
    this.store.updateFilters({ search: host.name.split(' ')[0], page: 1 }, true);
    this.scrollToFeed();
  }

  resetFilters() {
    this.store.resetFilters(true);
  }

  scrollToFeed() {
    const el = document.getElementById("feed-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen.update(v => !v);
  }

  handleLogout(): void {
    this.isUserMenuOpen.set(false);
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Seguro que deseas salir de tu cuenta en Vintod?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#007782',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Has salido de tu cuenta.',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/login']);
      }
    });
  }
}
