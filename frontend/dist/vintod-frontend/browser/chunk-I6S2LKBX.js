import {
  EventEmitter,
  __spreadProps,
  __spreadValues,
  computed,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-FGNI3DP5.js";

// src/app/core/services/admin.store.ts
var AdminStore = class _AdminStore {
  constructor() {
    this.usersSignal = signal([
      {
        id: "usr_001",
        name: "Elena Morales",
        email: "elena.morales@example.com",
        role: "user",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
        isActive: true,
        city: "Madrid",
        productsCount: 14,
        salesCount: 8,
        rating: 4.9,
        createdAt: "2025-03-12"
      },
      {
        id: "usr_002",
        name: "Carlos Ruiz",
        email: "carlos.vintage@example.com",
        role: "moderator",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        isActive: true,
        city: "Barcelona",
        productsCount: 32,
        salesCount: 25,
        rating: 5,
        createdAt: "2025-01-20"
      },
      {
        id: "usr_003",
        name: "Sara Ben\xEDtez",
        email: "sara.fashion@example.com",
        role: "user",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
        isActive: false,
        city: "Valencia",
        productsCount: 6,
        salesCount: 1,
        rating: 3.8,
        createdAt: "2025-06-15"
      },
      {
        id: "usr_004",
        name: "Marcos Gil",
        email: "marcos.streetwear@example.com",
        role: "user",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        isActive: true,
        city: "Sevilla",
        productsCount: 19,
        salesCount: 12,
        rating: 4.8,
        createdAt: "2025-04-05"
      },
      {
        id: "usr_005",
        name: "Admin Vintod",
        email: "admin@vintod.local",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        isActive: true,
        city: "Bilbao",
        productsCount: 0,
        salesCount: 0,
        rating: 5,
        createdAt: "2024-11-01"
      }
    ]);
    this.brandsSignal = signal([
      {
        id: "brd_001",
        name: "Levi's",
        slug: "levis",
        description: "Ic\xF3nica marca estadounidense de prendas denim y vaqueros desde 1853.",
        logo: "\u{1F456}",
        isActive: true,
        itemCount: 48,
        featured: true,
        createdAt: "2025-01-01"
      },
      {
        id: "brd_002",
        name: "Nike",
        slug: "nike",
        description: "L\xEDder mundial en ropa deportiva, calzado y est\xE9tica streetwear.",
        logo: "\u2714\uFE0F",
        isActive: true,
        itemCount: 65,
        featured: true,
        createdAt: "2025-01-01"
      },
      {
        id: "brd_003",
        name: "Zara",
        slug: "zara",
        description: "Moda r\xE1pida de tendencia internacional perteneciente al grupo Inditex.",
        logo: "\u{1F457}",
        isActive: true,
        itemCount: 82,
        featured: false,
        createdAt: "2025-01-10"
      },
      {
        id: "brd_004",
        name: "Adidas",
        slug: "adidas",
        description: "Referente alem\xE1n de ropa deportiva cl\xE1sica con las ic\xF3nicas tres bandas.",
        logo: "\u{1F45F}",
        isActive: true,
        itemCount: 41,
        featured: true,
        createdAt: "2025-01-12"
      },
      {
        id: "brd_005",
        name: "Vans",
        slug: "vans",
        description: "Zapatillas y ropa informal inspiradas en la cultura skateboard y callejera.",
        logo: "\u{1F6F9}",
        isActive: true,
        itemCount: 29,
        featured: false,
        createdAt: "2025-02-01"
      },
      {
        id: "brd_006",
        name: "Vintage Collection",
        slug: "vintage-collection",
        description: "Piezas \xFAnicas y prendas retro de los a\xF1os 70, 80 y 90 sin marca espec\xEDfica.",
        logo: "\u{1F4FB}",
        isActive: true,
        itemCount: 54,
        featured: true,
        createdAt: "2025-02-10"
      }
    ]);
    this.categoriesSignal = signal([
      { id: "cat_001", name: "Mujer", slug: "mujer", icon: "\u{1F460}", itemCount: 142, isActive: true, parent: null, createdAt: "2025-01-01" },
      { id: "cat_002", name: "Hombre", slug: "hombre", icon: "\u{1F454}", itemCount: 98, isActive: true, parent: null, createdAt: "2025-01-01" },
      { id: "cat_003", name: "Ni\xF1os", slug: "ninos", icon: "\u{1F9F8}", itemCount: 37, isActive: true, parent: null, createdAt: "2025-01-05" },
      { id: "cat_004", name: "Calzado", slug: "calzado", icon: "\u{1F45F}", itemCount: 64, isActive: true, parent: null, createdAt: "2025-01-05" },
      { id: "cat_005", name: "Accesorios", slug: "accesorios", icon: "\u{1F392}", itemCount: 53, isActive: true, parent: null, createdAt: "2025-01-08" },
      { id: "cat_006", name: "Vintage Especial", slug: "vintage-especial", icon: "\u2728", itemCount: 28, isActive: false, parent: null, createdAt: "2025-02-15" }
    ]);
    this.conditionsSignal = signal([
      {
        id: "cnd_001",
        name: "Nuevo con etiquetas",
        slug: "nuevo-con-etiquetas",
        description: "Art\xEDculo nuevo sin estrenar, conservando sus etiquetas o embalaje original intacto.",
        badgeColor: "emerald",
        isActive: true,
        createdAt: "2025-01-01"
      },
      {
        id: "cnd_002",
        name: "Nuevo sin etiquetas",
        slug: "nuevo-sin-etiquetas",
        description: "Art\xEDculo a estrenar pero sin las etiquetas originales de venta.",
        badgeColor: "teal",
        isActive: true,
        createdAt: "2025-01-01"
      },
      {
        id: "cnd_003",
        name: "Muy bueno",
        slug: "muy-bueno",
        description: "Prenda apenas usada con m\xEDnimos signos de uso apenas perceptibles.",
        badgeColor: "cyan",
        isActive: true,
        createdAt: "2025-01-01"
      },
      {
        id: "cnd_004",
        name: "Bueno",
        slug: "bueno",
        description: "Usado con frecuencia moderada pero bien conservado, sin roturas ni manchas severas.",
        badgeColor: "blue",
        isActive: true,
        createdAt: "2025-01-01"
      },
      {
        id: "cnd_005",
        name: "Satisfactorio",
        slug: "satisfactorio",
        description: "Presenta desgaste evidente o peque\xF1os desperfectos detallados en las fotos.",
        badgeColor: "amber",
        isActive: true,
        createdAt: "2025-01-01"
      }
    ]);
    this.ordersSignal = signal([
      {
        id: "ord_1001",
        orderNumber: "VT-2026-9812",
        buyerId: "usr_001",
        buyerName: "Elena Morales",
        buyerEmail: "elena.morales@example.com",
        sellerId: "usr_002",
        sellerName: "Carlos Ruiz",
        items: [
          { productId: "p1", title: "Sudadera con capucha vintage", price: 24.99, brand: "Nike" }
        ],
        totalAmount: 28.49,
        shippingFee: 3.5,
        status: "delivered",
        isActive: true,
        createdAt: "2026-03-28T14:20:00Z",
        paymentMethod: "Tarjeta de cr\xE9dito (Stripe)"
      },
      {
        id: "ord_1002",
        orderNumber: "VT-2026-9813",
        buyerId: "usr_003",
        buyerName: "Sara Ben\xEDtez",
        buyerEmail: "sara.fashion@example.com",
        sellerId: "usr_004",
        sellerName: "Marcos Gil",
        items: [
          { productId: "p2", title: "Pantalones vaqueros 501", price: 38, brand: "Levi's" }
        ],
        totalAmount: 41.5,
        shippingFee: 3.5,
        status: "shipped",
        isActive: true,
        createdAt: "2026-04-01T09:12:00Z",
        paymentMethod: "PayPal"
      },
      {
        id: "ord_1003",
        orderNumber: "VT-2026-9814",
        buyerId: "usr_004",
        buyerName: "Marcos Gil",
        buyerEmail: "marcos.streetwear@example.com",
        sellerId: "usr_001",
        sellerName: "Elena Morales",
        items: [
          { productId: "p3", title: "Zapatillas deportivas retro", price: 45.5, brand: "Adidas" }
        ],
        totalAmount: 49,
        shippingFee: 3.5,
        status: "paid",
        isActive: true,
        createdAt: "2026-04-02T18:45:00Z",
        paymentMethod: "Apple Pay"
      },
      {
        id: "ord_1004",
        orderNumber: "VT-2026-9815",
        buyerId: "usr_001",
        buyerName: "Elena Morales",
        buyerEmail: "elena.morales@example.com",
        sellerId: "usr_004",
        sellerName: "Marcos Gil",
        items: [
          { productId: "p4", title: "Cazadora vaquera borreguillo", price: 55, brand: "Zara" }
        ],
        totalAmount: 58.5,
        shippingFee: 3.5,
        status: "pending",
        isActive: false,
        // En auditoría de seguridad
        createdAt: "2026-04-03T11:05:00Z",
        paymentMethod: "Bizum"
      }
    ]);
    this.users = this.usersSignal.asReadonly();
    this.brands = this.brandsSignal.asReadonly();
    this.categories = this.categoriesSignal.asReadonly();
    this.conditions = this.conditionsSignal.asReadonly();
    this.orders = this.ordersSignal.asReadonly();
    this.activeUsersCount = computed(() => this.usersSignal().filter((u) => u.isActive).length);
    this.activeBrandsCount = computed(() => this.brandsSignal().filter((b) => b.isActive).length);
    this.activeCategoriesCount = computed(() => this.categoriesSignal().filter((c) => c.isActive).length);
    this.activeConditionsCount = computed(() => this.conditionsSignal().filter((c) => c.isActive).length);
    this.totalOrdersVolume = computed(() => this.ordersSignal().reduce((acc, order) => acc + (order.isActive ? order.totalAmount : 0), 0));
  }
  // User Actions
  toggleUserActive(id) {
    this.usersSignal.update((users) => users.map((u) => u.id === id ? __spreadProps(__spreadValues({}, u), { isActive: !u.isActive }) : u));
  }
  saveUser(user) {
    if (user.id) {
      this.usersSignal.update((users) => users.map((u) => u.id === user.id ? __spreadValues(__spreadValues({}, u), user) : u));
    } else {
      const newUser = {
        id: `usr_${Date.now()}`,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        avatar: user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
        isActive: user.isActive ?? true,
        city: user.city || "Madrid",
        productsCount: 0,
        salesCount: 0,
        rating: 5,
        createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      };
      this.usersSignal.update((users) => [newUser, ...users]);
    }
  }
  deleteUser(id) {
    this.usersSignal.update((users) => users.filter((u) => u.id !== id));
  }
  // Brand Actions
  toggleBrandActive(id) {
    this.brandsSignal.update((brands) => brands.map((b) => b.id === id ? __spreadProps(__spreadValues({}, b), { isActive: !b.isActive }) : b));
  }
  saveBrand(brand) {
    if (brand.id) {
      this.brandsSignal.update((brands) => brands.map((b) => b.id === brand.id ? __spreadValues(__spreadValues({}, b), brand) : b));
    } else {
      const newBrand = {
        id: `brd_${Date.now()}`,
        name: brand.name,
        slug: brand.name.toLowerCase().trim().replace(/[\s\W-]+/g, "-"),
        description: brand.description || "",
        logo: brand.logo || "\u{1F3F7}\uFE0F",
        isActive: brand.isActive ?? true,
        itemCount: 0,
        featured: brand.featured ?? false,
        createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      };
      this.brandsSignal.update((brands) => [newBrand, ...brands]);
    }
  }
  deleteBrand(id) {
    this.brandsSignal.update((brands) => brands.filter((b) => b.id !== id));
  }
  // Category Actions
  toggleCategoryActive(id) {
    this.categoriesSignal.update((cats) => cats.map((c) => c.id === id ? __spreadProps(__spreadValues({}, c), { isActive: !c.isActive }) : c));
  }
  saveCategory(cat) {
    if (cat.id) {
      this.categoriesSignal.update((cats) => cats.map((c) => c.id === cat.id ? __spreadValues(__spreadValues({}, c), cat) : c));
    } else {
      const newCategory = {
        id: `cat_${Date.now()}`,
        name: cat.name,
        slug: cat.name.toLowerCase().trim().replace(/[\s\W-]+/g, "-"),
        icon: cat.icon || "\u{1F6CD}\uFE0F",
        itemCount: 0,
        isActive: cat.isActive ?? true,
        parent: cat.parent || null,
        createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      };
      this.categoriesSignal.update((cats) => [newCategory, ...cats]);
    }
  }
  deleteCategory(id) {
    this.categoriesSignal.update((cats) => cats.filter((c) => c.id !== id));
  }
  // Condition Actions
  toggleConditionActive(id) {
    this.conditionsSignal.update((conds) => conds.map((c) => c.id === id ? __spreadProps(__spreadValues({}, c), { isActive: !c.isActive }) : c));
  }
  saveCondition(condition) {
    if (condition.id) {
      this.conditionsSignal.update((conds) => conds.map((c) => c.id === condition.id ? __spreadValues(__spreadValues({}, c), condition) : c));
    } else {
      const newCond = {
        id: `cnd_${Date.now()}`,
        name: condition.name,
        slug: condition.name.toLowerCase().trim().replace(/[\s\W-]+/g, "-"),
        description: condition.description || "",
        badgeColor: condition.badgeColor || "teal",
        isActive: condition.isActive ?? true,
        createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      };
      this.conditionsSignal.update((conds) => [newCond, ...conds]);
    }
  }
  deleteCondition(id) {
    this.conditionsSignal.update((conds) => conds.filter((c) => c.id !== id));
  }
  // Order Actions
  toggleOrderActive(id) {
    this.ordersSignal.update((orders) => orders.map((o) => o.id === id ? __spreadProps(__spreadValues({}, o), { isActive: !o.isActive }) : o));
  }
  updateOrderStatus(id, status) {
    this.ordersSignal.update((orders) => orders.map((o) => o.id === id ? __spreadProps(__spreadValues({}, o), { status }) : o));
  }
  static {
    this.\u0275fac = function AdminStore_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminStore)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminStore, factory: _AdminStore.\u0275fac, providedIn: "root" });
  }
};

