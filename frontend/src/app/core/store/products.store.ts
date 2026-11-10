import { Injectable, signal, computed, inject } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Product, ProductQueryParams } from '../models/marketplace.model';
import { PaginationMeta } from '../models/api-response.model';
import { ProductService } from '../services/product.service';
import { ShopService } from '../services/shop.service';

export interface ProductsState {
  products: Product[];
  deletedProducts: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  hasLoaded: boolean;
  searchFilter: string;
  locationFilter: string;
  hostFilter: string;
  brandFilter: string;
  categoryFilter: string;
  conditionFilter: string;
  sizeFilter: string;
  minPriceFilter: number | null;
  maxPriceFilter: number | null;
  sortBy: string;
  order: 'asc' | 'desc';
  page: number;
  limit: number;
  pagination: PaginationMeta;
  statusFilter: 'all' | 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root'
})
export class ProductsStore {
  private productService = inject(ProductService);
  private shopService = inject(ShopService);
  private router = inject(Router);
  private abortController: AbortController | null = null;

  private state = signal<ProductsState>({
    products: [],
    deletedProducts: [],
    selectedProduct: null,
    loading: false,
    error: null,
    hasLoaded: false,
    searchFilter: '',
    locationFilter: '',
    hostFilter: '',
    brandFilter: '',
    categoryFilter: '',
    conditionFilter: '',
    sizeFilter: '',
    minPriceFilter: null,
    maxPriceFilter: null,
    sortBy: 'createdAt',
    order: 'desc',
    page: 1,
    limit: 8,
    pagination: {
      total: 0,
      page: 1,
      limit: 8,
      totalPages: 1
    },
    statusFilter: 'all'
  });

  readonly products = computed(() => this.state().products);
  readonly visibleProducts = computed(() => this.state().products.filter(p => p.isActive !== false));
  readonly deletedProducts = computed(() => this.state().deletedProducts);
  readonly selectedProduct = computed(() => this.state().selectedProduct);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly hasLoaded = computed(() => this.state().hasLoaded);
  readonly searchFilter = computed(() => this.state().searchFilter);
  readonly locationFilter = computed(() => this.state().locationFilter);
  readonly hostFilter = computed(() => this.state().hostFilter);
  readonly brandFilter = computed(() => this.state().brandFilter);
  readonly categoryFilter = computed(() => this.state().categoryFilter);
  readonly conditionFilter = computed(() => this.state().conditionFilter);
  readonly sizeFilter = computed(() => this.state().sizeFilter);
  readonly minPriceFilter = computed(() => this.state().minPriceFilter);
  readonly maxPriceFilter = computed(() => this.state().maxPriceFilter);
  readonly sortBy = computed(() => this.state().sortBy);
  readonly order = computed(() => this.state().order);
  readonly page = computed(() => this.state().page);
  readonly limit = computed(() => this.state().limit);
  readonly pagination = computed(() => this.state().pagination);
  readonly statusFilter = computed(() => this.state().statusFilter);

  //Objeto reactivo con todos los query params actuales (?key=value&key=value)
  readonly currentQueryParams = computed<ProductQueryParams>(() => {
    const s = this.state();
    const params: ProductQueryParams = {};
    if (s.searchFilter) params.search = s.searchFilter;
    if (s.locationFilter) params.location = s.locationFilter;
    if (s.hostFilter) params.host = s.hostFilter;
    if (s.brandFilter) params.brand = s.brandFilter;
    if (s.categoryFilter) params.category = s.categoryFilter;
    if (s.conditionFilter) params.condition = s.conditionFilter;
    if (s.sizeFilter) params.size = s.sizeFilter;
    if (s.minPriceFilter !== null && s.minPriceFilter !== undefined) params.minPrice = s.minPriceFilter;
    if (s.maxPriceFilter !== null && s.maxPriceFilter !== undefined) params.maxPrice = s.maxPriceFilter;
    if (s.sortBy && s.sortBy !== 'createdAt') params.sortBy = s.sortBy;
    if (s.order && s.order !== 'desc') params.order = s.order;
    if (s.page > 1) params.page = s.page;
    if (s.limit !== 8) params.limit = s.limit;
    if (s.statusFilter === 'active') params.active = 'true';
    if (s.statusFilter === 'inactive') params.active = 'false';
    return params;
  });

