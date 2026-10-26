import {
  require_sweetalert2_all
} from "./chunk-CFLKTGFK.js";
import {
  CommonModule,
  NgTemplateOutlet
} from "./chunk-HA5NQ34U.js";
import {
  __async,
  __toESM,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-FGNI3DP5.js";

// src/app/core/services/notification.service.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
var NotificationService = class _NotificationService {
  constructor() {
    this.notificationsSignal = signal([]);
    this.notifications = this.notificationsSignal.asReadonly();
  }
  success(title, text) {
    import_sweetalert2.default.fire({
      icon: "success",
      title,
      text,
      timer: 2e3,
      showConfirmButton: false,
      position: "top-end",
      toast: true
    });
  }
  error(title, text) {
    import_sweetalert2.default.fire({
      icon: "error",
      title,
      text,
      confirmButtonColor: "#007782"
    });
  }
  warning(title, text) {
    import_sweetalert2.default.fire({
      icon: "warning",
      title,
      text,
      confirmButtonColor: "#007782"
    });
  }
  info(title, text) {
    import_sweetalert2.default.fire({
      icon: "info",
      title,
      text,
      timer: 2500,
      showConfirmButton: false,
      toast: true,
      position: "top-end"
    });
  }
  confirm(title, text, confirmButtonText = "S\xED, continuar") {
    return __async(this, null, function* () {
      const result = yield import_sweetalert2.default.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#007782",
        cancelButtonColor: "#9ca3af",
        confirmButtonText,
        cancelButtonText: "Cancelar"
      });
      return result.isConfirmed;
    });
  }
  static {
    this.\u0275fac = function NotificationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
  }
};

// src/app/shared/components/table/table.component.ts
var _forTrack0 = ($index, $item) => $item.key;
function _forTrack1($index, $item) {
  return this.trackByFn($item);
}
var _c0 = (a0, a1) => ({ $implicit: a0, row: a1 });
function TableComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const col_r1 = ctx.$implicit;
    \u0275\u0275styleProp("width", col_r1.width || "auto");
    \u0275\u0275classProp("text-center", col_r1.align === "center")("text-right", col_r1.align === "right")("text-left", !col_r1.align || col_r1.align === "left");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", col_r1.label, " ");
  }
}
function TableComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1, " Acciones ");
    \u0275\u0275elementEnd();
  }
}
function TableComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 7)(2, "div", 8);
    \u0275\u0275element(3, "div", 9);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Cargando datos...");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.columns.length + (ctx_r1.hasActions ? 1 : 0));
  }
}
function TableComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 7)(2, "p", 10);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 11);
    \u0275\u0275text(5, " Prueba ajustando los filtros o a\xF1adiendo nuevos elementos. ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.columns.length + (ctx_r1.hasActions ? 1 : 0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.emptyMessage);
  }
}
function TableComponent_Conditional_10_For_1_For_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableComponent_Conditional_10_For_1_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TableComponent_Conditional_10_For_1_For_2_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 16);
  }
  if (rf & 2) {
    const col_r3 = \u0275\u0275nextContext().$implicit;
    const row_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngTemplateOutlet", col_r3.cellTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c0, row_r4, row_r4));
  }
}
function TableComponent_Conditional_10_For_1_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const col_r3 = \u0275\u0275nextContext().$implicit;
    const row_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", row_r4[col_r3.key], " ");
  }
}
function TableComponent_Conditional_10_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15);
    \u0275\u0275template(1, TableComponent_Conditional_10_For_1_For_2_Conditional_1_Template, 1, 5, "ng-container")(2, TableComponent_Conditional_10_For_1_For_2_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const col_r3 = ctx.$implicit;
    \u0275\u0275classProp("text-center", col_r3.align === "center")("text-right", col_r3.align === "right");
    \u0275\u0275advance();
    \u0275\u0275conditional(col_r3.cellTemplate ? 1 : 2);
  }
}
function TableComponent_Conditional_10_For_1_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableComponent_Conditional_10_For_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275template(1, TableComponent_Conditional_10_For_1_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.actionsTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c0, row_r4, row_r4));
  }
}
function TableComponent_Conditional_10_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 12);
    \u0275\u0275repeaterCreate(1, TableComponent_Conditional_10_For_1_For_2_Template, 3, 5, "td", 13, _forTrack0);
    \u0275\u0275template(3, TableComponent_Conditional_10_For_1_Conditional_3_Template, 2, 5, "td", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.columns);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasActions ? 3 : -1);
  }
}
function TableComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TableComponent_Conditional_10_For_1_Template, 4, 1, "tr", 12, _forTrack1, true);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.data);
  }
}
var TableComponent = class _TableComponent {
  constructor() {
    this.columns = [];
    this.data = [];
    this.loading = false;
    this.emptyMessage = "No se encontraron registros";
    this.hasActions = false;
    this.trackKey = "_id";
  }
  trackByFn(item) {
    return item[this.trackKey] || item.id || JSON.stringify(item);
  }
  static {
    this.\u0275fac = function TableComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TableComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TableComponent, selectors: [["app-table"]], inputs: { columns: "columns", data: "data", loading: "loading", emptyMessage: "emptyMessage", hasActions: "hasActions", actionsTemplate: "actionsTemplate", trackKey: "trackKey" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 2, consts: [[1, "overflow-x-auto", "rounded-xl", "border", "border-gray-200", "bg-white", "shadow-sm"], [1, "min-w-full", "divide-y", "divide-gray-200", "text-left", "text-sm"], [1, "bg-gray-50/75"], ["scope", "col", 1, "px-5", "py-3.5", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-gray-500", 3, "text-center", "text-right", "text-left", "width"], ["scope", "col", 1, "px-5", "py-3.5", "text-right", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-gray-500"], [1, "divide-y", "divide-gray-100", "bg-white"], ["scope", "col", 1, "px-5", "py-3.5", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-gray-500"], [1, "px-5", "py-12", "text-center", "text-gray-500"], [1, "inline-flex", "items-center", "gap-2"], [1, "h-5", "w-5", "animate-spin", "rounded-full", "border-2", "border-vinted", "border-t-transparent"], [1, "text-sm", "font-medium", "text-gray-600"], [1, "mt-1", "text-xs", "text-gray-400"], [1, "hover:bg-gray-50/60", "transition-colors"], [1, "whitespace-nowrap", "px-5", "py-4", "text-sm", "text-gray-700", 3, "text-center", "text-right"], [1, "whitespace-nowrap", "px-5", "py-4", "text-right", "text-sm", "font-medium"], [1, "whitespace-nowrap", "px-5", "py-4", "text-sm", "text-gray-700"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function TableComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "table", 1)(2, "thead", 2)(3, "tr");
        \u0275\u0275repeaterCreate(4, TableComponent_For_5_Template, 2, 9, "th", 3, _forTrack0);
        \u0275\u0275template(6, TableComponent_Conditional_6_Template, 2, 0, "th", 4);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "tbody", 5);
        \u0275\u0275template(8, TableComponent_Conditional_8_Template, 6, 1, "tr")(9, TableComponent_Conditional_9_Template, 6, 2, "tr")(10, TableComponent_Conditional_10_Template, 2, 0);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275repeater(ctx.columns);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.hasActions ? 6 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.loading ? 8 : ctx.data.length === 0 ? 9 : 10);
      }
    }, dependencies: [CommonModule, NgTemplateOutlet], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TableComponent, { className: "TableComponent", filePath: "src\\app\\shared\\components\\table\\table.component.ts", lineNumber: 107 });
})();

