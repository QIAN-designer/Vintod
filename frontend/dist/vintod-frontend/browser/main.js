import {
  require_sweetalert2_all
} from "./chunk-CFLKTGFK.js";
import {
  RouterOutlet,
  bootstrapApplication,
  provideHttpClient,
  provideRouter,
  withComponentInputBinding,
  withInterceptors,
  withViewTransitions
} from "./chunk-JJ7KZVYI.js";
import "./chunk-HA5NQ34U.js";
import {
  __toESM,
  catchError,
  finalize,
  inject,
  signal,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtemplate
} from "./chunk-FGNI3DP5.js";

// src/app/app.routes.ts
var routes = [
  // Public Marketplace Layout
  {
    path: "",
    loadComponent: () => import("./chunk-3LWXS66F.js").then((m) => m.PublicLayoutComponent),
    children: [
      {
        path: "",
        redirectTo: "products",
        pathMatch: "full"
      },
      {
        path: "products",
        loadComponent: () => import("./chunk-DRPFOAEY.js").then((m) => m.ProductListComponent)
      },
      {
        path: "products/new",
        loadComponent: () => import("./chunk-X3BP2TJY.js").then((m) => m.ProductCreatePageComponent)
      },
      {
        path: "products/:id",
        loadComponent: () => import("./chunk-RT4LJQCO.js").then((m) => m.ProductDetailComponent)
      },
      {
        path: "products/:id/edit",
        loadComponent: () => import("./chunk-6KABGSX2.js").then((m) => m.ProductEditPageComponent)
      }
    ]
  },
  // Admin Dashboard Layout (Feature-based)
  {
    path: "admin",
    loadComponent: () => import("./chunk-4ZAG5Z3Q.js").then((m) => m.AdminLayoutComponent),
    children: [
      {
        path: "",
        redirectTo: "products",
        pathMatch: "full"
      },
      {
        path: "products",
        loadComponent: () => import("./chunk-LFQTONNE.js").then((m) => m.AdminProductsComponent)
      },
      {
        path: "recycle-bin",
        loadComponent: () => import("./chunk-PJ54GDNL.js").then((m) => m.RecycleBinComponent)
      },
      {
        path: "products/new",
        loadComponent: () => import("./chunk-X3BP2TJY.js").then((m) => m.ProductCreatePageComponent)
      },
      {
        path: "products/:id/edit",
        loadComponent: () => import("./chunk-6KABGSX2.js").then((m) => m.ProductEditPageComponent)
      },
      {
        path: "users",
        loadComponent: () => import("./chunk-BDOPLPQC.js").then((m) => m.AdminUsersComponent)
      },
      {
        path: "brands",
        loadComponent: () => import("./chunk-CQGLSHWX.js").then((m) => m.AdminBrandsComponent)
      },
      {
        path: "categories",
        loadComponent: () => import("./chunk-GNLIO432.js").then((m) => m.AdminCategoriesComponent)
      },
      {
        path: "conditions",
        loadComponent: () => import("./chunk-R77CDAUY.js").then((m) => m.AdminConditionsComponent)
      },
      {
        path: "orders",
        loadComponent: () => import("./chunk-URY37ZKB.js").then((m) => m.AdminOrdersComponent)
      }
    ]
  },
  // Fallback Route
  {
    path: "**",
    loadComponent: () => import("./chunk-D43YN224.js").then((m) => m.EmptyStateComponent)
  }
];

// src/app/core/interceptors/error.interceptor.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
var errorInterceptor = (req, next) => {
  return next(req).pipe(catchError((error) => {
    let errorMessage = "Ocurri\xF3 un error inesperado";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = "Error de red o servidor ca\xEDdo";
      } else if (error.status === 400) {
        errorMessage = error.error?.error || "Solicitud incorrecta";
      } else if (error.status === 404) {
        errorMessage = "Recurso no encontrado";
      } else if (error.status === 500) {
        errorMessage = "Error interno del servidor";
      } else {
        errorMessage = error.error?.error || error.message;
      }
    }
    import_sweetalert2.default.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
      confirmButtonColor: "#007782"
    });
    return throwError(() => new Error(errorMessage));
  }));
};

// src/app/core/services/loading.service.ts
var LoadingService = class _LoadingService {
  constructor() {
    this.loadingCount = signal(0);
    this.isLoading = signal(false);
  }
  show() {
    this.loadingCount.update((count) => count + 1);
    this.isLoading.set(true);
  }
  hide() {
    this.loadingCount.update((count) => Math.max(0, count - 1));
    if (this.loadingCount() === 0) {
      this.isLoading.set(false);
    }
  }
  static {
    this.\u0275fac = function LoadingService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoadingService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LoadingService, factory: _LoadingService.\u0275fac, providedIn: "root" });
  }
};

// src/app/core/interceptors/loading.interceptor.ts
var loadingInterceptor = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();
  return next(req).pipe(finalize(() => loadingService.hide()));
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor]))
  ]
};

// src/app/shared/components/loader/loader.component.ts
function LoaderComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "div", 1);
    \u0275\u0275elementEnd();
  }
}
var LoaderComponent = class _LoaderComponent {
  constructor() {
    this.loadingService = inject(LoadingService);
  }
  static {
    this.\u0275fac = function LoaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoaderComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoaderComponent, selectors: [["app-loader"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [[1, "fixed", "inset-0", "bg-white/50", "backdrop-blur-sm", "z-50", "flex", "items-center", "justify-center"], [1, "animate-spin", "rounded-full", "h-12", "w-12", "border-4", "border-vinted", "border-t-transparent"]], template: function LoaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, LoaderComponent_Conditional_0_Template, 2, 0, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.loadingService.isLoading() ? 0 : -1);
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoaderComponent, { className: "LoaderComponent", filePath: "src\\app\\shared\\components\\loader\\loader.component.ts", lineNumber: 15 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  static {
    this.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "app-loader")(1, "router-outlet");
      }
    }, dependencies: [RouterOutlet, LoaderComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 14 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
