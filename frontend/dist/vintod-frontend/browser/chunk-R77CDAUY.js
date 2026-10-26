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
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
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
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FGNI3DP5.js";

// src/app/features/admin/conditions/admin-conditions.component.ts
var _c0 = ["badgeTpl"];
var _c1 = ["statusTpl"];
function AdminConditionsComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-badge", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = ctx.row;
    \u0275\u0275property("color", c_r2.badgeColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r2.name, " ");
  }
}
function AdminConditionsComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-badge", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r3 = ctx.row;
    \u0275\u0275property("color", c_r3.isActive ? "emerald" : "gray")("dot", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r3.isActive ? "Activo" : "Inactivo", " ");
  }
}
function AdminConditionsComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "button", 28);
    \u0275\u0275listener("click", function AdminConditionsComponent_ng_template_17_Template_button_click_1_listener() {
      const c_r5 = \u0275\u0275restoreView(_r4).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.toggleActive(c_r5));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 29);
    \u0275\u0275listener("click", function AdminConditionsComponent_ng_template_17_Template_button_click_3_listener() {
      const c_r5 = \u0275\u0275restoreView(_r4).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.openEditModal(c_r5));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 8);
    \u0275\u0275element(5, "path", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "button", 31);
    \u0275\u0275listener("click", function AdminConditionsComponent_ng_template_17_Template_button_click_6_listener() {
      const c_r5 = \u0275\u0275restoreView(_r4).row;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.deleteCondition(c_r5));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 8);
    \u0275\u0275element(8, "path", 32);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r5 = ctx.row;
    \u0275\u0275advance();
    \u0275\u0275classMap(c_r5.isActive ? "border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100" : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r5.isActive ? "Desactivar" : "Activar", " ");
  }
}
var AdminConditionsComponent = class _AdminConditionsComponent {
  constructor() {
    this.adminStore = inject(AdminStore);
    this.notifications = inject(NotificationService);
    this.fb = inject(FormBuilder);
    this.isModalOpen = signal(false);
    this.editingCondition = signal(null);
    this.columns = [];
    this.condForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required]],
      badgeColor: ["teal", [Validators.required]]
    });
  }
  ngAfterViewInit() {
    this.columns = [
      { key: "name", label: "Distintivo", cellTemplate: this.badgeTpl },
      { key: "description", label: "Descripci\xF3n" },
      { key: "isActive", label: "Estado", align: "center", cellTemplate: this.statusTpl },
      { key: "createdAt", label: "Creaci\xF3n" }
    ];
  }
  toggleActive(c) {
    this.adminStore.toggleConditionActive(c.id);
    this.notifications.info("Estado modificado", `Condici\xF3n ${c.name} actualizada.`);
  }
  openCreateModal() {
    this.editingCondition.set(null);
    this.condForm.reset({ name: "", description: "", badgeColor: "teal" });
    this.isModalOpen.set(true);
  }
  openEditModal(c) {
    this.editingCondition.set(c);
    this.condForm.patchValue({
      name: c.name,
      description: c.description,
      badgeColor: c.badgeColor
    });
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
    this.editingCondition.set(null);
  }
  saveCondition() {
    if (this.condForm.invalid)
      return;
    const val = this.condForm.value;
    const current = this.editingCondition();
    if (current) {
      this.adminStore.saveCondition(__spreadProps(__spreadValues({}, val), { id: current.id }));
      this.notifications.success("Guardado", `Condici\xF3n ${val.name} actualizada.`);
    } else {
      this.adminStore.saveCondition(val);
      this.notifications.success("Creado", `Condici\xF3n ${val.name} creada.`);
    }
    this.closeModal();
  }
  deleteCondition(c) {
    return __async(this, null, function* () {
      const ok = yield this.notifications.confirm("\xBFEliminar condici\xF3n?", `Se eliminar\xE1 ${c.name}.`);
      if (ok) {
        this.adminStore.deleteCondition(c.id);
        this.notifications.success("Eliminado", "Condici\xF3n eliminada.");
      }
    });
  }
  static {
    this.\u0275fac = function AdminConditionsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminConditionsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminConditionsComponent, selectors: [["app-admin-conditions"]], viewQuery: function AdminConditionsComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.badgeTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.statusTpl = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 48, vars: 10, consts: [["badgeTpl", ""], ["statusTpl", ""], ["actionsTemplate", ""], [1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-slate-900"], [1, "text-sm", "text-slate-500", "mt-1"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-4", "py-2.5", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "transition-all", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], ["emptyMessage", "No hay estados configurados", 3, "columns", "data", "hasActions", "actionsTemplate"], [3, "closed", "isOpen", "title", "showFooter"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-xs", "font-semibold", "text-slate-700", "uppercase"], ["type", "text", "formControlName", "name", "placeholder", "Ej: Como nuevo (puesto 1 vez)", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["formControlName", "description", "rows", "3", "placeholder", "Gu\xEDa para compradores sobre qu\xE9 esperar de este estado...", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["formControlName", "badgeColor", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["value", "emerald"], ["value", "teal"], ["value", "blue"], ["value", "warning"], ["value", "gray"], [1, "pt-4", "flex", "justify-end", "gap-3", "border-t", "border-slate-100"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-slate-700", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "transition-colors", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "disabled:opacity-50", "transition-all", 3, "disabled"], [3, "color"], [3, "color", "dot"], [1, "flex", "items-center", "justify-end", "gap-2"], ["type", "button", 1, "p-1.5", "rounded-lg", "border", "text-xs", "font-medium", "transition-colors", 3, "click"], ["type", "button", 1, "p-1.5", "rounded-lg", "border", "border-slate-200", "text-slate-600", "hover:text-teal-700", "hover:border-teal-300", "bg-white", "hover:bg-slate-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", 1, "p-1.5", "rounded-lg", "border", "border-rose-200", "text-rose-600", "hover:bg-rose-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"]], template: function AdminConditionsComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div")(3, "h1", 5);
        \u0275\u0275text(4, "Estados de Conservaci\xF3n de Prendas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 6);
        \u0275\u0275text(6, ' Gesti\xF3n de las condiciones del cat\xE1logo ("Nuevo con etiquetas", "Muy bueno", "Bueno", etc.). ');
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 7);
        \u0275\u0275listener("click", function AdminConditionsComponent_Template_button_click_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.openCreateModal());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 8);
        \u0275\u0275element(9, "path", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "Nueva Condici\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(12, "app-table", 10);
        \u0275\u0275template(13, AdminConditionsComponent_ng_template_13_Template, 2, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(15, AdminConditionsComponent_ng_template_15_Template, 2, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(17, AdminConditionsComponent_ng_template_17_Template, 9, 3, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(19, "app-modal", 11);
        \u0275\u0275listener("closed", function AdminConditionsComponent_Template_app_modal_closed_19_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275elementStart(20, "form", 12);
        \u0275\u0275listener("ngSubmit", function AdminConditionsComponent_Template_form_ngSubmit_20_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.saveCondition());
        });
        \u0275\u0275elementStart(21, "div")(22, "label", 13);
        \u0275\u0275text(23, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "input", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "div")(26, "label", 13);
        \u0275\u0275text(27, "Descripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275element(28, "textarea", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div")(30, "label", 13);
        \u0275\u0275text(31, "Color de Distintivo (Badge)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "select", 16)(33, "option", 17);
        \u0275\u0275text(34, "Verde Esmeralda (Excelente/Nuevo)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "option", 18);
        \u0275\u0275text(36, "Verde Azulado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "option", 19);
        \u0275\u0275text(38, "Azul (Muy bueno)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "option", 20);
        \u0275\u0275text(40, "\xC1mbar (Bueno/Satisfactorio)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "option", 21);
        \u0275\u0275text(42, "Gris neutro");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(43, "div", 22)(44, "button", 23);
        \u0275\u0275listener("click", function AdminConditionsComponent_Template_button_click_44_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275text(45, " Cancelar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "button", 24);
        \u0275\u0275text(47);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        const actionsTemplate_r7 = \u0275\u0275reference(18);
        \u0275\u0275advance(12);
        \u0275\u0275property("columns", ctx.columns)("data", ctx.adminStore.conditions())("hasActions", true)("actionsTemplate", actionsTemplate_r7);
        \u0275\u0275advance(7);
        \u0275\u0275property("isOpen", ctx.isModalOpen())("title", ctx.editingCondition() ? "Editar Condici\xF3n" : "Nueva Condici\xF3n")("showFooter", false);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.condForm);
        \u0275\u0275advance(26);
        \u0275\u0275property("disabled", ctx.condForm.invalid);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.editingCondition() ? "Guardar Cambios" : "Crear Condici\xF3n", " ");
      }
    }, dependencies: [
      ReactiveFormsModule,
      \u0275NgNoValidate,
      NgSelectOption,
      \u0275NgSelectMultipleOption,
      DefaultValueAccessor,
      SelectControlValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      FormGroupDirective,
      FormControlName,
      TableComponent,
      BadgeComponent,
      ModalComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminConditionsComponent, { className: "AdminConditionsComponent", filePath: "src\\app\\features\\admin\\conditions\\admin-conditions.component.ts", lineNumber: 157 });
})();
export {
  AdminConditionsComponent
};
//# sourceMappingURL=chunk-R77CDAUY.js.map
