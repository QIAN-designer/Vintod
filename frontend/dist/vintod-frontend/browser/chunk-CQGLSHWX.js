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
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-VPYCVBQT.js";
import "./chunk-CFLKTGFK.js";
import "./chunk-HA5NQ34U.js";
import {
  __async,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
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

// src/app/features/admin/brands/admin-brands.component.ts
var _c0 = ["brandTpl"];
var _c1 = ["statusTpl"];
function AdminBrandsComponent_ng_template_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
  if (rf & 2) {
    const b_r2 = \u0275\u0275nextContext().row;
    \u0275\u0275property("src", b_r2.logo, \u0275\u0275sanitizeUrl)("alt", b_r2.name);
  }
}
function AdminBrandsComponent_ng_template_20_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
  if (rf & 2) {
    const b_r2 = \u0275\u0275nextContext().row;
    \u0275\u0275property("src", b_r2.logoUrl, \u0275\u0275sanitizeUrl)("alt", b_r2.name);
  }
}
function AdminBrandsComponent_ng_template_20_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const b_r2 = \u0275\u0275nextContext().row;
    \u0275\u0275textInterpolate1(" ", b_r2.logo || "\u{1F3F7}\uFE0F", " ");
  }
}
function AdminBrandsComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29);
    \u0275\u0275template(2, AdminBrandsComponent_ng_template_20_Conditional_2_Template, 1, 2, "img", 30)(3, AdminBrandsComponent_ng_template_20_Conditional_3_Template, 1, 2, "img", 30)(4, AdminBrandsComponent_ng_template_20_Conditional_4_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "div", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 32);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const b_r2 = ctx.row;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(b_r2.logo && (b_r2.logo.startsWith("http://") || b_r2.logo.startsWith("https://")) ? 2 : b_r2.logoUrl ? 3 : 4);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(b_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("slug: ", b_r2.slug, "");
  }
}
function AdminBrandsComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-badge", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r3 = ctx.row;
    \u0275\u0275property("color", b_r3.isActive ? "emerald" : "gray")("dot", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", b_r3.isActive ? "Activa" : "Desactivada", " ");
  }
}
function AdminBrandsComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "button", 35);
    \u0275\u0275listener("click", function AdminBrandsComponent_ng_template_24_Template_button_click_1_listener() {
      const b_r5 = \u0275\u0275restoreView(_r4).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.toggleActive(b_r5));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 36);
    \u0275\u0275listener("click", function AdminBrandsComponent_ng_template_24_Template_button_click_3_listener() {
      const b_r5 = \u0275\u0275restoreView(_r4).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.openEditModal(b_r5));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 8);
    \u0275\u0275element(5, "path", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "button", 38);
    \u0275\u0275listener("click", function AdminBrandsComponent_ng_template_24_Template_button_click_6_listener() {
      const b_r5 = \u0275\u0275restoreView(_r4).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.deleteBrand(b_r5));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 8);
    \u0275\u0275element(8, "path", 39);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const b_r5 = ctx.row;
    \u0275\u0275advance();
    \u0275\u0275classMap(b_r5.isActive ? "border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100" : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100");
    \u0275\u0275property("title", b_r5.isActive ? "Desactivar marca" : "Activar marca");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", b_r5.isActive ? "Desactivar" : "Activar", " ");
  }
}
var AdminBrandsComponent = class _AdminBrandsComponent {
  constructor() {
    this.adminStore = inject(AdminStore);
    this.notifications = inject(NotificationService);
    this.fb = inject(FormBuilder);
    this.searchQuery = signal("");
    this.isModalOpen = signal(false);
    this.editingBrand = signal(null);
    this.columns = [];
    this.brandForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      logo: ["\u{1F3F7}\uFE0F"],
      description: [""],
      featured: [false]
    });
  }
  ngAfterViewInit() {
    this.columns = [
      { key: "name", label: "Marca", cellTemplate: this.brandTpl },
      { key: "description", label: "Descripci\xF3n" },
      { key: "itemCount", label: "Art\xEDculos", align: "center" },
      { key: "isActive", label: "Visibilidad", align: "center", cellTemplate: this.statusTpl },
      { key: "createdAt", label: "Alta" }
    ];
  }
  filteredBrands() {
    const list = this.adminStore.brands();
    const q = this.searchQuery().toLowerCase().trim();
    if (!q)
      return list;
    return list.filter((b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q));
  }
  toggleActive(b) {
    this.adminStore.toggleBrandActive(b.id);
    this.notifications.info("Estado actualizado", `Visibilidad de ${b.name} modificada.`);
  }
  openCreateModal() {
    this.editingBrand.set(null);
    this.brandForm.reset({ name: "", logo: "\u{1F3F7}\uFE0F", description: "", featured: false });
    this.isModalOpen.set(true);
  }
  openEditModal(b) {
    this.editingBrand.set(b);
    this.brandForm.patchValue({
      name: b.name,
      logo: b.logo || "\u{1F3F7}\uFE0F",
      description: b.description || "",
      featured: b.featured ?? false
    });
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
    this.editingBrand.set(null);
  }
  saveBrand() {
    if (this.brandForm.invalid)
      return;
    const val = this.brandForm.value;
    const current = this.editingBrand();
    if (current) {
      this.adminStore.saveBrand(__spreadProps(__spreadValues({}, val), { id: current.id }));
      this.notifications.success("Marca actualizada", `Marca ${val.name} actualizada.`);
    } else {
      this.adminStore.saveBrand(val);
      this.notifications.success("Marca creada", `Marca ${val.name} a\xF1adida al cat\xE1logo.`);
    }
    this.closeModal();
  }
  deleteBrand(b) {
    return __async(this, null, function* () {
      const ok = yield this.notifications.confirm("\xBFEliminar marca?", `Se eliminar\xE1 la marca ${b.name}.`);
      if (ok) {
        this.adminStore.deleteBrand(b.id);
        this.notifications.success("Marca eliminada", "La marca ha sido eliminada.");
      }
    });
  }
  static {
    this.\u0275fac = function AdminBrandsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminBrandsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminBrandsComponent, selectors: [["app-admin-brands"]], viewQuery: function AdminBrandsComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.brandTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.statusTpl = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 49, vars: 12, consts: [["brandTpl", ""], ["statusTpl", ""], ["actionsTemplate", ""], [1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-slate-900"], [1, "text-sm", "text-slate-500", "mt-1"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-4", "py-2.5", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "transition-all", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "bg-white", "p-4", "rounded-xl", "border", "border-slate-200", "shadow-xs", "flex", "flex-col", "sm:flex-row", "gap-4", "items-center", "justify-between"], [1, "w-full", "sm:w-96"], ["placeholder", "Buscar marca por nombre o descripci\xF3n...", 3, "searchChange", "searchTerm"], [1, "text-xs", "text-slate-500"], [1, "font-bold", "text-slate-800"], ["emptyMessage", "No se encontraron marcas", 3, "columns", "data", "hasActions", "actionsTemplate"], [3, "closed", "isOpen", "title", "showFooter"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-xs", "font-semibold", "text-slate-700", "uppercase"], ["type", "text", "formControlName", "name", "placeholder", "Ej: Ralph Lauren", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["type", "text", "formControlName", "logo", "placeholder", "Ej: \u{1F455} o \u{1F3C7}", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["formControlName", "description", "rows", "3", "placeholder", "Breve rese\xF1a sobre la marca o estilo...", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], [1, "flex", "items-center", "gap-2"], ["type", "checkbox", "id", "featured", "formControlName", "featured", 1, "h-4", "w-4", "rounded", "border-slate-300", "text-teal-600", "focus:ring-teal-500"], ["for", "featured", 1, "text-sm", "text-slate-700"], [1, "pt-4", "flex", "justify-end", "gap-3", "border-t", "border-slate-100"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-slate-700", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "transition-colors", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "disabled:opacity-50", "transition-all", 3, "disabled"], [1, "flex", "items-center", "gap-3"], [1, "w-8", "h-8", "rounded-lg", "bg-slate-100", "flex", "items-center", "justify-center", "text-lg", "overflow-hidden", "border", "border-slate-200"], [1, "w-full", "h-full", "object-contain", "p-1", 3, "src", "alt"], [1, "font-semibold", "text-slate-900"], [1, "text-xs", "text-slate-400", "font-mono"], [3, "color", "dot"], [1, "flex", "items-center", "justify-end", "gap-2"], ["type", "button", 1, "p-1.5", "rounded-lg", "border", "text-xs", "font-medium", "transition-colors", 3, "click", "title"], ["type", "button", "title", "Editar marca", 1, "p-1.5", "rounded-lg", "border", "border-slate-200", "text-slate-600", "hover:text-teal-700", "hover:border-teal-300", "bg-white", "hover:bg-slate-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", "title", "Eliminar marca", 1, "p-1.5", "rounded-lg", "border", "border-rose-200", "text-rose-600", "hover:bg-rose-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"]], template: function AdminBrandsComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div")(3, "h1", 5);
        \u0275\u0275text(4, "Gesti\xF3n de Marcas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 6);
        \u0275\u0275text(6, " Administra las marcas de moda disponibles para categorizar los art\xEDculos del cat\xE1logo. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 7);
        \u0275\u0275listener("click", function AdminBrandsComponent_Template_button_click_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.openCreateModal());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 8);
        \u0275\u0275element(9, "path", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "Nueva Marca");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 10)(13, "div", 11)(14, "app-search-bar", 12);
        \u0275\u0275listener("searchChange", function AdminBrandsComponent_Template_app_search_bar_searchChange_14_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.searchQuery.set($event));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 13);
        \u0275\u0275text(16, " Total marcas: ");
        \u0275\u0275elementStart(17, "span", 14);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(19, "app-table", 15);
        \u0275\u0275template(20, AdminBrandsComponent_ng_template_20_Template, 10, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(22, AdminBrandsComponent_ng_template_22_Template, 2, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(24, AdminBrandsComponent_ng_template_24_Template, 9, 4, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(26, "app-modal", 16);
        \u0275\u0275listener("closed", function AdminBrandsComponent_Template_app_modal_closed_26_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275elementStart(27, "form", 17);
        \u0275\u0275listener("ngSubmit", function AdminBrandsComponent_Template_form_ngSubmit_27_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.saveBrand());
        });
        \u0275\u0275elementStart(28, "div")(29, "label", 18);
        \u0275\u0275text(30, "Nombre de la marca");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div")(33, "label", 18);
        \u0275\u0275text(34, "Icono / Emoji o Logo");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "div")(37, "label", 18);
        \u0275\u0275text(38, "Descripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275element(39, "textarea", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div", 22);
        \u0275\u0275element(41, "input", 23);
        \u0275\u0275elementStart(42, "label", 24);
        \u0275\u0275text(43, "Marca destacada en portada");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 25)(45, "button", 26);
        \u0275\u0275listener("click", function AdminBrandsComponent_Template_button_click_45_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275text(46, " Cancelar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "button", 27);
        \u0275\u0275text(48);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        const actionsTemplate_r7 = \u0275\u0275reference(25);
        \u0275\u0275advance(14);
        \u0275\u0275property("searchTerm", ctx.searchQuery());
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.adminStore.brands().length);
        \u0275\u0275advance();
        \u0275\u0275property("columns", ctx.columns)("data", ctx.filteredBrands())("hasActions", true)("actionsTemplate", actionsTemplate_r7);
        \u0275\u0275advance(7);
        \u0275\u0275property("isOpen", ctx.isModalOpen())("title", ctx.editingBrand() ? "Editar Marca" : "Nueva Marca de Moda")("showFooter", false);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.brandForm);
        \u0275\u0275advance(20);
        \u0275\u0275property("disabled", ctx.brandForm.invalid);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.editingBrand() ? "Guardar Cambios" : "Crear Marca", " ");
      }
    }, dependencies: [
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      CheckboxControlValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      FormGroupDirective,
      FormControlName,
      TableComponent,
      BadgeComponent,
      SearchBarComponent,
      ModalComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminBrandsComponent, { className: "AdminBrandsComponent", filePath: "src\\app\\features\\admin\\brands\\admin-brands.component.ts", lineNumber: 194 });
})();
export {
  AdminBrandsComponent
};
//# sourceMappingURL=chunk-CQGLSHWX.js.map
