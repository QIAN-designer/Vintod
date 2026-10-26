import {
  AppCurrencyPipe
} from "./chunk-H2KVJB6A.js";
import "./chunk-TB7V4D46.js";
import {
  SearchBarComponent
} from "./chunk-PXXD4P2T.js";
import {
  AdminStore,
  ModalComponent
} from "./chunk-I6S2LKBX.js";
import {
  BadgeComponent,
  NotificationService,
  TableComponent
} from "./chunk-G3JWP25K.js";
import "./chunk-VPYCVBQT.js";
import "./chunk-CFLKTGFK.js";
import "./chunk-HA5NQ34U.js";
import {
  __spreadProps,
  __spreadValues,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FGNI3DP5.js";

// src/app/features/admin/orders/admin-orders.component.ts
var _c0 = ["orderNumTpl"];
var _c1 = ["partiesTpl"];
var _c2 = ["amountTpl"];
var _c3 = ["statusTpl"];
var _c4 = ["auditTpl"];
var _forTrack0 = ($index, $item) => $item.productId;
function AdminOrdersComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r2 = ctx.row;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r2.orderNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r2.paymentMethod);
  }
}
function AdminOrdersComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "span", 33);
    \u0275\u0275text(3, "Comprador:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 34)(6, "span", 33);
    \u0275\u0275text(7, "Vendedor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r3 = ctx.row;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", o_r3.buyerName, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", o_r3.sellerName, "");
  }
}
function AdminOrdersComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 35);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "appCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 36);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "appCurrency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r4 = ctx.row;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, o_r4.totalAmount));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("incl. env\xEDo ", \u0275\u0275pipeBind1(6, 4, o_r4.shippingFee), "");
  }
}
function AdminOrdersComponent_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-badge", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r5 = ctx.row;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275property("color", ctx_r5.getStatusColor(o_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", o_r5.status, " ");
  }
}
function AdminOrdersComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-badge", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r7 = ctx.row;
    \u0275\u0275property("color", o_r7.isActive ? "emerald" : "warning")("dot", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", o_r7.isActive ? "Aprobada" : "En Auditor\xEDa", " ");
  }
}
function AdminOrdersComponent_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "button", 40);
    \u0275\u0275listener("click", function AdminOrdersComponent_ng_template_35_Template_button_click_1_listener() {
      const o_r9 = \u0275\u0275restoreView(_r8).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.toggleAudit(o_r9));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 41);
    \u0275\u0275listener("click", function AdminOrdersComponent_ng_template_35_Template_button_click_3_listener() {
      const o_r9 = \u0275\u0275restoreView(_r8).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.openDetail(o_r9));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 42);
    \u0275\u0275element(5, "path", 43)(6, "path", 44);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const o_r9 = ctx.row;
    \u0275\u0275advance();
    \u0275\u0275classMap(o_r9.isActive ? "border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100" : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100");
    \u0275\u0275property("title", o_r9.isActive ? "Poner en retenci\xF3n / auditar" : "Liberar transacci\xF3n");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", o_r9.isActive ? "Retener" : "Aprobar", " ");
  }
}
function AdminOrdersComponent_Conditional_38_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div")(2, "span", 57);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 58);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 35);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "appCurrency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r10.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", item_r10.brand, ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 3, item_r10.price));
  }
}
function AdminOrdersComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 45)(2, "div")(3, "span", 46);
    \u0275\u0275text(4, "Referencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 47);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "app-badge", 37);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 48)(10, "div", 49)(11, "span", 50);
    \u0275\u0275text(12, "Comprador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 51);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 52);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 49)(18, "span", 50);
    \u0275\u0275text(19, "Vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 51);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 52);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div")(25, "span", 53);
    \u0275\u0275text(26, "Prendas incluidas:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 54);
    \u0275\u0275repeaterCreate(28, AdminOrdersComponent_Conditional_38_For_29_Template, 9, 5, "div", 55, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 56)(31, "span");
    \u0275\u0275text(32, "Importe total procesado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span");
    \u0275\u0275text(34);
    \u0275\u0275pipe(35, "appCurrency");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r5.selectedOrder().orderNumber);
    \u0275\u0275advance();
    \u0275\u0275property("color", ctx_r5.getStatusColor(ctx_r5.selectedOrder().status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r5.selectedOrder().status, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r5.selectedOrder().buyerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r5.selectedOrder().buyerEmail);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r5.selectedOrder().sellerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("ID: ", ctx_r5.selectedOrder().sellerId, "");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r5.selectedOrder().items);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(35, 8, ctx_r5.selectedOrder().totalAmount));
  }
}
var AdminOrdersComponent = class _AdminOrdersComponent {
  constructor() {
    this.adminStore = inject(AdminStore);
    this.notifications = inject(NotificationService);
    this.searchQuery = signal("");
    this.statusFilter = signal("all");
    this.isModalOpen = signal(false);
    this.selectedOrder = signal(null);
    this.columns = [];
  }
  ngAfterViewInit() {
    this.columns = [
      { key: "orderNumber", label: "Pedido", cellTemplate: this.orderNumTpl },
      { key: "buyerName", label: "Partes (Comprador / Vendedor)", cellTemplate: this.partiesTpl },
      { key: "totalAmount", label: "Total", cellTemplate: this.amountTpl },
      { key: "status", label: "Estado Pedido", align: "center", cellTemplate: this.statusTpl },
      { key: "isActive", label: "Auditor\xEDa", align: "center", cellTemplate: this.auditTpl },
      { key: "createdAt", label: "Fecha" }
    ];
  }
  filteredOrders() {
    const list = this.adminStore.orders();
    const q = this.searchQuery().toLowerCase().trim();
    const sf = this.statusFilter();
    return list.filter((o) => {
      const matchQ = !q || o.orderNumber.toLowerCase().includes(q) || o.buyerName.toLowerCase().includes(q) || o.sellerName.toLowerCase().includes(q);
      const matchS = sf === "all" || o.status === sf;
      return matchQ && matchS;
    });
  }
  onStatusChange(e) {
    this.statusFilter.set(e.target.value);
  }
  getStatusColor(status) {
    switch (status) {
      case "delivered":
        return "emerald";
      case "shipped":
        return "blue";
      case "paid":
        return "teal";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "gray";
    }
  }
  toggleAudit(o) {
    this.adminStore.toggleOrderActive(o.id);
    this.notifications.info("Auditor\xEDa", `Estado de moderaci\xF3n de ${o.orderNumber} actualizado.`);
  }
  openDetail(o) {
    this.selectedOrder.set(o);
    this.isModalOpen.set(true);
  }
  changeStatus(newStatus) {
    const current = this.selectedOrder();
    if (!current)
      return;
    this.adminStore.updateOrderStatus(current.id, newStatus);
    this.selectedOrder.set(__spreadProps(__spreadValues({}, current), { status: newStatus }));
    this.notifications.success("Estado actualizado", `Pedido ${current.orderNumber} pas\xF3 a ${newStatus}.`);
  }
  static {
    this.\u0275fac = function AdminOrdersComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminOrdersComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminOrdersComponent, selectors: [["app-admin-orders"]], viewQuery: function AdminOrdersComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
        \u0275\u0275viewQuery(_c2, 5);
        \u0275\u0275viewQuery(_c3, 5);
        \u0275\u0275viewQuery(_c4, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.orderNumTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.partiesTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.amountTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.statusTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.auditTpl = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 57, vars: 10, consts: [["orderNumTpl", ""], ["partiesTpl", ""], ["amountTpl", ""], ["statusTpl", ""], ["auditTpl", ""], ["actionsTemplate", ""], ["statusSelect", ""], [1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-slate-900"], [1, "text-sm", "text-slate-500", "mt-1"], [1, "bg-white", "p-4", "rounded-xl", "border", "border-slate-200", "shadow-xs", "flex", "flex-col", "sm:flex-row", "gap-4", "items-center", "justify-between"], [1, "w-full", "sm:w-96"], ["placeholder", "Buscar por n\xBA de pedido, comprador o vendedor...", 3, "searchChange", "searchTerm"], [1, "flex", "items-center", "gap-2"], [1, "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-teal-500", 3, "change", "value"], ["value", "all"], ["value", "pending"], ["value", "paid"], ["value", "shipped"], ["value", "delivered"], ["value", "cancelled"], ["emptyMessage", "No se encontraron transacciones", 3, "columns", "data", "hasActions", "actionsTemplate"], ["title", "Auditor\xEDa de Pedido", 3, "closed", "isOpen", "showFooter"], [1, "space-y-4"], ["footer", "", 1, "flex", "justify-between", "w-full"], [1, "text-xs", "text-slate-500"], [1, "text-xs", "py-1", "px-2", "border", "border-slate-300", "rounded", 3, "change", "value"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-slate-700", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", 3, "click"], [1, "font-mono", "font-bold", "text-teal-700"], [1, "text-[11px]", "text-slate-400"], [1, "text-xs"], [1, "text-slate-900"], [1, "text-slate-400"], [1, "text-slate-600"], [1, "font-bold", "text-slate-900"], [1, "text-[10px]", "text-slate-400"], [3, "color"], [3, "color", "dot"], [1, "flex", "items-center", "justify-end", "gap-2"], ["type", "button", 1, "p-1.5", "rounded-lg", "border", "text-xs", "font-medium", "transition-colors", 3, "click", "title"], ["type", "button", "title", "Ver detalle del pedido", 1, "p-1.5", "rounded-lg", "border", "border-slate-200", "text-slate-600", "hover:text-teal-700", "hover:border-teal-300", "bg-white", "hover:bg-slate-50", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], [1, "flex", "items-center", "justify-between", "pb-3", "border-b", "border-slate-100"], [1, "text-xs", "uppercase", "font-semibold", "text-slate-400"], [1, "font-mono", "font-bold", "text-base", "text-slate-900"], [1, "grid", "grid-cols-2", "gap-4", "text-xs"], [1, "p-3", "bg-slate-50", "rounded-lg"], [1, "text-slate-400", "uppercase", "font-semibold"], [1, "font-bold", "text-slate-900", "mt-1"], [1, "text-slate-500"], [1, "text-xs", "font-semibold", "text-slate-700", "uppercase"], [1, "mt-2", "space-y-2"], [1, "flex", "items-center", "justify-between", "p-2", "rounded-lg", "border", "border-slate-100", "text-sm"], [1, "flex", "justify-between", "items-center", "pt-3", "border-t", "border-slate-100", "text-sm", "font-bold", "text-slate-900"], [1, "font-semibold", "text-slate-900"], [1, "text-xs", "text-slate-400", "ml-2"]], template: function AdminOrdersComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "div")(3, "h1", 9);
        \u0275\u0275text(4, "Pedidos & Transacciones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 10);
        \u0275\u0275text(6, " Supervisi\xF3n, auditor\xEDa y moderaci\xF3n de transacciones entre particulares de la plataforma. ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 11)(8, "div", 12)(9, "app-search-bar", 13);
        \u0275\u0275listener("searchChange", function AdminOrdersComponent_Template_app_search_bar_searchChange_9_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.searchQuery.set($event));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 14)(11, "select", 15);
        \u0275\u0275listener("change", function AdminOrdersComponent_Template_select_change_11_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onStatusChange($event));
        });
        \u0275\u0275elementStart(12, "option", 16);
        \u0275\u0275text(13, "Todos los estados");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "option", 17);
        \u0275\u0275text(15, "Pendiente de pago");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "option", 18);
        \u0275\u0275text(17, "Pagado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "option", 19);
        \u0275\u0275text(19, "En env\xEDo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "option", 20);
        \u0275\u0275text(21, "Entregado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "option", 21);
        \u0275\u0275text(23, "Cancelado");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275element(24, "app-table", 22);
        \u0275\u0275template(25, AdminOrdersComponent_ng_template_25_Template, 5, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(27, AdminOrdersComponent_ng_template_27_Template, 9, 2, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(29, AdminOrdersComponent_ng_template_29_Template, 7, 6, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(31, AdminOrdersComponent_ng_template_31_Template, 2, 2, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(33, AdminOrdersComponent_ng_template_33_Template, 2, 3, "ng-template", null, 4, \u0275\u0275templateRefExtractor)(35, AdminOrdersComponent_ng_template_35_Template, 7, 4, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(37, "app-modal", 23);
        \u0275\u0275listener("closed", function AdminOrdersComponent_Template_app_modal_closed_37_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.isModalOpen.set(false));
        });
        \u0275\u0275template(38, AdminOrdersComponent_Conditional_38_Template, 36, 10, "div", 24);
        \u0275\u0275elementStart(39, "div", 25)(40, "div", 14)(41, "span", 26);
        \u0275\u0275text(42, "Cambiar estado:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "select", 27, 6);
        \u0275\u0275listener("change", function AdminOrdersComponent_Template_select_change_43_listener() {
          \u0275\u0275restoreView(_r1);
          const statusSelect_r11 = \u0275\u0275reference(44);
          return \u0275\u0275resetView(ctx.changeStatus(statusSelect_r11.value));
        });
        \u0275\u0275elementStart(45, "option", 17);
        \u0275\u0275text(46, "pending");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "option", 18);
        \u0275\u0275text(48, "paid");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "option", 19);
        \u0275\u0275text(50, "shipped");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "option", 20);
        \u0275\u0275text(52, "delivered");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "option", 21);
        \u0275\u0275text(54, "cancelled");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(55, "button", 28);
        \u0275\u0275listener("click", function AdminOrdersComponent_Template_button_click_55_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.isModalOpen.set(false));
        });
        \u0275\u0275text(56, " Cerrar ");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_16_0;
        const actionsTemplate_r12 = \u0275\u0275reference(36);
        \u0275\u0275advance(9);
        \u0275\u0275property("searchTerm", ctx.searchQuery());
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.statusFilter());
        \u0275\u0275advance(13);
        \u0275\u0275property("columns", ctx.columns)("data", ctx.filteredOrders())("hasActions", true)("actionsTemplate", actionsTemplate_r12);
        \u0275\u0275advance(13);
        \u0275\u0275property("isOpen", ctx.isModalOpen())("showFooter", true);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.selectedOrder() ? 38 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275property("value", (tmp_16_0 = ctx.selectedOrder()) == null ? null : tmp_16_0.status);
      }
    }, dependencies: [
      TableComponent,
      BadgeComponent,
      SearchBarComponent,
      ModalComponent,
      AppCurrencyPipe
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminOrdersComponent, { className: "AdminOrdersComponent", filePath: "src\\app\\features\\admin\\orders\\admin-orders.component.ts", lineNumber: 213 });
})();
export {
  AdminOrdersComponent
};
//# sourceMappingURL=chunk-URY37ZKB.js.map