  // Computeds for metrics and filtered lists (usado en Admin y vistas locales)
  readonly filteredProducts = computed(() => {
    const list = this.state().products;
    const search = this.state().searchFilter.toLowerCase().trim();
    const brand = this.state().brandFilter;
    const category = this.state().categoryFilter;
    const condition = this.state().conditionFilter;
    const size = this.state().sizeFilter;
    const minPrice = this.state().minPriceFilter;
    const maxPrice = this.state().maxPriceFilter;
    const status = this.state().statusFilter;

    return list.filter(p => {
      const matchesSearch = !search ||
        p.title.toLowerCase().includes(search) ||
        (p.description && p.description.toLowerCase().includes(search)) ||
        (p.brand && p.brand.toLowerCase().includes(search));

      const matchesBrand = !brand || (p.brand && p.brand.toLowerCase() === brand.toLowerCase());
      const matchesCategory = !category || (p.category && p.category.toLowerCase() === category.toLowerCase());
      const matchesCondition = !condition || (p.condition && p.condition.toLowerCase() === condition.toLowerCase());
      const matchesSize = !size || (p.size && p.size.toLowerCase() === size.toLowerCase());
      const matchesMinPrice = minPrice === null || minPrice === undefined || (p.price >= minPrice);
      const matchesMaxPrice = maxPrice === null || maxPrice === undefined || (p.price <= maxPrice);

      const isActive = p.isActive !== false;
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && isActive) ||
        (status === 'inactive' && !isActive);

      return (
        matchesSearch &&
        matchesBrand &&
        matchesCategory &&
        matchesCondition &&
        matchesSize &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesStatus
      );
    });
  });

  readonly totalProductsCount = computed(() => this.state().pagination.total || this.state().products.length);
  readonly activeProductsCount = computed(() => this.state().products.filter(p => p.isActive !== false).length);
  readonly inactiveProductsCount = computed(() => this.state().products.filter(p => p.isActive === false).length);
  readonly totalCatalogValue = computed(() =>
    this.state().products.reduce((acc, p) => acc + (p.price || 0), 0)
  );

  /**
   * Lee los queryParams desde ActivatedRoute y actualiza el estado del Store
   */
  setFiltersFromQueryParams(params: Params) {
    this.state.update(s => ({
      ...s,
      searchFilter: params['search'] || params['q'] || '',
      locationFilter: params['location'] || params['city'] || '',
      hostFilter: params['host'] || params['seller'] || '',
      brandFilter: params['brand'] || '',
      categoryFilter: params['category'] || '',
      conditionFilter: params['condition'] || '',
      sizeFilter: params['size'] || '',
      minPriceFilter: params['minPrice'] !== undefined && params['minPrice'] !== '' ? Number(params['minPrice']) : null,
      maxPriceFilter: params['maxPrice'] !== undefined && params['maxPrice'] !== '' ? Number(params['maxPrice']) : null,
      sortBy: params['sortBy'] || 'createdAt',
      order: params['order'] === 'asc' ? 'asc' : 'desc',
      page: params['page'] ? Math.max(1, Number(params['page'])) : 1,
      limit: params['limit'] ? Math.max(1, Number(params['limit'])) : s.limit
    }));
  }

  /**
   * Sincroniza los filtros actuales del Store en la URL del navegador (sync_url) en formato ?key=value&key=value
   */
  syncUrl(targetRoute?: string) {
    const queryParams = this.currentQueryParams();
    const commands = targetRoute ? [targetRoute] : [];
    this.router.navigate(commands, {
      queryParams,
      replaceUrl: !targetRoute
    });
  }

  /**
   * Actualiza múltiples filtros a la vez, sincroniza la URL y obtiene los datos con AbortController
   */
  updateFilters(
    partial: Partial<{
      search: string;
      location: string;
      host: string;
      brand: string;
      category: string;
      condition: string;
      size: string;
      minPrice: number | null;
      maxPrice: number | null;
      sortBy: string;
      order: 'asc' | 'desc';
      page: number;
      limit: number;
    }>,
    syncToUrl = true
  ) {
    this.state.update(s => {
      const resetPage =
        partial.page === undefined &&
        (partial.search !== undefined ||
          partial.location !== undefined ||
          partial.host !== undefined ||
          partial.brand !== undefined ||
          partial.category !== undefined ||
          partial.condition !== undefined ||
          partial.size !== undefined ||
          partial.minPrice !== undefined ||
          partial.maxPrice !== undefined ||
          partial.sortBy !== undefined ||
          partial.order !== undefined);

      return {
        ...s,
        searchFilter: partial.search !== undefined ? partial.search : s.searchFilter,
        locationFilter: partial.location !== undefined ? partial.location : s.locationFilter,
        hostFilter: partial.host !== undefined ? partial.host : s.hostFilter,
        brandFilter: partial.brand !== undefined ? partial.brand : s.brandFilter,
        categoryFilter: partial.category !== undefined ? partial.category : s.categoryFilter,
        conditionFilter: partial.condition !== undefined ? partial.condition : s.conditionFilter,
        sizeFilter: partial.size !== undefined ? partial.size : s.sizeFilter,
        minPriceFilter: partial.minPrice !== undefined ? partial.minPrice : s.minPriceFilter,
        maxPriceFilter: partial.maxPrice !== undefined ? partial.maxPrice : s.maxPriceFilter,
        sortBy: partial.sortBy !== undefined ? partial.sortBy : s.sortBy,
        order: partial.order !== undefined ? partial.order : s.order,
        page: partial.page !== undefined ? partial.page : resetPage ? 1 : s.page,
        limit: partial.limit !== undefined ? partial.limit : s.limit
      };
    });

    if (syncToUrl) {
      this.syncUrl();
    }
    this.fetchShopProducts();
  }

  setSearchFilter(term: string, sync = false) {
    this.state.update(s => ({ ...s, searchFilter: term, page: 1 }));
    if (sync) {
      this.syncUrl();
      this.fetchShopProducts();
    }
  }

  setBrandFilter(brand: string, sync = false) {
    this.state.update(s => ({ ...s, brandFilter: brand, page: 1 }));
    if (sync) {
      this.syncUrl();
      this.fetchShopProducts();
    }
  }

  setCategoryFilter(category: string, sync = false) {
    this.state.update(s => ({ ...s, categoryFilter: category, page: 1 }));
    if (sync) {
      this.syncUrl();
      this.fetchShopProducts();
    }
  }

  setConditionFilter(condition: string, sync = false) {
    this.state.update(s => ({ ...s, conditionFilter: condition, page: 1 }));
    if (sync) {
      this.syncUrl();
      this.fetchShopProducts();
    }
  }

  setSizeFilter(size: string, sync = false) {
    this.state.update(s => ({ ...s, sizeFilter: size, page: 1 }));
    if (sync) {
      this.syncUrl();
      this.fetchShopProducts();
    }
  }

  setPage(page: number, sync = true) {
    this.state.update(s => ({ ...s, page: Math.max(1, page) }));
    if (sync) {
      this.syncUrl();
      this.fetchShopProducts();
    }
  }

  setStatusFilter(status: 'all' | 'active' | 'inactive') {
    this.state.update(s => ({ ...s, statusFilter: status }));
  }

  resetFilters(sync = false) {
    this.state.update(s => ({
      ...s,
      searchFilter: '',
      locationFilter: '',
      hostFilter: '',
      brandFilter: '',
      categoryFilter: '',
      conditionFilter: '',
      sizeFilter: '',
      minPriceFilter: null,
      maxPriceFilter: null,
      sortBy: 'createdAt',
      order: 'desc',
      page: 1,
      statusFilter: 'all'
    }));
    if (sync) {
      this.syncUrl();
      this.fetchShopProducts();
    }
  }

  /**
   * Obtiene los productos/eventos desde el servidor pasando queryParams y AbortController signal
   */
  async fetchShopProducts(customSignal?: AbortSignal) {
    if (!customSignal) {
      if (this.abortController) {
        this.abortController.abort();
      }
      this.abortController = new AbortController();
    }
    const signalToUse = customSignal || this.abortController!.signal;

    const s = this.state();
    const queryParams: ProductQueryParams = {
      ...this.currentQueryParams(),
      page: s.page,
      limit: s.limit
    };

    this.state.update(st => ({ ...st, loading: true, error: null }));

    try {
      const res = await this.shopService.getShopProducts(queryParams, signalToUse);
      if (signalToUse.aborted) return;

      if (res.success && res.data) {
        const normalized = res.data.map(p => ({
          ...p,
          _id: p._id || p.id,
          isActive: p.isActive !== undefined ? p.isActive : true
        }));
        const pagination: PaginationMeta = res.pagination || {
          total: normalized.length,
          page: s.page,
          limit: s.limit,
          totalPages: Math.max(1, Math.ceil(normalized.length / s.limit))
        };
        this.state.update(st => ({
          ...st,
          products: normalized,
          pagination,
          loading: false,
          hasLoaded: true
        }));
      } else {
        this.state.update(st => ({
          ...st,
          error: res.error || 'Error cargando artículos',
          loading: false
        }));
      }
    } catch (err: any) {
      if (err?.name === 'AbortError' || signalToUse.aborted) {
        return;
      }
      this.state.update(st => ({
        ...st,
        error: err?.message || 'Error de conexión al servidor',
        loading: false
      }));
    }
  }

  loadProducts(force = false) {
    if (this.state().hasLoaded && !force) return;

    this.state.update(s => ({ ...s, loading: true, error: null }));
    this.productService.getProducts().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const normalized = res.data.map(p => ({
            ...p,
            _id: p._id || p.id,
            isActive: p.isActive !== undefined ? p.isActive : true
          }));
          this.state.update(s => ({
            ...s,
            products: normalized,
            pagination: res.pagination || {
              total: normalized.length,
              page: 1,
              limit: normalized.length || 8,
              totalPages: 1
            },
            loading: false,
            hasLoaded: true
          }));
        } else {
          this.state.update(s => ({ ...s, error: res.error || 'Error cargando productos', loading: false }));
        }
      },
      error: (err) => {
        this.state.update(s => ({ ...s, error: err.message, loading: false }));
      }
    });
  }

  loadProduct(idOrSlug: string) {
    this.state.update(s => ({ ...s, loading: true, error: null, selectedProduct: null }));

    const isMongoId = /^[a-fA-F0-9]{24}$/.test(idOrSlug);
    const req = isMongoId ? this.productService.getProduct(idOrSlug) : this.productService.getProductBySlug(idOrSlug);

    req.subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.state.update(s => ({ ...s, selectedProduct: res.data!, loading: false }));
        } else {
          this.state.update(s => ({ ...s, error: res.error || 'Error cargando producto', loading: false }));
        }
      },
      error: (err) => {
        this.state.update(s => ({ ...s, error: err.message, loading: false }));
      }
    });
  }

  addProduct(product: Partial<Product>) {
    this.state.update(s => ({ ...s, loading: true, error: null }));
    return this.productService.createProduct(product).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const newProduct = { ...res.data, _id: res.data._id || res.data.id };
          this.state.update(s => ({
            ...s,
            products: [newProduct, ...s.products],
            loading: false
          }));
        }
      },
      error: (err) => {
        this.state.update(s => ({ ...s, error: err.message, loading: false }));
      }
    });
  }

  updateProductData(id: string, product: Partial<Product>) {
    this.state.update(s => ({ ...s, loading: true, error: null }));
    return this.productService.updateProduct(id, product).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const updated = { ...res.data, _id: res.data._id || res.data.id || id };
          this.state.update(s => ({
            ...s,
            products: s.products.map(p => (p._id === id || p.id === id) ? updated : p),
            selectedProduct: (s.selectedProduct?._id === id || s.selectedProduct?.id === id) ? updated : s.selectedProduct,
            loading: false
          }));
        }
      },
      error: (err) => {
        this.state.update(s => ({ ...s, error: err.message, loading: false }));
      }
    });
  }

  toggleProductActive(id: string) {
    const current = this.state().products.find(p => p._id === id || p.id === id);
    if (!current) return;

    const newActiveState = !(current.isActive !== false);

    this.state.update(s => ({
      ...s,
      products: s.products.map(p =>
        (p._id === id || p.id === id) ? { ...p, isActive: newActiveState } : p
      )
    }));

    const action = newActiveState ? this.productService.activateProduct(id) : this.productService.deactivateProduct(id);
    action.subscribe({
      next: (res) => {
        if (!res.success) {
          this.state.update(s => ({
            ...s,
            products: s.products.map(p =>
              (p._id === id || p.id === id) ? { ...p, isActive: !newActiveState } : p
            )
          }));
        }
      },
      error: () => {
        this.state.update(s => ({
          ...s,
          products: s.products.map(p =>
            (p._id === id || p.id === id) ? { ...p, isActive: !newActiveState } : p
          )
        }));
      }
    });
  }

  deleteProductData(id: string) {
    this.state.update(s => ({ ...s, loading: true, error: null }));
    return this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        if (res.success) {
          const deletedItem = this.state().products.find(p => p._id === id || p.id === id);
          this.state.update(s => ({
            ...s,
            products: s.products.filter(p => p._id !== id && p.id !== id),
            deletedProducts: deletedItem
              ? [{ ...deletedItem, deletedAt: new Date().toISOString() }, ...s.deletedProducts]
              : s.deletedProducts,
            selectedProduct: (s.selectedProduct?._id === id || s.selectedProduct?.id === id) ? null : s.selectedProduct,
            loading: false
          }));
        }
      },
      error: (err) => {
        this.state.update(s => ({ ...s, error: err.message, loading: false }));
      }
    });
  }

  loadDeletedProducts() {
    this.state.update(s => ({ ...s, loading: true, error: null }));
    return this.productService.getDeletedProducts().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const normalized = res.data.map(p => ({
            ...p,
            _id: p._id || p.id
          }));
          this.state.update(s => ({ ...s, deletedProducts: normalized, loading: false }));
        } else {
          this.state.update(s => ({ ...s, error: res.error || 'Error cargando artículos eliminados', loading: false }));
        }
      },
      error: (err) => {
        this.state.update(s => ({ ...s, error: err.message, loading: false }));
      }
    });
  }

  restoreProductData(id: string) {
    this.state.update(s => ({ ...s, loading: true, error: null }));
    return this.productService.restoreProduct(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const restoredItem = { ...res.data, _id: res.data._id || res.data.id || id, deletedAt: null };
          this.state.update(s => ({
            ...s,
            products: [restoredItem, ...s.products],
            deletedProducts: s.deletedProducts.filter(p => p._id !== id && p.id !== id),
            loading: false
          }));
        }
      },
      error: (err) => {
        this.state.update(s => ({ ...s, error: err.message, loading: false }));
      }
    });
  }
}
