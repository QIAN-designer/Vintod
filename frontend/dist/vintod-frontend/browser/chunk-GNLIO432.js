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
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FGNI3DP5.js";

// src/app/features/admin/categories/admin-categories.component.ts
var _c0 = ["catTpl"];
var _c1 = ["statusTpl"];
function AdminCategoriesComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "div", 26);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 27);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r2 = ctx.row;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", c_r2.icon || "\u{1F6CD}\uFE0F", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("slug: ", c_r2.slug, "");
  }
}
function AdminCategoriesComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-badge", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r3 = ctx.row;
    \u0275\u0275property("color", c_r3.isActive ? "emerald" : "gray")("dot", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r3.isActive ? "Visible" : "Oculta", " ");
  }
}
function AdminCategoriesComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "button", 30);
    \u0275\u0275listener("click", function AdminCategoriesComponent_ng_template_24_Template_button_click_1_listener() {
      const c_r5 = \u0275\u0275restoreView(_r4).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.toggleActive(c_r5));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 31);
    \u0275\u0275listener("click", function AdminCategoriesComponent_ng_template_24_Template_button_click_3_listener() {
      const c_r5 = \u0275\u0275restoreView(_r4).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.openEditModal(c_r5));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 8);
    \u0275\u0275element(5, "path", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "button", 33);
    \u0275\u0275listener("click", function AdminCategoriesComponent_ng_template_24_Template_button_click_6_listener() {
      const c_r5 = \u0275\u0275restoreView(_r4).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.deleteCategory(c_r5));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 8);
    \u0275\u0275element(8, "path", 34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r5 = ctx.row;
    \u0275\u0275advance();
    \u0275\u0275classMap(c_r5.isActive ? "border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100" : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100");
    \u0275\u0275property("title", c_r5.isActive ? "Ocultar categor\xEDa" : "Mostrar categor\xEDa");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r5.isActive ? "Ocultar" : "Activar", " ");
  }
}
var AdminCategoriesComponent = class _AdminCategoriesComponent {
  constructor() {
    this.adminStore = inject(AdminStore);
    this.notifications = inject(NotificationService);
    this.fb = inject(FormBuilder);
    this.searchQuery = signal("");
    this.isModalOpen = signal(false);
    this.editingCategory = signal(null);
    this.columns = [];
    this.categoryForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      icon: ["\u{1F6CD}\uFE0F"]
    });
  }
  ngAfterViewInit() {
    this.columns = [
      { key: "name", label: "Categor\xEDa", cellTemplate: this.catTpl },
      { key: "itemCount", label: "Prendas asociadas", align: "center" },
      { key: "isActive", label: "Visibilidad", align: "center", cellTemplate: this.statusTpl },
      { key: "createdAt", label: "Fecha" }
    ];
  }
  filteredCategories() {
    const list = this.adminStore.categories();
    const q = this.searchQuery().toLowerCase().trim();
    if (!q)
      return list;
    return list.filter((c) => c.name.toLowerCase().includes(q));
  }
  toggleActive(c) {
    this.adminStore.toggleCategoryActive(c.id);
    this.notifications.info("Estado actualizado", `Visibilidad de categor\xEDa ${c.name} modificada.`);
  }
  openCreateModal() {
    this.editingCategory.set(null);
    this.categoryForm.reset({ name: "", icon: "\u{1F6CD}\uFE0F" });
    this.isModalOpen.set(true);
  }
  openEditModal(c) {
    this.editingCategory.set(c);
    this.categoryForm.patchValue({
      name: c.name,
      icon: c.icon || "\u{1F6CD}\uFE0F"
    });
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
    this.editingCategory.set(null);
  }
  saveCategory() {
    if (this.categoryForm.invalid)
      return;
    const val = this.categoryForm.value;
    const current = this.editingCategory();
    if (current) {
      this.adminStore.saveCategory(__spreadProps(__spreadValues({}, val), { id: current.id }));
      this.notifications.success("Categor\xEDa actualizada", `Categor\xEDa ${val.name} guardada.`);
    } else {
      this.adminStore.saveCategory(val);
      this.notifications.success("Categor\xEDa creada", `Categor\xEDa ${val.name} creada con \xE9xito.`);
    }
    this.closeModal();
  }
  deleteCategory(c) {
    return __async(this, null, function* () {
      const ok = yield this.notifications.confirm("\xBFEliminar categor\xEDa?", `Se eliminar\xE1 la categor\xEDa ${c.name}.`);
      if (ok) {
        this.adminStore.deleteCategory(c.id);
        this.notifications.success("Categor\xEDa eliminada", "La categor\xEDa ha sido eliminada.");
      }
    });
  }
  static {
    this.\u0275fac = function AdminCategoriesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminCategoriesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminCategoriesComponent, selectors: [["app-admin-categories"]], viewQuery: function AdminCategoriesComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.catTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.statusTpl = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 41, vars: 12, consts: [["catTpl", ""], ["statusTpl", ""], ["actionsTemplate", ""], [1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-slate-900"], [1, "text-sm", "text-slate-500", "mt-1"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-4", "py-2.5", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "transition-all", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "bg-white", "p-4", "rounded-xl", "border", "border-slate-200", "shadow-xs", "flex", "flex-col", "sm:flex-row", "gap-4", "items-center", "justify-between"], [1, "w-full", "sm:w-96"], ["placeholder", "Buscar categor\xEDa...", 3, "searchChange", "searchTerm"], [1, "text-xs", "text-slate-500"], [1, "font-bold", "text-slate-800"], ["emptyMessage", "No se encontraron categor\xEDas", 3, "columns", "data", "hasActions", "actionsTemplate"], [3, "closed", "isOpen", "title", "showFooter"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-xs", "font-semibold", "text-slate-700", "uppercase"], ["type", "text", "formControlName", "name", "placeholder", "Ej: Accesorios y Joyer\xEDa", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["type", "text", "formControlName", "icon", "placeholder", "Ej: \u{1F48D} o \u{1F45C}", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], [1, "pt-4", "flex", "justify-end", "gap-3", "border-t", "border-slate-100"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-slate-700", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "transition-colors", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "disabled:opacity-50", "transition-all", 3, "disabled"], [1, "flex", "items-center", "gap-3"], [1, "w-8", "h-8", "rounded-lg", "bg-teal-50", "text-teal-800", "flex", "items-center", "justify-center", "text-lg"], [1, "font-semibold", "text-slate-900"], [1, "text-xs", "text-slate-400", "font-mono"], [3, "color", "dot"], [1, "flex", "items-center", "justify-end", "gap-2"], ["type", "button", 1, "p-1.5", "rounded-lg", "border", "text-xs", "font-medium", "transition-colors", 3, "click", "title"], ["type", "button", "title", "Editar categor\xEDa", 1, "p-1.5", "rounded-lg", "border", "border-slate-200", "text-slate-600", "hover:text-teal-700", "hover:border-teal-300", "bg-white", "hover:bg-slate-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", "title", "Eliminar categor\xEDa", 1, "p-1.5", "rounded-lg", "border", "border-rose-200", "text-rose-600", "hover:bg-rose-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"]], template: function AdminCategoriesComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div")(3, "h1", 5);
        \u0275\u0275text(4, "Categor\xEDas del Cat\xE1logo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 6);
        \u0275\u0275text(6, " Organiza las secciones y categor\xEDas principales de la tienda (Hombre, Mujer, Ni\xF1os, Calzado, etc.). ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 7);
        \u0275\u0275listener("click", function AdminCategoriesComponent_Template_button_click_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.openCreateModal());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 8);
        \u0275\u0275element(9, "path", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "Nueva Categor\xEDa");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 10)(13, "div", 11)(14, "app-search-bar", 12);
        \u0275\u0275listener("searchChange", function AdminCategoriesComponent_Template_app_search_bar_searchChange_14_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.searchQuery.set($event));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 13);
        \u0275\u0275text(16, " Total categor\xEDas: ");
        \u0275\u0275elementStart(17, "span", 14);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(19, "app-table", 15);
        \u0275\u0275template(20, AdminCategoriesComponent_ng_template_20_Template, 8, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(22, AdminCategoriesComponent_ng_template_22_Template, 2, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(24, AdminCategoriesComponent_ng_template_24_Template, 9, 4, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(26, "app-modal", 16);
        \u0275\u0275listener("closed", function AdminCategoriesComponent_Template_app_modal_closed_26_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275elementStart(27, "form", 17);
        \u0275\u0275listener("ngSubmit", function AdminCategoriesComponent_Template_form_ngSubmit_27_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.saveCategory());
        });
        \u0275\u0275elementStart(28, "div")(29, "label", 18);
        \u0275\u0275text(30, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div")(33, "label", 18);
        \u0275\u0275text(34, "Emoji o Icono");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "div", 21)(37, "button", 22);
        \u0275\u0275listener("click", function AdminCategoriesComponent_Template_button_click_37_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275text(38, " Cancelar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "button", 23);
        \u0275\u0275text(40);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        const actionsTemplate_r7 = \u0275\u0275reference(25);
        \u0275\u0275advance(14);
        \u0275\u0275property("searchTerm", ctx.searchQuery());
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.adminStore.categories().length);
        \u0275\u0275advance();
        \u0275\u0275property("columns", ctx.columns)("data", ctx.filteredCategories())("hasActions", true)("actionsTemplate", actionsTemplate_r7);
        \u0275\u0275advance(7);
        \u0275\u0275property("isOpen", ctx.isModalOpen())("title", ctx.editingCategory() ? "Editar Categor\xEDa" : "Nueva Categor\xEDa")("showFooter", false);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.categoryForm);
        \u0275\u0275advance(12);
        \u0275\u0275property("disabled", ctx.categoryForm.invalid);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.editingCategory() ? "Guardar Cambios" : "Crear Categor\xEDa", " ");
      }
    }, dependencies: [
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminCategoriesComponent, { className: "AdminCategoriesComponent", filePath: "src\\app\\features\\admin\\categories\\admin-categories.component.ts", lineNumber: 168 });
})();
export {
  AdminCategoriesComponent
};
//# sourceMappingURL=chunk-GNLIO432.js.map
