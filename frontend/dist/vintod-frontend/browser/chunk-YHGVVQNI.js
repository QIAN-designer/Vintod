import {
  HttpClient
} from "./chunk-JJ7KZVYI.js";
import {
  __spreadProps,
  __spreadValues,
  computed,
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-FGNI3DP5.js";

// src/environments/environment.ts
var environment = {
  production: false,
  apiUrl: "http://localhost:3000/api"
};

// src/app/core/services/product.service.ts
var ProductService = class _ProductService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = `${environment.apiUrl}/products`;
  }
  getProducts() {
    return this.http.get(this.baseUrl);
  }
  getDeletedProducts() {
    return this.http.get(`${this.baseUrl}/deleted`);
  }
  getProduct(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getProductBySlug(slug) {
    return this.http.get(`${this.baseUrl}/slug/${slug}`);
  }
  createProduct(product) {
    return this.http.post(this.baseUrl, product);
  }
  updateProduct(id, product) {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }
  patchProduct(id, product) {
    return this.http.patch(`${this.baseUrl}/${id}`, product);
  }
  activateProduct(id) {
    return this.http.patch(`${this.baseUrl}/${id}/activate`, {});
  }
  deactivateProduct(id) {
    return this.http.patch(`${this.baseUrl}/${id}/deactivate`, {});
  }
  deleteProduct(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  restoreProduct(id) {
    return this.http.post(`${this.baseUrl}/${id}/restore`, {});
  }
  static {
    this.\u0275fac = function ProductService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductService, factory: _ProductService.\u0275fac, providedIn: "root" });
  }
};

