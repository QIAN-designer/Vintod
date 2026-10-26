import {
  ErrorStateComponent
} from "./chunk-C246LOGA.js";
import {
  require_sweetalert2_all
} from "./chunk-CFLKTGFK.js";
import {
  ProductsStore
} from "./chunk-YHGVVQNI.js";
import {
  Router,
  RouterLink
} from "./chunk-JJ7KZVYI.js";
import {
  CurrencyPipe,
  DatePipe
} from "./chunk-HA5NQ34U.js";
import {
  __toESM,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-FGNI3DP5.js";

// src/app/features/products/pages/product-detail/product-detail.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
var _c0 = (a0) => ["/products", a0, "edit"];
function ProductDetailComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-error-state", 2);
    \u0275\u0275listener("retry", function ProductDetailComponent_Conditional_0_Template_app_error_state_retry_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadProduct());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r1.store.error());
  }
}
function ProductDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 3)(2, "div", 4);
    \u0275\u0275element(3, "img", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 6)(5, "div", 7)(6, "div")(7, "h2", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 9);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 10);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 11)(15, "dl", 12)(16, "div", 13)(17, "dt", 14);
    \u0275\u0275text(18, "Talla");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "dd", 15);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 13)(22, "dt", 14);
    \u0275\u0275text(23, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "dd", 15);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 16)(27, "dt", 14);
    \u0275\u0275text(28, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "dd", 17);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 16)(32, "dt", 14);
    \u0275\u0275text(33, "Publicado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "dd", 15);
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(37, "div", 18)(38, "button", 19);
    \u0275\u0275text(39, " Comprar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 20);
    \u0275\u0275text(41, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 21);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteProduct());
    });
    \u0275\u0275text(43, " Eliminar ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r1.store.selectedProduct().image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80", \u0275\u0275sanitizeUrl)("alt", ctx_r1.store.selectedProduct().title);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.store.selectedProduct().title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.store.selectedProduct().brand);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(13, 10, ctx_r1.store.selectedProduct().price, "EUR", "symbol"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.store.selectedProduct().size);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.store.selectedProduct().condition);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.store.selectedProduct().description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(36, 14, ctx_r1.store.selectedProduct().createdAt, "medium"));
    \u0275\u0275advance(5);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(17, _c0, ctx_r1.store.selectedProduct()._id));
  }
}
var ProductDetailComponent = class _ProductDetailComponent {
  constructor() {
    this.store = inject(ProductsStore);
    this.router = inject(Router);
  }
  ngOnInit() {
    this.loadProduct();
  }
  loadProduct() {
    if (this.id) {
      this.store.loadProduct(this.id);
    }
  }
  deleteProduct() {
    const product = this.store.selectedProduct();
    if (!product || !product._id)
      return;
    import_sweetalert2.default.fire({
      title: "\xBFEst\xE1s seguro?",
      text: "No podr\xE1s revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "S\xED, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.deleteProductData(product._id).add(() => {
          import_sweetalert2.default.fire("Eliminado!", "La prenda ha sido eliminada.", "success");
          this.router.navigate(["/products"]);
        });
      }
    });
  }
  static {
    this.\u0275fac = function ProductDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailComponent, selectors: [["app-product-detail"]], inputs: { id: "id" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[3, "message"], [1, "bg-white", "shadow", "rounded-lg", "overflow-hidden"], [3, "retry", "message"], [1, "md:flex"], [1, "md:flex-shrink-0", "md:w-1/2", "bg-gray-100", "flex", "items-center", "justify-center"], [1, "w-full", "h-full", "object-center", "object-cover", 3, "src", "alt"], [1, "p-8", "md:w-1/2", "flex", "flex-col"], [1, "flex", "justify-between", "items-start"], [1, "text-3xl", "font-extrabold", "text-gray-900", "sm:text-4xl"], [1, "mt-2", "text-xl", "text-gray-500"], [1, "text-3xl", "font-bold", "text-gray-900"], [1, "mt-6", "border-t", "border-gray-200", "pt-6"], [1, "grid", "grid-cols-1", "gap-x-4", "gap-y-6", "sm:grid-cols-2"], [1, "sm:col-span-1"], [1, "text-sm", "font-medium", "text-gray-500"], [1, "mt-1", "text-sm", "text-gray-900"], [1, "sm:col-span-2"], [1, "mt-1", "text-sm", "text-gray-900", "whitespace-pre-line"], [1, "mt-auto", "pt-8", "flex", "gap-4"], [1, "flex-1", "bg-vinted", "border", "border-transparent", "rounded-md", "shadow-sm", "py-3", "px-4", "text-base", "font-medium", "text-white", "hover:bg-vinted-dark", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-vinted"], [1, "bg-white", "border", "border-gray-300", "rounded-md", "shadow-sm", "py-3", "px-4", "text-base", "font-medium", "text-gray-700", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-vinted", 3, "routerLink"], [1, "bg-white", "border", "border-red-300", "rounded-md", "shadow-sm", "py-3", "px-4", "text-base", "font-medium", "text-red-700", "hover:bg-red-50", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-red-500", 3, "click"]], template: function ProductDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ProductDetailComponent_Conditional_0_Template, 1, 1, "app-error-state", 0)(1, ProductDetailComponent_Conditional_1_Template, 44, 19, "div", 1);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.store.error() ? 0 : ctx.store.selectedProduct() ? 1 : -1);
      }
    }, dependencies: [CurrencyPipe, DatePipe, RouterLink, ErrorStateComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailComponent, { className: "ProductDetailComponent", filePath: "src\\app\\features\\products\\pages\\product-detail\\product-detail.component.ts", lineNumber: 70 });
})();
export {
  ProductDetailComponent
};
//# sourceMappingURL=chunk-RT4LJQCO.js.map
