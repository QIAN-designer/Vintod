import {
  AppCurrencyPipe
} from "./chunk-H2KVJB6A.js";
import {
  AppDatePipe
} from "./chunk-TB7V4D46.js";
import {
  SearchBarComponent
} from "./chunk-PXXD4P2T.js";
import {
  BadgeComponent,
  NotificationService,
  TableComponent
} from "./chunk-G3JWP25K.js";
import "./chunk-VPYCVBQT.js";
import "./chunk-CFLKTGFK.js";
import {
  ProductsStore
} from "./chunk-YHGVVQNI.js";
import {
  RouterLink
} from "./chunk-JJ7KZVYI.js";
import "./chunk-HA5NQ34U.js";
import {
  __async,
  inject,
  signal,
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
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FGNI3DP5.js";

// src/app/features/admin/recycle-bin/recycle-bin.component.ts
var _c0 = ["titleTpl"];
var _c1 = ["priceTpl"];
var _c2 = ["deletedAtTpl"];
var _c3 = ["statusTpl"];
function RecycleBinComponent_ng_template_50_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 29);
  }
  if (rf & 2) {
    const prod_r2 = \u0275\u0275nextContext().row;
    \u0275\u0275property("src", prod_r2.image, \u0275\u0275sanitizeUrl)("alt", prod_r2.title);
  }
}
function RecycleBinComponent_ng_template_50_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "\u{1F455}");
    \u0275\u0275elementEnd();
  }
}
function RecycleBinComponent_ng_template_50_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prod_r2 = \u0275\u0275nextContext().row;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" /", prod_r2.slug, " ");
  }
}
function RecycleBinComponent_ng_template_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 28);
    \u0275\u0275template(2, RecycleBinComponent_ng_template_50_Conditional_2_Template, 1, 2, "img", 29)(3, RecycleBinComponent_ng_template_50_Conditional_3_Template, 2, 0, "span", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 31);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 32);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, RecycleBinComponent_ng_template_50_Conditional_9_Template, 2, 1, "span", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const prod_r2 = ctx.row;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(prod_r2.image ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(prod_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(prod_r2.description);
    \u0275\u0275advance();
    \u0275\u0275conditional(prod_r2.slug ? 9 : -1);
  }
}
function RecycleBinComponent_ng_template_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "appCurrency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prod_r3 = ctx.row;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, prod_r3.price));
  }
}
function RecycleBinComponent_ng_template_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "appDate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 37);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "appDate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const prod_r4 = ctx.row;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 2, prod_r4.deletedAt, "full"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(6, 5, prod_r4.deletedAt, "relative"), " ");
  }
}
function RecycleBinComponent_ng_template_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-badge", 38);
    \u0275\u0275text(1, " Eliminado ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("dot", true);
  }
}
function RecycleBinComponent_ng_template_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "button", 40);
    \u0275\u0275listener("click", function RecycleBinComponent_ng_template_58_Template_button_click_1_listener() {
      const prod_r6 = \u0275\u0275restoreView(_r5).row;
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.restoreProduct(prod_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 41);
    \u0275\u0275element(3, "path", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Reactivar Prenda");
    \u0275\u0275elementEnd()()();
  }
}
var RecycleBinComponent = class _RecycleBinComponent {
  constructor() {
    this.store = inject(ProductsStore);
    this.notifications = inject(NotificationService);
    this.searchQuery = signal("");
    this.columns = [];
  }
  ngOnInit() {
    this.reload();
  }
  ngAfterViewInit() {
    this.columns = [
      { key: "title", label: "Art\xEDculo Eliminado", cellTemplate: this.titleTpl },
      { key: "brand", label: "Marca" },
      { key: "size", label: "Talla", align: "center" },
      { key: "price", label: "Precio", align: "right", cellTemplate: this.priceTpl },
      { key: "status", label: "Estado", align: "center", cellTemplate: this.statusTpl },
      { key: "deletedAt", label: "Fecha Eliminaci\xF3n (deletedAt)", cellTemplate: this.deletedAtTpl }
    ];
  }
  reload() {
    this.store.loadDeletedProducts();
  }
  filteredDeletedProducts() {
    const list = this.store.deletedProducts();
    const q = this.searchQuery().toLowerCase().trim();
    if (!q)
      return list;
    return list.filter((p) => p.title.toLowerCase().includes(q) || p.description && p.description.toLowerCase().includes(q) || p.brand && p.brand.toLowerCase().includes(q));
  }
  restoreProduct(prod) {
    return __async(this, null, function* () {
      const id = prod._id || prod.id;
      if (!id)
        return;
      const confirmed = yield this.notifications.confirm("\xBFReactivar art\xEDculo?", `El art\xEDculo "${prod.title}" volver\xE1 a estar disponible en el cat\xE1logo activo y se limpiar\xE1 su deletedAt.`, "S\xED, reactivar");
      if (confirmed) {
        this.store.restoreProductData(id);
        this.notifications.success("Reactivado con \xE9xito", `"${prod.title}" ha sido restaurado.`);
      }
    });
  }
  static {
    this.\u0275fac = function RecycleBinComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RecycleBinComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RecycleBinComponent, selectors: [["app-recycle-bin"]], viewQuery: function RecycleBinComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
        \u0275\u0275viewQuery(_c2, 5);
        \u0275\u0275viewQuery(_c3, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.titleTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.priceTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.deletedAtTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.statusTpl = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 60, vars: 7, consts: [["titleTpl", ""], ["priceTpl", ""], ["deletedAtTpl", ""], ["statusTpl", ""], ["actionsTemplate", ""], [1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4"], [1, "flex", "items-center", "gap-2"], [1, "text-2xl", "font-bold", "tracking-tight", "text-slate-900"], [1, "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-semibold", "bg-rose-50", "text-rose-700", "border", "border-rose-200"], [1, "text-sm", "text-slate-500", "mt-1"], [1, "flex", "items-center", "gap-3"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-3.5", "py-2", "text-sm", "font-medium", "text-slate-700", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "shadow-xs", "transition-all", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-slate-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"], ["routerLink", "/admin/products", 1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "transition-all"], [1, "bg-amber-50", "border", "border-amber-200", "rounded-xl", "p-4", "flex", "items-start", "gap-3"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-amber-600", "shrink-0", "mt-0.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-xs", "text-amber-800", "leading-relaxed"], [1, "font-semibold"], [1, "bg-amber-100", "px-1", "py-0.5", "rounded", "font-mono"], [1, "bg-white", "p-4", "rounded-xl", "border", "border-slate-200", "shadow-xs", "flex", "flex-col", "sm:flex-row", "gap-4", "items-center", "justify-between"], [1, "w-full", "sm:w-96"], ["placeholder", "Buscar prenda eliminada por t\xEDtulo, marca o descripci\xF3n...", 3, "searchChange", "searchTerm"], [1, "text-xs", "text-slate-500"], [1, "font-bold", "text-slate-800"], ["emptyMessage", "No hay prendas eliminadas en la papelera", 3, "columns", "data", "loading", "hasActions", "actionsTemplate"], [1, "w-10", "h-10", "rounded-lg", "overflow-hidden", "bg-slate-100", "border", "border-slate-200", "shrink-0", "flex", "items-center", "justify-center", "opacity-75"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "text-xs", "text-slate-400"], [1, "font-semibold", "text-slate-900"], [1, "text-xs", "text-slate-400", "truncate", "max-w-xs"], [1, "inline-block", "mt-0.5", "text-[10px]", "font-mono", "text-slate-500", "bg-slate-100", "px-1", "rounded"], [1, "font-bold", "text-slate-900"], [1, "text-xs"], [1, "font-mono", "text-rose-700", "bg-rose-50", "border", "border-rose-200", "px-2", "py-0.5", "rounded"], [1, "text-[11px]", "text-slate-400", "mt-1"], ["color", "danger", 3, "dot"], [1, "flex", "items-center", "justify-end"], ["type", "button", "title", "Reactivar y restaurar art\xEDculo al cat\xE1logo activo", 1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "text-xs", "font-semibold", "text-emerald-700", "bg-emerald-50", "hover:bg-emerald-100", "border", "border-emerald-300", "rounded-lg", "shadow-2xs", "transition-all", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-emerald-600"]], template: function RecycleBinComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div")(3, "div", 7)(4, "h1", 8);
        \u0275\u0275text(5, "Art\xEDculos Eliminados");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "span", 9);
        \u0275\u0275text(7, " deletedAt \u2260 null ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "p", 10);
        \u0275\u0275text(9, " Papelera y auditor\xEDa de prendas dadas de baja l\xF3gicamente (soft delete). Puedes reactivarlas al cat\xE1logo activo en cualquier momento. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 11)(11, "button", 12);
        \u0275\u0275listener("click", function RecycleBinComponent_Template_button_click_11_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.reload());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(12, "svg", 13);
        \u0275\u0275element(13, "path", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(14, "span");
        \u0275\u0275text(15, "Actualizar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "a", 15)(17, "span");
        \u0275\u0275text(18, "Ir al Cat\xE1logo Activo \u2192");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(19, "div", 16);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(20, "svg", 17);
        \u0275\u0275element(21, "path", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(22, "div", 19)(23, "strong", 20);
        \u0275\u0275text(24, "Informaci\xF3n de recuperaci\xF3n:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(25, " Las prendas listadas a continuaci\xF3n han sido eliminadas mediante ");
        \u0275\u0275elementStart(26, "em");
        \u0275\u0275text(27, "Soft Delete");
        \u0275\u0275elementEnd();
        \u0275\u0275text(28, " (su campo ");
        \u0275\u0275elementStart(29, "code", 21);
        \u0275\u0275text(30, "deletedAt");
        \u0275\u0275elementEnd();
        \u0275\u0275text(31, " contiene una fecha). Al pulsar ");
        \u0275\u0275elementStart(32, "strong");
        \u0275\u0275text(33, "Reactivar Prenda");
        \u0275\u0275elementEnd();
        \u0275\u0275text(34, ", el backend restablece ");
        \u0275\u0275elementStart(35, "code", 21);
        \u0275\u0275text(36, "deletedAt: null");
        \u0275\u0275elementEnd();
        \u0275\u0275text(37, " mediante ");
        \u0275\u0275elementStart(38, "code", 21);
        \u0275\u0275text(39, "POST /api/products/:id/restore");
        \u0275\u0275elementEnd();
        \u0275\u0275text(40, ", volviendo a estar visible en el cat\xE1logo de forma inmediata. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "div", 22)(42, "div", 23)(43, "app-search-bar", 24);
        \u0275\u0275listener("searchChange", function RecycleBinComponent_Template_app_search_bar_searchChange_43_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.searchQuery.set($event));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 25);
        \u0275\u0275text(45, " Total eliminados: ");
        \u0275\u0275elementStart(46, "span", 26);
        \u0275\u0275text(47);
        \u0275\u0275elementEnd();
        \u0275\u0275text(48, " prendas ");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(49, "app-table", 27);
        \u0275\u0275template(50, RecycleBinComponent_ng_template_50_Template, 10, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(52, RecycleBinComponent_ng_template_52_Template, 3, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(54, RecycleBinComponent_ng_template_54_Template, 7, 8, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(56, RecycleBinComponent_ng_template_56_Template, 2, 1, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(58, RecycleBinComponent_ng_template_58_Template, 6, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const actionsTemplate_r8 = \u0275\u0275reference(59);
        \u0275\u0275advance(43);
        \u0275\u0275property("searchTerm", ctx.searchQuery());
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.store.deletedProducts().length);
        \u0275\u0275advance(2);
        \u0275\u0275property("columns", ctx.columns)("data", ctx.filteredDeletedProducts())("loading", ctx.store.loading())("hasActions", true)("actionsTemplate", actionsTemplate_r8);
      }
    }, dependencies: [
      RouterLink,
      TableComponent,
      BadgeComponent,
      SearchBarComponent,
      AppCurrencyPipe,
      AppDatePipe
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecycleBinComponent, { className: "RecycleBinComponent", filePath: "src\\app\\features\\admin\\recycle-bin\\recycle-bin.component.ts", lineNumber: 154 });
})();
export {
  RecycleBinComponent
};
//# sourceMappingURL=chunk-PJ54GDNL.js.map