// src/app/core/store/products.store.ts
var ProductsStore = class _ProductsStore {
  constructor() {
    this.productService = inject(ProductService);
    this.state = signal({
      products: [],
      deletedProducts: [],
      selectedProduct: null,
      loading: false,
      error: null,
      hasLoaded: false,
      searchFilter: "",
      brandFilter: "",
      categoryFilter: "",
      conditionFilter: "",
      statusFilter: "all"
    });
    this.products = computed(() => this.state().products);
    this.visibleProducts = computed(() => this.state().products.filter((p) => p.isActive !== false));
    this.deletedProducts = computed(() => this.state().deletedProducts);
    this.selectedProduct = computed(() => this.state().selectedProduct);
    this.loading = computed(() => this.state().loading);
    this.error = computed(() => this.state().error);
    this.hasLoaded = computed(() => this.state().hasLoaded);
    this.searchFilter = computed(() => this.state().searchFilter);
    this.brandFilter = computed(() => this.state().brandFilter);
    this.categoryFilter = computed(() => this.state().categoryFilter);
    this.conditionFilter = computed(() => this.state().conditionFilter);
    this.statusFilter = computed(() => this.state().statusFilter);
    this.filteredProducts = computed(() => {
      const list = this.state().products;
      const search = this.state().searchFilter.toLowerCase().trim();
      const brand = this.state().brandFilter;
      const category = this.state().categoryFilter;
      const condition = this.state().conditionFilter;
      const status = this.state().statusFilter;
      return list.filter((p) => {
        const matchesSearch = !search || p.title.toLowerCase().includes(search) || p.description && p.description.toLowerCase().includes(search) || p.brand && p.brand.toLowerCase().includes(search);
        const matchesBrand = !brand || p.brand.toLowerCase() === brand.toLowerCase();
        const matchesCategory = !category || p.category && p.category.toLowerCase() === category.toLowerCase();
        const matchesCondition = !condition || p.condition.toLowerCase() === condition.toLowerCase();
        const isActive = p.isActive !== false;
        const matchesStatus = status === "all" || status === "active" && isActive || status === "inactive" && !isActive;
        return matchesSearch && matchesBrand && matchesCategory && matchesCondition && matchesStatus;
      });
    });
    this.totalProductsCount = computed(() => this.state().products.length);
    this.activeProductsCount = computed(() => this.state().products.filter((p) => p.isActive !== false).length);
    this.inactiveProductsCount = computed(() => this.state().products.filter((p) => p.isActive === false).length);
    this.totalCatalogValue = computed(() => this.state().products.reduce((acc, p) => acc + (p.price || 0), 0));
  }
  setSearchFilter(term) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { searchFilter: term }));
  }
  setBrandFilter(brand) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { brandFilter: brand }));
  }
  setCategoryFilter(category) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { categoryFilter: category }));
  }
  setConditionFilter(condition) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { conditionFilter: condition }));
  }
  setStatusFilter(status) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { statusFilter: status }));
  }
  resetFilters() {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), {
      searchFilter: "",
      brandFilter: "",
      categoryFilter: "",
      conditionFilter: "",
      statusFilter: "all"
    }));
  }
  loadProducts(force = false) {
    if (this.state().hasLoaded && !force)
      return;
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { loading: true, error: null }));
    this.productService.getProducts().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const normalized = res.data.map((p) => __spreadProps(__spreadValues({}, p), {
            _id: p._id || p.id,
            isActive: p.isActive !== void 0 ? p.isActive : true
          }));
          this.state.update((s) => __spreadProps(__spreadValues({}, s), { products: normalized, loading: false, hasLoaded: true }));
        } else {
          this.state.update((s) => __spreadProps(__spreadValues({}, s), { error: res.error || "Error cargando productos", loading: false }));
        }
      },
      error: (err) => {
        this.state.update((s) => __spreadProps(__spreadValues({}, s), { error: err.message, loading: false }));
      }
    });
  }
  loadProduct(idOrSlug) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { loading: true, error: null, selectedProduct: null }));
    const isMongoId = /^[a-fA-F0-9]{24}$/.test(idOrSlug);
    const req = isMongoId ? this.productService.getProduct(idOrSlug) : this.productService.getProductBySlug(idOrSlug);
    req.subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.state.update((s) => __spreadProps(__spreadValues({}, s), { selectedProduct: res.data, loading: false }));
        } else {
          this.state.update((s) => __spreadProps(__spreadValues({}, s), { error: res.error || "Error cargando producto", loading: false }));
        }
      },
      error: (err) => {
        this.state.update((s) => __spreadProps(__spreadValues({}, s), { error: err.message, loading: false }));
      }
    });
  }
  addProduct(product) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { loading: true, error: null }));
    return this.productService.createProduct(product).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const newProduct = __spreadProps(__spreadValues({}, res.data), { _id: res.data._id || res.data.id });
          this.state.update((s) => __spreadProps(__spreadValues({}, s), {
            products: [newProduct, ...s.products],
            loading: false
          }));
        }
      },
      error: (err) => {
        this.state.update((s) => __spreadProps(__spreadValues({}, s), { error: err.message, loading: false }));
      }
    });
  }
  updateProductData(id, product) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { loading: true, error: null }));
    return this.productService.updateProduct(id, product).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const updated = __spreadProps(__spreadValues({}, res.data), { _id: res.data._id || res.data.id || id });
          this.state.update((s) => __spreadProps(__spreadValues({}, s), {
            products: s.products.map((p) => p._id === id || p.id === id ? updated : p),
            selectedProduct: s.selectedProduct?._id === id || s.selectedProduct?.id === id ? updated : s.selectedProduct,
            loading: false
          }));
        }
      },
      error: (err) => {
        this.state.update((s) => __spreadProps(__spreadValues({}, s), { error: err.message, loading: false }));
      }
    });
  }
  toggleProductActive(id) {
    const current = this.state().products.find((p) => p._id === id || p.id === id);
    if (!current)
      return;
    const newActiveState = !(current.isActive !== false);
    this.state.update((s) => __spreadProps(__spreadValues({}, s), {
      products: s.products.map((p) => p._id === id || p.id === id ? __spreadProps(__spreadValues({}, p), { isActive: newActiveState }) : p)
    }));
    const action = newActiveState ? this.productService.activateProduct(id) : this.productService.deactivateProduct(id);
    action.subscribe({
      next: (res) => {
        if (!res.success) {
          this.state.update((s) => __spreadProps(__spreadValues({}, s), {
            products: s.products.map((p) => p._id === id || p.id === id ? __spreadProps(__spreadValues({}, p), { isActive: !newActiveState }) : p)
          }));
        }
      },
      error: () => {
        this.state.update((s) => __spreadProps(__spreadValues({}, s), {
          products: s.products.map((p) => p._id === id || p.id === id ? __spreadProps(__spreadValues({}, p), { isActive: !newActiveState }) : p)
        }));
      }
    });
  }
  deleteProductData(id) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { loading: true, error: null }));
    return this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        if (res.success) {
          const deletedItem = this.state().products.find((p) => p._id === id || p.id === id);
          this.state.update((s) => __spreadProps(__spreadValues({}, s), {
            products: s.products.filter((p) => p._id !== id && p.id !== id),
            deletedProducts: deletedItem ? [__spreadProps(__spreadValues({}, deletedItem), { deletedAt: (/* @__PURE__ */ new Date()).toISOString() }), ...s.deletedProducts] : s.deletedProducts,
            selectedProduct: s.selectedProduct?._id === id || s.selectedProduct?.id === id ? null : s.selectedProduct,
            loading: false
          }));
        }
      },
      error: (err) => {
        this.state.update((s) => __spreadProps(__spreadValues({}, s), { error: err.message, loading: false }));
      }
    });
  }
  loadDeletedProducts() {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { loading: true, error: null }));
    return this.productService.getDeletedProducts().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const normalized = res.data.map((p) => __spreadProps(__spreadValues({}, p), {
            _id: p._id || p.id
          }));
          this.state.update((s) => __spreadProps(__spreadValues({}, s), { deletedProducts: normalized, loading: false }));
        } else {
          this.state.update((s) => __spreadProps(__spreadValues({}, s), { error: res.error || "Error cargando art\xEDculos eliminados", loading: false }));
        }
      },
      error: (err) => {
        this.state.update((s) => __spreadProps(__spreadValues({}, s), { error: err.message, loading: false }));
      }
    });
  }
  restoreProductData(id) {
    this.state.update((s) => __spreadProps(__spreadValues({}, s), { loading: true, error: null }));
    return this.productService.restoreProduct(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const restoredItem = __spreadProps(__spreadValues({}, res.data), { _id: res.data._id || res.data.id || id, deletedAt: null });
          this.state.update((s) => __spreadProps(__spreadValues({}, s), {
            products: [restoredItem, ...s.products],
            deletedProducts: s.deletedProducts.filter((p) => p._id !== id && p.id !== id),
            loading: false
          }));
        }
      },
      error: (err) => {
        this.state.update((s) => __spreadProps(__spreadValues({}, s), { error: err.message, loading: false }));
      }
    });
  }
  static {
    this.\u0275fac = function ProductsStore_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductsStore)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductsStore, factory: _ProductsStore.\u0275fac, providedIn: "root" });
  }
};

export {
  ProductsStore
};
//# sourceMappingURL=chunk-YHGVVQNI.js.map