// src/app/shared/components/badge/badge.component.ts
var _c02 = ["*"];
function BadgeComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.getDotColor());
  }
}
var BadgeComponent = class _BadgeComponent {
  constructor() {
    this.color = "gray";
    this.dot = false;
  }
  getColorClasses() {
    switch (this.color) {
      case "success":
      case "emerald":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "warning":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "danger":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      case "info":
      case "blue":
        return "bg-sky-50 text-sky-700 border border-sky-200";
      case "teal":
        return "bg-teal-50 text-teal-700 border border-teal-200";
      case "gray":
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  }
  getDotColor() {
    switch (this.color) {
      case "success":
      case "emerald":
        return "bg-emerald-500";
      case "warning":
        return "bg-amber-500";
      case "danger":
        return "bg-rose-500";
      case "info":
      case "blue":
        return "bg-sky-500";
      case "teal":
        return "bg-teal-500";
      case "gray":
      default:
        return "bg-gray-400";
    }
  }
  static {
    this.\u0275fac = function BadgeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BadgeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BadgeComponent, selectors: [["app-badge"]], inputs: { color: "color", dot: "dot" }, standalone: true, features: [\u0275\u0275StandaloneFeature], ngContentSelectors: _c02, decls: 3, vars: 3, consts: [[1, "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-semibold", "tracking-wide", "capitalize"], [1, "w-1.5", "h-1.5", "mr-1.5", "rounded-full", 3, "class"], [1, "w-1.5", "h-1.5", "mr-1.5", "rounded-full"]], template: function BadgeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "span", 0);
        \u0275\u0275template(1, BadgeComponent_Conditional_1_Template, 1, 2, "span", 1);
        \u0275\u0275projection(2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.getColorClasses());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.dot ? 1 : -1);
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BadgeComponent, { className: "BadgeComponent", filePath: "src\\app\\shared\\components\\badge\\badge.component.ts", lineNumber: 18 });
})();

export {
  NotificationService,
  TableComponent,
  BadgeComponent
};
//# sourceMappingURL=chunk-G3JWP25K.js.map
