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
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FGNI3DP5.js";

// src/app/features/admin/users/admin-users.component.ts
var _c0 = ["userTpl"];
var _c1 = ["roleTpl"];
var _c2 = ["statusTpl"];
var _c3 = ["activityTpl"];
function AdminUsersComponent_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275element(1, "img", 34);
    \u0275\u0275elementStart(2, "div")(3, "div", 35);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 36);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const u_r2 = ctx.row;
    \u0275\u0275advance();
    \u0275\u0275property("src", u_r2.avatar, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(u_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r2.email);
  }
}
function AdminUsersComponent_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-badge", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r3 = ctx.row;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("color", ctx_r3.getRoleColor(u_r3.role));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", u_r3.role, " ");
  }
}
function AdminUsersComponent_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-badge", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r5 = ctx.row;
    \u0275\u0275property("color", u_r5.isActive ? "emerald" : "gray")("dot", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", u_r5.isActive ? "Activo" : "Suspendido", " ");
  }
}
function AdminUsersComponent_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " prendas \u2022 ");
    \u0275\u0275elementStart(4, "span", 40);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " ventas ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r6 = ctx.row;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r6.productsCount);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(u_r6.salesCount);
  }
}
function AdminUsersComponent_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "button", 42);
    \u0275\u0275listener("click", function AdminUsersComponent_ng_template_34_Template_button_click_1_listener() {
      const u_r8 = \u0275\u0275restoreView(_r7).row;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleActive(u_r8));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 43);
    \u0275\u0275listener("click", function AdminUsersComponent_ng_template_34_Template_button_click_3_listener() {
      const u_r8 = \u0275\u0275restoreView(_r7).row;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openEditModal(u_r8));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 10);
    \u0275\u0275element(5, "path", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "button", 45);
    \u0275\u0275listener("click", function AdminUsersComponent_ng_template_34_Template_button_click_6_listener() {
      const u_r8 = \u0275\u0275restoreView(_r7).row;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.deleteUser(u_r8));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 10);
    \u0275\u0275element(8, "path", 46);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const u_r8 = ctx.row;
    \u0275\u0275advance();
    \u0275\u0275classMap(u_r8.isActive ? "border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100" : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100");
    \u0275\u0275property("title", u_r8.isActive ? "Suspender cuenta" : "Reactivar cuenta");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", u_r8.isActive ? "Suspender" : "Activar", " ");
  }
}
var AdminUsersComponent = class _AdminUsersComponent {
  constructor() {
    this.adminStore = inject(AdminStore);
    this.notifications = inject(NotificationService);
    this.fb = inject(FormBuilder);
    this.searchQuery = signal("");
    this.roleFilter = signal("all");
    this.isModalOpen = signal(false);
    this.editingUser = signal(null);
    this.columns = [];
    this.userForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      role: ["user", [Validators.required]],
      city: ["Madrid"]
    });
  }
  ngAfterViewInit() {
    this.columns = [
      { key: "name", label: "Usuario", cellTemplate: this.userTpl },
      { key: "role", label: "Rol", align: "center", cellTemplate: this.roleTpl },
      { key: "city", label: "Ciudad" },
      { key: "productsCount", label: "Actividad", cellTemplate: this.activityTpl },
      { key: "isActive", label: "Estado", align: "center", cellTemplate: this.statusTpl },
      { key: "createdAt", label: "Registro" }
    ];
  }
  filteredUsers() {
    const list = this.adminStore.users();
    const q = this.searchQuery().toLowerCase().trim();
    const role = this.roleFilter();
    return list.filter((u) => {
      const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.city && u.city.toLowerCase().includes(q);
      const matchRole = role === "all" || u.role === role;
      return matchQ && matchRole;
    });
  }
  onRoleChange(e) {
    this.roleFilter.set(e.target.value);
  }
  getRoleColor(role) {
    switch (role) {
      case "admin":
        return "danger";
      case "moderator":
        return "teal";
      default:
        return "gray";
    }
  }
  toggleActive(u) {
    this.adminStore.toggleUserActive(u.id);
    this.notifications.info("Estado actualizado", `El estado de ${u.name} se ha modificado.`);
  }
  openCreateModal() {
    this.editingUser.set(null);
    this.userForm.reset({ name: "", email: "", role: "user", city: "Madrid" });
    this.isModalOpen.set(true);
  }
  openEditModal(u) {
    this.editingUser.set(u);
    this.userForm.patchValue({
      name: u.name,
      email: u.email,
      role: u.role,
      city: u.city || "Madrid"
    });
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
    this.editingUser.set(null);
  }
  saveUser() {
    if (this.userForm.invalid)
      return;
    const val = this.userForm.value;
    const current = this.editingUser();
    if (current) {
      this.adminStore.saveUser(__spreadProps(__spreadValues({}, val), { id: current.id }));
      this.notifications.success("Usuario actualizado", `Los datos de ${val.name} han sido guardados.`);
    } else {
      this.adminStore.saveUser(val);
      this.notifications.success("Usuario creado", `El usuario ${val.name} se ha registrado.`);
    }
    this.closeModal();
  }
  deleteUser(u) {
    return __async(this, null, function* () {
      const ok = yield this.notifications.confirm("\xBFEliminar usuario?", `Se eliminar\xE1 el perfil de ${u.name} permanentemente.`);
      if (ok) {
        this.adminStore.deleteUser(u.id);
        this.notifications.success("Usuario eliminado", "El usuario ha sido retirado.");
      }
    });
  }
  static {
    this.\u0275fac = function AdminUsersComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminUsersComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminUsersComponent, selectors: [["app-admin-users"]], viewQuery: function AdminUsersComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
        \u0275\u0275viewQuery(_c2, 5);
        \u0275\u0275viewQuery(_c3, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.userTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.roleTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.statusTpl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.activityTpl = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 66, vars: 12, consts: [["userTpl", ""], ["roleTpl", ""], ["statusTpl", ""], ["activityTpl", ""], ["actionsTemplate", ""], [1, "space-y-6"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-slate-900"], [1, "text-sm", "text-slate-500", "mt-1"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-4", "py-2.5", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "transition-all", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"], [1, "bg-white", "p-4", "rounded-xl", "border", "border-slate-200", "shadow-xs", "flex", "flex-col", "sm:flex-row", "gap-4", "items-center", "justify-between"], [1, "w-full", "sm:w-96"], ["placeholder", "Buscar por nombre, correo o ciudad...", 3, "searchChange", "searchTerm"], [1, "flex", "items-center", "gap-2", "w-full", "sm:w-auto"], [1, "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-teal-500", 3, "change", "value"], ["value", "all"], ["value", "user"], ["value", "moderator"], ["value", "admin"], ["emptyMessage", "No se encontraron usuarios", 3, "columns", "data", "hasActions", "actionsTemplate"], [3, "closed", "isOpen", "title", "showFooter"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-xs", "font-semibold", "text-slate-700", "uppercase"], ["type", "text", "formControlName", "name", "placeholder", "Ej: Laura G\xF3mez", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["type", "email", "formControlName", "email", "placeholder", "laura@ejemplo.com", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["formControlName", "role", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], ["type", "text", "formControlName", "city", "placeholder", "Madrid", 1, "mt-1", "block", "w-full", "py-2", "px-3", "text-sm", "bg-white", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-teal-500"], [1, "pt-4", "flex", "justify-end", "gap-3", "border-t", "border-slate-100"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-slate-700", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "transition-colors", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-semibold", "text-white", "bg-teal-600", "hover:bg-teal-700", "rounded-lg", "shadow-sm", "disabled:opacity-50", "transition-all", 3, "disabled"], [1, "flex", "items-center", "gap-3"], ["alt", "Avatar", 1, "w-9", "h-9", "rounded-full", "object-cover", "ring-1", "ring-slate-200", 3, "src"], [1, "font-semibold", "text-slate-900"], [1, "text-xs", "text-slate-400"], [3, "color"], [3, "color", "dot"], [1, "text-xs", "text-slate-600"], [1, "font-semibold", "text-slate-800"], [1, "flex", "items-center", "justify-end", "gap-2"], ["type", "button", 1, "p-1.5", "rounded-lg", "border", "text-xs", "font-medium", "transition-colors", 3, "click", "title"], ["type", "button", "title", "Editar usuario", 1, "p-1.5", "rounded-lg", "border", "border-slate-200", "text-slate-600", "hover:text-teal-700", "hover:border-teal-300", "bg-white", "hover:bg-slate-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", "title", "Eliminar usuario", 1, "p-1.5", "rounded-lg", "border", "border-rose-200", "text-rose-600", "hover:bg-rose-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"]], template: function AdminUsersComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div")(3, "h1", 7);
        \u0275\u0275text(4, "Usuarios & Vendedores");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 8);
        \u0275\u0275text(6, " Gesti\xF3n de permisos, roles, moderaci\xF3n de perfiles y actividad de la comunidad. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 9);
        \u0275\u0275listener("click", function AdminUsersComponent_Template_button_click_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.openCreateModal());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 10);
        \u0275\u0275element(9, "path", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "A\xF1adir Usuario");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 12)(13, "div", 13)(14, "app-search-bar", 14);
        \u0275\u0275listener("searchChange", function AdminUsersComponent_Template_app_search_bar_searchChange_14_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.searchQuery.set($event));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 15)(16, "select", 16);
        \u0275\u0275listener("change", function AdminUsersComponent_Template_select_change_16_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onRoleChange($event));
        });
        \u0275\u0275elementStart(17, "option", 17);
        \u0275\u0275text(18, "Todos los roles");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "option", 18);
        \u0275\u0275text(20, "Usuario / Vendedor");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "option", 19);
        \u0275\u0275text(22, "Moderador");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "option", 20);
        \u0275\u0275text(24, "Administrador");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275element(25, "app-table", 21);
        \u0275\u0275template(26, AdminUsersComponent_ng_template_26_Template, 7, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(28, AdminUsersComponent_ng_template_28_Template, 2, 2, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(30, AdminUsersComponent_ng_template_30_Template, 2, 3, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(32, AdminUsersComponent_ng_template_32_Template, 7, 2, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(34, AdminUsersComponent_ng_template_34_Template, 9, 4, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(36, "app-modal", 22);
        \u0275\u0275listener("closed", function AdminUsersComponent_Template_app_modal_closed_36_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275elementStart(37, "form", 23);
        \u0275\u0275listener("ngSubmit", function AdminUsersComponent_Template_form_ngSubmit_37_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.saveUser());
        });
        \u0275\u0275elementStart(38, "div")(39, "label", 24);
        \u0275\u0275text(40, "Nombre completo");
        \u0275\u0275elementEnd();
        \u0275\u0275element(41, "input", 25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "div")(43, "label", 24);
        \u0275\u0275text(44, "Correo electr\xF3nico");
        \u0275\u0275elementEnd();
        \u0275\u0275element(45, "input", 26);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "div", 27)(47, "div")(48, "label", 24);
        \u0275\u0275text(49, "Rol");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "select", 28)(51, "option", 18);
        \u0275\u0275text(52, "Usuario est\xE1ndar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "option", 19);
        \u0275\u0275text(54, "Moderador de contenido");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "option", 20);
        \u0275\u0275text(56, "Administrador global");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(57, "div")(58, "label", 24);
        \u0275\u0275text(59, "Ciudad");
        \u0275\u0275elementEnd();
        \u0275\u0275element(60, "input", 29);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(61, "div", 30)(62, "button", 31);
        \u0275\u0275listener("click", function AdminUsersComponent_Template_button_click_62_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275text(63, " Cancelar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "button", 32);
        \u0275\u0275text(65);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        const actionsTemplate_r9 = \u0275\u0275reference(35);
        \u0275\u0275advance(14);
        \u0275\u0275property("searchTerm", ctx.searchQuery());
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.roleFilter());
        \u0275\u0275advance(9);
        \u0275\u0275property("columns", ctx.columns)("data", ctx.filteredUsers())("hasActions", true)("actionsTemplate", actionsTemplate_r9);
        \u0275\u0275advance(11);
        \u0275\u0275property("isOpen", ctx.isModalOpen())("title", ctx.editingUser() ? "Editar Perfil de Usuario" : "Registrar Nuevo Usuario")("showFooter", false);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.userForm);
        \u0275\u0275advance(27);
        \u0275\u0275property("disabled", ctx.userForm.invalid);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.editingUser() ? "Guardar Cambios" : "Registrar", " ");
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
      SearchBarComponent,
      ModalComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminUsersComponent, { className: "AdminUsersComponent", filePath: "src\\app\\features\\admin\\users\\admin-users.component.ts", lineNumber: 214 });
})();
export {
  AdminUsersComponent
};
//# sourceMappingURL=chunk-BDOPLPQC.js.map