// src/app/shared/components/modal/modal.component.ts
var _c0 = [[["", "body", ""]], "*", [["", "footer", ""]]];
var _c1 = ["[body]", "*", "[footer]"];
function ModalComponent_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275projection(1, 2);
    \u0275\u0275elementEnd();
  }
}
function ModalComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275listener("click", function ModalComponent_Conditional_0_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3);
    \u0275\u0275listener("click", function ModalComponent_Conditional_0_Template_div_click_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(4, "div", 4)(5, "h3", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 6);
    \u0275\u0275listener("click", function ModalComponent_Conditional_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 7);
    \u0275\u0275element(9, "path", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "div", 9);
    \u0275\u0275projection(11);
    \u0275\u0275projection(12, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, ModalComponent_Conditional_0_Conditional_13_Template, 2, 0, "div", 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.maxWidthClass);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.title, " ");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.showFooter ? 13 : -1);
  }
}
var ModalComponent = class _ModalComponent {
  constructor() {
    this.isOpen = false;
    this.title = "Modal";
    this.maxWidth = "lg";
    this.showFooter = true;
    this.closed = new EventEmitter();
  }
  get maxWidthClass() {
    switch (this.maxWidth) {
      case "sm":
        return "sm:max-w-sm";
      case "md":
        return "sm:max-w-md";
      case "xl":
        return "sm:max-w-xl";
      case "2xl":
        return "sm:max-w-2xl";
      case "lg":
      default:
        return "sm:max-w-lg";
    }
  }
  close() {
    this.closed.emit();
  }
  static {
    this.\u0275fac = function ModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ModalComponent, selectors: [["app-modal"]], inputs: { isOpen: "isOpen", title: "title", maxWidth: "maxWidth", showFooter: "showFooter" }, outputs: { closed: "closed" }, standalone: true, features: [\u0275\u0275StandaloneFeature], ngContentSelectors: _c1, decls: 1, vars: 1, consts: [["aria-labelledby", "modal-title", "role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-50", "overflow-y-auto"], [1, "fixed", "inset-0", "bg-gray-900/60", "backdrop-blur-sm", "transition-opacity", 3, "click"], [1, "flex", "min-h-full", "items-center", "justify-center", "p-4", "text-center", "sm:p-0"], [1, "relative", "transform", "overflow-hidden", "rounded-xl", "bg-white", "text-left", "shadow-2xl", "transition-all", "sm:my-8", "sm:w-full", 3, "click"], [1, "px-6", "py-4", "border-b", "border-gray-100", "flex", "items-center", "justify-between", "bg-gray-50/50"], ["id", "modal-title", 1, "text-lg", "font-semibold", "text-gray-900"], ["type", "button", 1, "rounded-lg", "p-1.5", "text-gray-400", "hover:bg-gray-100", "hover:text-gray-600", "focus:outline-none", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "p-6"], [1, "px-6", "py-4", "bg-gray-50", "border-t", "border-gray-100", "flex", "justify-end", "gap-3"]], template: function ModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c0);
        \u0275\u0275template(0, ModalComponent_Conditional_0_Template, 14, 4, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.isOpen ? 0 : -1);
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ModalComponent, { className: "ModalComponent", filePath: "src\\app\\shared\\components\\modal\\modal.component.ts", lineNumber: 53 });
})();

export {
  AdminStore,
  ModalComponent
};
//# sourceMappingURL=chunk-I6S2LKBX.js.map
