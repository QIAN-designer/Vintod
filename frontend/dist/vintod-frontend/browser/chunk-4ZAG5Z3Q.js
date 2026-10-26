import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-JJ7KZVYI.js";
import "./chunk-HA5NQ34U.js";
import {
  filter,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-FGNI3DP5.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor() {
    this.currentUserSignal = signal({
      id: "usr_admin_001",
      name: "Admin Vintod",
      email: "admin@vintod.local",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    });
    this.currentUser = this.currentUserSignal.asReadonly();
  }
  isAdmin() {
    return this.currentUserSignal().role === "admin";
  }
  isModerator() {
    return ["admin", "moderator"].includes(this.currentUserSignal().role);
  }
  static {
    this.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

// src/app/layouts/admin-layout/admin-layout.component.ts
var AdminLayoutComponent = class _AdminLayoutComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.isSidebarOpen = signal(false);
    this.currentSection = signal("products");
    this.updateCurrentSection(this.router.url);
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.updateCurrentSection(event.urlAfterRedirects);
      this.isSidebarOpen.set(false);
    });
  }
  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }
  updateCurrentSection(url) {
    const parts = url.split("/").filter(Boolean);
    if (parts.length >= 2 && parts[0] === "admin") {
      this.currentSection.set(parts[1]);
    } else {
      this.currentSection.set("products");
    }
  }
  static {
    this.\u0275fac = function AdminLayoutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminLayoutComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLayoutComponent, selectors: [["app-admin-layout"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 87, vars: 6, consts: [[1, "min-h-screen", "bg-slate-50", "flex"], [1, "fixed", "inset-y-0", "left-0", "z-40", "w-64", "bg-slate-900", "text-slate-200", "transform", "transition-transform", "duration-200", "ease-in-out", "lg:translate-x-0", "lg:static", "flex", "flex-col", "shadow-xl"], [1, "h-16", "flex", "items-center", "justify-between", "px-6", "bg-slate-950", "border-b", "border-slate-800"], [1, "flex", "items-center", "gap-2.5"], [1, "w-8", "h-8", "rounded-lg", "bg-teal-500", "flex", "items-center", "justify-center", "font-black", "text-slate-950", "text-xl", "shadow"], [1, "text-lg", "font-bold", "tracking-tight", "text-white"], [1, "ml-1.5", "px-1.5", "py-0.5", "text-[10px]", "font-bold", "uppercase", "tracking-wider", "bg-teal-950", "text-teal-400", "border", "border-teal-800/60", "rounded"], ["type", "button", 1, "lg:hidden", "text-slate-400", "hover:text-white", "p-1", "rounded-md", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "flex-1", "px-3", "py-4", "space-y-1", "overflow-y-auto"], [1, "px-3", "pb-2", "text-[11px]", "font-bold", "uppercase", "tracking-wider", "text-slate-400"], ["routerLink", "/admin/products", "routerLinkActive", "bg-teal-600/20 text-teal-400 border-l-4 border-teal-500 font-semibold", 1, "group", "flex", "items-center", "gap-3", "px-3", "py-2.5", "text-sm", "font-medium", "rounded-r-lg", "text-slate-300", "hover:bg-slate-800/80", "hover:text-white", "transition-all"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-slate-400", "group-hover:text-teal-400", "transition-colors"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"], ["routerLink", "/admin/recycle-bin", "routerLinkActive", "bg-teal-600/20 text-teal-400 border-l-4 border-teal-500 font-semibold", 1, "group", "flex", "items-center", "gap-3", "px-3", "py-2.5", "text-sm", "font-medium", "rounded-r-lg", "text-slate-300", "hover:bg-slate-800/80", "hover:text-white", "transition-all"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-slate-400", "group-hover:text-rose-400", "transition-colors"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], ["routerLink", "/admin/brands", "routerLinkActive", "bg-teal-600/20 text-teal-400 border-l-4 border-teal-500 font-semibold", 1, "group", "flex", "items-center", "gap-3", "px-3", "py-2.5", "text-sm", "font-medium", "rounded-r-lg", "text-slate-300", "hover:bg-slate-800/80", "hover:text-white", "transition-all"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"], ["routerLink", "/admin/categories", "routerLinkActive", "bg-teal-600/20 text-teal-400 border-l-4 border-teal-500 font-semibold", 1, "group", "flex", "items-center", "gap-3", "px-3", "py-2.5", "text-sm", "font-medium", "rounded-r-lg", "text-slate-300", "hover:bg-slate-800/80", "hover:text-white", "transition-all"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"], ["routerLink", "/admin/conditions", "routerLinkActive", "bg-teal-600/20 text-teal-400 border-l-4 border-teal-500 font-semibold", 1, "group", "flex", "items-center", "gap-3", "px-3", "py-2.5", "text-sm", "font-medium", "rounded-r-lg", "text-slate-300", "hover:bg-slate-800/80", "hover:text-white", "transition-all"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "pt-4", "px-3", "pb-2", "text-[11px]", "font-bold", "uppercase", "tracking-wider", "text-slate-400"], ["routerLink", "/admin/users", "routerLinkActive", "bg-teal-600/20 text-teal-400 border-l-4 border-teal-500 font-semibold", 1, "group", "flex", "items-center", "gap-3", "px-3", "py-2.5", "text-sm", "font-medium", "rounded-r-lg", "text-slate-300", "hover:bg-slate-800/80", "hover:text-white", "transition-all"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"], ["routerLink", "/admin/orders", "routerLinkActive", "bg-teal-600/20 text-teal-400 border-l-4 border-teal-500 font-semibold", 1, "group", "flex", "items-center", "gap-3", "px-3", "py-2.5", "text-sm", "font-medium", "rounded-r-lg", "text-slate-300", "hover:bg-slate-800/80", "hover:text-white", "transition-all"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"], [1, "p-4", "bg-slate-950", "border-t", "border-slate-800"], ["routerLink", "/", 1, "flex", "items-center", "justify-center", "gap-2", "w-full", "py-2", "px-3", "text-xs", "font-semibold", "rounded-lg", "bg-slate-800", "hover:bg-slate-700", "text-slate-200", "transition-colors"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 19l-7-7m0 0l7-7m-7 7h18"], [1, "flex-1", "flex", "flex-col", "min-w-0", "overflow-hidden"], [1, "h-16", "bg-white", "border-b", "border-slate-200", "flex", "items-center", "justify-between", "px-4", "sm:px-6", "lg:px-8", "z-30", "shadow-xs"], [1, "flex", "items-center", "gap-3"], ["type", "button", 1, "lg:hidden", "text-slate-500", "hover:text-slate-700", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-6", "h-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6h16M4 12h16M4 18h16"], ["aria-label", "Breadcrumb", 1, "flex", "items-center", "text-sm", "font-medium", "text-slate-500"], [1, "inline-flex", "items-center", "space-x-1", "sm:space-x-2"], [1, "inline-flex", "items-center"], [1, "text-slate-400"], [1, "flex", "items-center"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-4", "h-4", "text-slate-300", "mx-1"], ["fill-rule", "evenodd", "d", "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule", "evenodd"], [1, "capitalize", "text-slate-800", "font-semibold"], [1, "flex", "items-center", "gap-4"], ["alt", "Avatar", 1, "w-9", "h-9", "rounded-full", "object-cover", "ring-2", "ring-teal-500/20", 3, "src"], [1, "hidden", "sm:block", "text-left"], [1, "text-xs", "font-bold", "text-slate-800"], [1, "text-[11px]", "text-slate-400", "capitalize"], [1, "flex-1", "overflow-y-auto", "p-4", "sm:p-6", "lg:p-8"]], template: function AdminLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
        \u0275\u0275text(5, " V ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div")(7, "span", 5);
        \u0275\u0275text(8, "Vintod");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "span", 6);
        \u0275\u0275text(10, "Admin");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(11, "button", 7);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_11_listener() {
          return ctx.toggleSidebar();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(12, "svg", 8);
        \u0275\u0275element(13, "path", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(14, "nav", 10)(15, "div", 11);
        \u0275\u0275text(16, " Cat\xE1logo & Marketplace ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "a", 12);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(18, "svg", 13);
        \u0275\u0275element(19, "path", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(20, "span");
        \u0275\u0275text(21, "Productos / Prendas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "a", 15);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(23, "svg", 16);
        \u0275\u0275element(24, "path", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(25, "span");
        \u0275\u0275text(26, "Papelera (Reactivar)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "a", 18);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(28, "svg", 13);
        \u0275\u0275element(29, "path", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(30, "span");
        \u0275\u0275text(31, "Marcas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "a", 20);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(33, "svg", 13);
        \u0275\u0275element(34, "path", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(35, "span");
        \u0275\u0275text(36, "Categor\xEDas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "a", 22);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(38, "svg", 13);
        \u0275\u0275element(39, "path", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(40, "span");
        \u0275\u0275text(41, "Estados de Prenda");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "div", 24);
        \u0275\u0275text(43, " Comunidad & Ventas ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "a", 25);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(45, "svg", 13);
        \u0275\u0275element(46, "path", 26);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(47, "span");
        \u0275\u0275text(48, "Usuarios / Vendedores");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "a", 27);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(50, "svg", 13);
        \u0275\u0275element(51, "path", 28);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(52, "span");
        \u0275\u0275text(53, "Pedidos & Transacciones");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(54, "div", 29)(55, "a", 30);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(56, "svg", 31);
        \u0275\u0275element(57, "path", 32);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(58, "span");
        \u0275\u0275text(59, "Volver al Marketplace");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(60, "div", 33)(61, "header", 34)(62, "div", 35)(63, "button", 36);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_63_listener() {
          return ctx.toggleSidebar();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(64, "svg", 37);
        \u0275\u0275element(65, "path", 38);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(66, "nav", 39)(67, "ol", 40)(68, "li", 41)(69, "span", 42);
        \u0275\u0275text(70, "Admin");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(71, "li")(72, "div", 43);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(73, "svg", 44);
        \u0275\u0275element(74, "path", 45);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(75, "span", 46);
        \u0275\u0275text(76);
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275elementStart(77, "div", 47)(78, "div", 35);
        \u0275\u0275element(79, "img", 48);
        \u0275\u0275elementStart(80, "div", 49)(81, "div", 50);
        \u0275\u0275text(82);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "div", 51);
        \u0275\u0275text(84);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(85, "main", 52);
        \u0275\u0275element(86, "router-outlet");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275classProp("-translate-x-full", !ctx.isSidebarOpen());
        \u0275\u0275advance(75);
        \u0275\u0275textInterpolate(ctx.currentSection());
        \u0275\u0275advance(3);
        \u0275\u0275property("src", ctx.auth.currentUser().avatar, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.auth.currentUser().name);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.auth.currentUser().role);
      }
    }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLayoutComponent, { className: "AdminLayoutComponent", filePath: "src\\app\\layouts\\admin-layout\\admin-layout.component.ts", lineNumber: 199 });
})();
export {
  AdminLayoutComponent
};
//# sourceMappingURL=chunk-4ZAG5Z3Q.js.map
