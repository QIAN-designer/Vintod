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
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-VPYCVBQT.js";
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
  ɵɵclassMap,
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
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
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

// src/app/features/admin/products/admin-products.component.ts
var _c0 = ["titleTpl"];
var _c1 = ["priceTpl"];
var _c2 = ["badgeTpl"];
var _c3 = ["conditionTpl"];
var _forTrack0 = ($index, $item) => $item.id;
function AdminProductsComponent_ng_template_26_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 58);
  }
  if (rf & 2) {
    const prod_r2 = \u0275\u0275nextContext().row;
    \u0275\u0275property("src", prod_r2.image, \u0275\u0275sanitizeUrl)("alt", prod_r2.title);
  }
}
function AdminProductsComponent_ng_template_26_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1, "\u{1F455}");
    \u0275\u0275elementEnd();
  }
}
function AdminProductsComponent_ng_template_26_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prod_r2 = \u0275\u0275nextContext().row;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" /", prod_r2.slug, " ");
  }
}
function AdminProductsComponent_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 57);
    \u0275\u0275template(2, AdminProductsComponent_ng_template_26_Conditional_2_Template, 1, 2, "img", 58)(3, AdminProductsComponent_ng_template_26_Conditional_3_Template, 2, 0, "span", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 60);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 61);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, AdminProductsComponent_ng_template_26_Conditional_9_Template, 2, 1, "span", 62);
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
function AdminProductsComponent_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
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
function AdminProductsComponent_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-badge", 64);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prod_r4 = ctx.row;
    \u0275\u0275property("color", prod_r4.isActive !== false ? "emerald" : "gray")("dot", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", prod_r4.isActive !== false ? "Activo" : "Pausado", " ");
  }
}
function AdminProductsComponent_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prod_r5 = ctx.row;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", prod_r5.condition, " ");
  }
}
function AdminProductsComponent_ng_template_34_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 14);
    \u0275\u0275element(1, "path", 71);
    \u0275\u0275elementEnd();
  }
}
function AdminProductsComponent_ng_template_34_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 14);
    \u0275\u0275element(1, "path", 72)(2, "path", 73);
    \u0275\u0275elementEnd();
  }
}
function AdminProductsComponent_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66)(1, "button", 67);
    \u0275\u0275listener("click", function AdminProductsComponent_ng_template_34_Template_button_click_1_listener() {
      const prod_r7 = \u0275\u0275restoreView(_r6).row;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.toggleActive(prod_r7));
    });
    \u0275\u0275template(2, AdminProductsComponent_ng_template_34_Conditional_2_Template, 2, 0, ":svg:svg", 14)(3, AdminProductsComponent_ng_template_34_Conditional_3_Template, 3, 0, ":svg:svg", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 68);
    \u0275\u0275listener("click", function AdminProductsComponent_ng_template_34_Template_button_click_4_listener() {
      const prod_r7 = \u0275\u0275restoreView(_r6).row;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.openEditModal(prod_r7));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 14);
    \u0275\u0275element(6, "path", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "button", 70);
    \u0275\u0275listener("click", function AdminProductsComponent_ng_template_34_Template_button_click_7_listener() {
      const prod_r7 = \u0275\u0275restoreView(_r6).row;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.deleteProduct(prod_r7));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 14);
    \u0275\u0275element(9, "path", 12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const prod_r7 = ctx.row;
    \u0275\u0275advance();
    \u0275\u0275classMap(prod_r7.isActive !== false ? "border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100" : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100");
    \u0275\u0275property("title", prod_r7.isActive !== false ? "Desactivar prenda" : "Activar prenda");
    \u0275\u0275advance();
    \u0275\u0275conditional(prod_r7.isActive !== false ? 2 : 3);
  }
}
function AdminProductsComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1, "El t\xEDtulo debe tener entre 3 y 50 caracteres.");
    \u0275\u0275elementEnd();
  }
}
function AdminProductsComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1, "La descripci\xF3n debe tener al menos 10 caracteres.");
    \u0275\u0275elementEnd();
  }
}
function AdminProductsComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1, "Introduce un precio v\xE1lido mayor a 0.");
    \u0275\u0275elementEnd();
  }
}
function AdminProductsComponent_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r9 = ctx.$implicit;
    \u0275\u0275property("value", b_r9.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r9.name);
  }
}
function AdminProductsComponent_For_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r10 = ctx.$implicit;
    \u0275\u0275property("value", c_r10.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r10.name);
  }
}
var AdminProductsComponent = class _AdminProductsComponent {
  constructor() {
    this.store = inject(ProductsStore);
    this.adminStore = inject(AdminStore);
    this.notifications = inject(NotificationService);
    this.fb = inject(FormBuilder);
    this.isModalOpen = signal(false);
    this.editingProduct = signal(null);
    this.columns = [];
    this.productForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.minLength(10)]],
      price: ["", [Validators.required, Validators.min(0.01)]],
      brand: ["", [Validators.required]],
      size: ["", [Validators.required]],
      condition: ["", [Validators.required]],
      isActive: [true]
    });
  }
  ngOnInit() {
    this.store.loadProducts();
  }
  ngAfterViewInit() {
    this.initColumns();
  }
  initColumns() {
    this.columns = [
      { key: "title", label: "Art\xEDculo", cellTemplate: this.titleTpl },
      { key: "brand", label: "Marca" },
      { key: "size", label: "Talla", align: "center" },
      { key: "condition", label: "Estado", cellTemplate: this.conditionTpl },
      { key: "price", label: "Precio", align: "right", cellTemplate: this.priceTpl },
      { key: "isActive", label: "Visibilidad", align: "center", cellTemplate: this.badgeTpl }
    ];
  }
  toggleActive(prod) {
    const id = prod._id || prod.id;
    if (!id)
      return;
    this.store.toggleProductActive(id);
    const newStatus = !(prod.isActive !== false);
    this.notifications.info(newStatus ? "Prenda Activada" : "Prenda Desactivada", `Visibilidad de "${prod.title}" actualizada.`);
  }
  openCreateModal() {
    this.editingProduct.set(null);
    this.productForm.reset({
      title: "",
      description: "",
      price: "",
      brand: "",
      size: "",
      condition: "",
      isActive: true
    });
    this.isModalOpen.set(true);
  }
  openEditModal(prod) {
    this.editingProduct.set(prod);
    this.productForm.patchValue({
      title: prod.title,
      description: prod.description,
      price: prod.price,
      brand: prod.brand,
      size: prod.size,
      condition: prod.condition,
      isActive: prod.isActive !== false
    });
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
    this.editingProduct.set(null);
  }
  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const formVal = this.productForm.value;
    const current = this.editingProduct();
    if (current) {
      const id = current._id || current.id;
      this.store.updateProductData(id, formVal);
      this.notifications.success("Actualizado", `Prenda "${formVal.title}" actualizada con \xE9xito.`);
    } else {
      this.store.addProduct(formVal);
      this.notifications.success("Creado", `Prenda "${formVal.title}" a\xF1adida al cat\xE1logo.`);
    }
    this.closeModal();
  }
  deleteProduct(prod) {
    return __async(this, null, function* () {
      const id = prod._id || prod.id;
      if (!id)
        return;
      const confirmed = yield this.notifications.confirm("\xBFEliminar prenda?", `Esta acci\xF3n dar\xE1 de baja "${prod.title}" del cat\xE1logo.`);
      if (confirmed) {
        this.store.deleteProductData(id);
        this.notifications.success("Eliminado", "Prenda eliminada del cat\xE1logo.");
      }
    });
  }
  static {
    this.\u0275fac = function AdminProductsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminProductsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminProductsComponent, selectors: [["app-admin-products"]], viewQuery: function AdminProductsComponent_Query(rf, ctx) {
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
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.badgeTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.conditionTpl = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 114, vars: 17, consts: [["titleTpl", ""], ["priceTpl", ""], ["badgeTpl", ""], ["conditionTpl", ""], ["actionsTemplate", ""], [1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-slate-900"], [1, "text-sm", "text-slate-500", "mt-1"], [1, "flex", "items-center", "gap-3"], ["routerLink", "/admin/recycle-bin", "title", "Ver prendas eliminadas (deletedAt \u2260 null) para reactivarlas", 1, "inline-flex", "items-center", "gap-2", "px-3.5", "py-2.5", "text-sm", "font-semibold", "text-rose-700", "bg-rose-50", "hover:bg-rose-100", "border", "border-rose-200", "rounded-lg", "shadow-2xs", "transition-all"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-rose-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-4", "py-2.5", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "transition-all", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "bg-white", "p-4", "rounded-xl", "border", "border-slate-200", "shadow-xs", "flex", "flex-col", "sm:flex-row", "gap-4", "items-center", "justify-between"], [1, "w-full", "sm:w-96"], ["placeholder", "Buscar prenda por t\xEDtulo, descripci\xF3n o marca...", 3, "searchChange", "searchTerm"], [1, "text-xs", "text-slate-500"], [1, "font-bold", "text-slate-800"], ["emptyMessage", "No se encontraron prendas con los filtros aplicados", 3, "columns", "data", "loading", "hasActions", "actionsTemplate"], [3, "closed", "isOpen", "title", "showFooter"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-xs", "font-semibold", "text-slate-700", "uppercase"], ["type", "text", "formControlName", "title", "placeholder", "Ej: Sudadera vintage oversized", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], [1, "text-xs", "text-rose-600", "mt-1"], ["formControlName", "description", "rows", "3", "placeholder", "Detalla estado, medidas, tejido y cualquier detalle relevante...", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["type", "number", "step", "0.01", "formControlName", "price", "placeholder", "25.00", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["formControlName", "brand", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["value", ""], [3, "value"], ["formControlName", "size", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["value", "XXS"], ["value", "XS"], ["value", "S"], ["value", "M"], ["value", "L"], ["value", "XL"], ["value", "XXL"], ["value", "W30 L32"], ["value", "W32 L30"], ["value", "42"], ["value", "\xDAnica"], ["formControlName", "condition", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], [1, "pt-2"], [1, "flex", "items-center", "justify-between", "p-3", "rounded-lg", "border", "border-slate-200", "bg-slate-50/60"], [1, "flex", "flex-col"], [1, "text-xs", "font-semibold", "text-slate-800", "uppercase", "tracking-wide"], [1, "text-xs", "text-slate-500", "mt-0.5"], [1, "relative", "inline-flex", "items-center", "cursor-pointer"], ["type", "checkbox", "formControlName", "isActive", 1, "sr-only", "peer"], [1, "w-11", "h-6", "bg-slate-300", "peer-focus:outline-none", "peer-focus:ring-2", "peer-focus:ring-teal-500", "rounded-full", "peer", "peer-checked:after:translate-x-full", "peer-checked:after:border-white", "after:content-['']", "after:absolute", "after:top-[2px]", "after:left-[2px]", "after:bg-white", "after:border-slate-300", "after:border", "after:rounded-full", "after:h-5", "after:w-5", "after:transition-all", "peer-checked:bg-teal-600"], [1, "pt-4", "flex", "justify-end", "gap-3", "border-t", "border-slate-100"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-slate-700", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "transition-colors", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "disabled:opacity-50", "transition-all", 3, "disabled"], [1, "w-10", "h-10", "rounded-lg", "overflow-hidden", "bg-slate-100", "border", "border-slate-200", "shrink-0", "flex", "items-center", "justify-center"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "text-xs", "text-slate-400"], [1, "font-semibold", "text-slate-900"], [1, "text-xs", "text-slate-400", "truncate", "max-w-xs"], [1, "inline-block", "mt-0.5", "text-[10px]", "font-mono", "text-teal-600", "bg-teal-50", "px-1", "rounded"], [1, "font-bold", "text-slate-900"], [3, "color", "dot"], [1, "text-xs", "font-medium", "text-slate-600", "bg-slate-100", "px-2", "py-0.5", "rounded"], [1, "flex", "items-center", "justify-end", "gap-2"], ["type", "button", 1, "p-1.5", "rounded-lg", "border", "text-xs", "font-medium", "transition-colors", 3, "click", "title"], ["type", "button", "title", "Editar prenda", 1, "p-1.5", "rounded-lg", "border", "border-slate-200", "text-slate-600", "hover:text-teal-700", "hover:border-teal-300", "bg-white", "hover:bg-slate-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", "title", "Eliminar prenda", 1, "p-1.5", "rounded-lg", "border", "border-rose-200", "text-rose-600", "hover:bg-rose-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"]], template: function AdminProductsComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div")(3, "h1", 7);
        \u0275\u0275text(4, "Gesti\xF3n del Cat\xE1logo de Prendas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 8);
        \u0275\u0275text(6, " Administraci\xF3n completa de prendas en venta conectadas directamente al backend de Express y MongoDB. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 9)(8, "a", 10);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 11);
        \u0275\u0275element(10, "path", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(11, "span");
        \u0275\u0275text(12, "Papelera / Reactivar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "button", 13);
        \u0275\u0275listener("click", function AdminProductsComponent_Template_button_click_13_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.openCreateModal());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(14, "svg", 14);
        \u0275\u0275element(15, "path", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(16, "span");
        \u0275\u0275text(17, "Crear Prenda");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(18, "div", 16)(19, "div", 17)(20, "app-search-bar", 18);
        \u0275\u0275listener("searchChange", function AdminProductsComponent_Template_app_search_bar_searchChange_20_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.store.setSearchFilter($event));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 19);
        \u0275\u0275text(22, " Total prendas: ");
        \u0275\u0275elementStart(23, "span", 20);
        \u0275\u0275text(24);
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(25, "app-table", 21);
        \u0275\u0275template(26, AdminProductsComponent_ng_template_26_Template, 10, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(28, AdminProductsComponent_ng_template_28_Template, 3, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(30, AdminProductsComponent_ng_template_30_Template, 2, 3, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(32, AdminProductsComponent_ng_template_32_Template, 2, 1, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(34, AdminProductsComponent_ng_template_34_Template, 10, 4, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(36, "app-modal", 22);
        \u0275\u0275listener("closed", function AdminProductsComponent_Template_app_modal_closed_36_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275elementStart(37, "form", 23);
        \u0275\u0275listener("ngSubmit", function AdminProductsComponent_Template_form_ngSubmit_37_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.saveProduct());
        });
        \u0275\u0275elementStart(38, "div")(39, "label", 24);
        \u0275\u0275text(40, "T\xEDtulo de la prenda");
        \u0275\u0275elementEnd();
        \u0275\u0275element(41, "input", 25);
        \u0275\u0275template(42, AdminProductsComponent_Conditional_42_Template, 2, 0, "p", 26);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "div")(44, "label", 24);
        \u0275\u0275text(45, "Descripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275element(46, "textarea", 27);
        \u0275\u0275template(47, AdminProductsComponent_Conditional_47_Template, 2, 0, "p", 26);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "div", 28)(49, "div")(50, "label", 24);
        \u0275\u0275text(51, "Precio (\u20AC)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(52, "input", 29);
        \u0275\u0275template(53, AdminProductsComponent_Conditional_53_Template, 2, 0, "p", 26);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "div")(55, "label", 24);
        \u0275\u0275text(56, "Marca");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "select", 30)(58, "option", 31);
        \u0275\u0275text(59, "Selecciona marca");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(60, AdminProductsComponent_For_61_Template, 2, 2, "option", 32, _forTrack0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(62, "div", 28)(63, "div")(64, "label", 24);
        \u0275\u0275text(65, "Talla");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "select", 33)(67, "option", 31);
        \u0275\u0275text(68, "Selecciona talla");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "option", 34);
        \u0275\u0275text(70, "XXS");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "option", 35);
        \u0275\u0275text(72, "XS");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "option", 36);
        \u0275\u0275text(74, "S");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "option", 37);
        \u0275\u0275text(76, "M");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "option", 38);
        \u0275\u0275text(78, "L");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(79, "option", 39);
        \u0275\u0275text(80, "XL");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(81, "option", 40);
        \u0275\u0275text(82, "XXL");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "option", 41);
        \u0275\u0275text(84, "W30 L32");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "option", 42);
        \u0275\u0275text(86, "W32 L30");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(87, "option", 43);
        \u0275\u0275text(88, "42");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(89, "option", 44);
        \u0275\u0275text(90, "Talla \xDAnica");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(91, "div")(92, "label", 24);
        \u0275\u0275text(93, "Estado / Condici\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(94, "select", 45)(95, "option", 31);
        \u0275\u0275text(96, "Selecciona estado");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(97, AdminProductsComponent_For_98_Template, 2, 2, "option", 32, _forTrack0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(99, "div", 46)(100, "div", 47)(101, "div", 48)(102, "span", 49);
        \u0275\u0275text(103, "Visibilidad en el cat\xE1logo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(104, "span", 50);
        \u0275\u0275text(105);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(106, "label", 51);
        \u0275\u0275element(107, "input", 52)(108, "div", 53);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(109, "div", 54)(110, "button", 55);
        \u0275\u0275listener("click", function AdminProductsComponent_Template_button_click_110_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275text(111, " Cancelar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "button", 56);
        \u0275\u0275text(113);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_16_0;
        let tmp_17_0;
        let tmp_18_0;
        let tmp_21_0;
        const actionsTemplate_r11 = \u0275\u0275reference(35);
        \u0275\u0275advance(20);
        \u0275\u0275property("searchTerm", ctx.store.searchFilter());
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.store.products().length);
        \u0275\u0275advance();
        \u0275\u0275property("columns", ctx.columns)("data", ctx.store.filteredProducts())("loading", ctx.store.loading())("hasActions", true)("actionsTemplate", actionsTemplate_r11);
        \u0275\u0275advance(11);
        \u0275\u0275property("isOpen", ctx.isModalOpen())("title", ctx.editingProduct() ? "Editar Prenda" : "Nueva Prenda en Venta")("showFooter", false);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.productForm);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_16_0 = ctx.productForm.get("title")) == null ? null : tmp_16_0.invalid) && ((tmp_16_0 = ctx.productForm.get("title")) == null ? null : tmp_16_0.touched) ? 42 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_17_0 = ctx.productForm.get("description")) == null ? null : tmp_17_0.invalid) && ((tmp_17_0 = ctx.productForm.get("description")) == null ? null : tmp_17_0.touched) ? 47 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275conditional(((tmp_18_0 = ctx.productForm.get("price")) == null ? null : tmp_18_0.invalid) && ((tmp_18_0 = ctx.productForm.get("price")) == null ? null : tmp_18_0.touched) ? 53 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275repeater(ctx.adminStore.brands());
        \u0275\u0275advance(37);
        \u0275\u0275repeater(ctx.adminStore.conditions());
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate1(" ", ((tmp_21_0 = ctx.productForm.get("isActive")) == null ? null : tmp_21_0.value) ? "La prenda est\xE1 activa y visible para los compradores" : "La prenda est\xE1 pausada / oculta", " ");
        \u0275\u0275advance(7);
        \u0275\u0275property("disabled", ctx.productForm.invalid);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.editingProduct() ? "Guardar Cambios" : "Crear Prenda", " ");
      }
    }, dependencies: [
      RouterLink,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      NgSelectOption,
      \u0275NgSelectMultipleOption,
      DefaultValueAccessor,
      NumberValueAccessor,
      CheckboxControlValueAccessor,
      SelectControlValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      FormGroupDirective,
      FormControlName,
      TableComponent,
      BadgeComponent,
      SearchBarComponent,
      ModalComponent,
      AppCurrencyPipe
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminProductsComponent, { className: "AdminProductsComponent", filePath: "src\\app\\features\\admin\\products\\admin-products.component.ts", lineNumber: 312 });
})();
export {
  AdminProductsComponent
};
//# sourceMappingURL=chunk-LFQTONNE.js.map
