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
import {
  require_sweetalert2_all
} from "./chunk-CFLKTGFK.js";
import {
  ProductsStore
} from "./chunk-YHGVVQNI.js";
import {
  Router
} from "./chunk-JJ7KZVYI.js";
import {
  __toESM,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-FGNI3DP5.js";

// src/app/features/products/pages/product-form/product-form.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
function ProductFormComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, " El t\xEDtulo es obligatorio y debe tener entre 3 y 50 caracteres. ");
    \u0275\u0275elementEnd();
  }
}
function ProductFormComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, " La descripci\xF3n es obligatoria (m\xEDnimo 10 caracteres). ");
    \u0275\u0275elementEnd();
  }
}
function ProductFormComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Precio inv\xE1lido (debe ser mayor a 0).");
    \u0275\u0275elementEnd();
  }
}
function ProductFormComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "La marca es obligatoria.");
    \u0275\u0275elementEnd();
  }
}
function ProductFormComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Selecciona una talla.");
    \u0275\u0275elementEnd();
  }
}
function ProductFormComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Selecciona el estado de la prenda.");
    \u0275\u0275elementEnd();
  }
}
function ProductFormComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 35)(2, "div", 36)(3, "span", 37);
    \u0275\u0275text(4, "Visibilidad de la prenda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 38);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "label", 39);
    \u0275\u0275element(8, "input", 40)(9, "div", 41);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ((tmp_1_0 = ctx_r0.productForm.get("isActive")) == null ? null : tmp_1_0.value) ? "La prenda est\xE1 visible para todos los compradores" : "La prenda est\xE1 oculta / pausada", " ");
  }
}
var ProductFormComponent = class _ProductFormComponent {
  constructor() {
    this.mode = "create";
    this.fb = inject(FormBuilder);
    this.store = inject(ProductsStore);
    this.router = inject(Router);
    this.isEditMode = signal(false);
    this.isSubmitting = signal(false);
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
    if (this.id || this.mode === "edit") {
      this.isEditMode.set(true);
      if (this.id) {
        this.loadProductData();
      }
    }
  }
  loadProductData() {
    const selected = this.store.selectedProduct();
    if (selected && (selected._id === this.id || selected.id === this.id)) {
      this.productForm.patchValue(selected);
    } else {
      this.store.loadProduct(this.id);
      setTimeout(() => {
        const prod = this.store.selectedProduct();
        if (prod)
          this.productForm.patchValue(prod);
      }, 500);
    }
  }
  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    const productData = this.productForm.value;
    if (this.isEditMode()) {
      const productId = this.id || this.store.selectedProduct()?._id || this.store.selectedProduct()?.id;
      this.store.updateProductData(productId, productData).add(() => {
        this.isSubmitting.set(false);
        if (!this.store.error()) {
          import_sweetalert2.default.fire("Actualizado", "Prenda actualizada con \xE9xito", "success");
          this.router.navigate(["/products", productId]);
        }
      });
    } else {
      this.store.addProduct(productData).add(() => {
        this.isSubmitting.set(false);
        if (!this.store.error()) {
          import_sweetalert2.default.fire("Publicado", "Prenda publicada con \xE9xito", "success");
          this.router.navigate(["/products"]);
        }
      });
    }
  }
  goBack() {
    if (this.isEditMode() && this.id) {
      this.router.navigate(["/products", this.id]);
    } else {
      this.router.navigate(["/products"]);
    }
  }
  static {
    this.\u0275fac = function ProductFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductFormComponent, selectors: [["app-product-form"]], inputs: { id: "id", mode: "mode" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 70, vars: 11, consts: [[1, "max-w-2xl", "mx-auto", "bg-white", "shadow", "sm:rounded-lg"], [1, "px-4", "py-5", "sm:p-6"], [1, "text-lg", "leading-6", "font-medium", "text-gray-900"], [1, "mt-5", "space-y-6", 3, "ngSubmit", "formGroup"], ["for", "title", 1, "block", "text-sm", "font-medium", "text-gray-700"], ["type", "text", "id", "title", "formControlName", "title", 1, "mt-1", "block", "w-full", "border", "border-gray-300", "rounded-md", "shadow-sm", "py-2", "px-3", "focus:outline-none", "focus:ring-vinted", "focus:border-vinted", "sm:text-sm"], [1, "mt-2", "text-sm", "text-red-600"], ["for", "description", 1, "block", "text-sm", "font-medium", "text-gray-700"], ["id", "description", "formControlName", "description", "rows", "4", 1, "mt-1", "block", "w-full", "border", "border-gray-300", "rounded-md", "shadow-sm", "py-2", "px-3", "focus:outline-none", "focus:ring-vinted", "focus:border-vinted", "sm:text-sm"], [1, "grid", "grid-cols-1", "gap-y-6", "gap-x-4", "sm:grid-cols-2"], ["for", "price", 1, "block", "text-sm", "font-medium", "text-gray-700"], ["type", "number", "step", "0.01", "id", "price", "formControlName", "price", 1, "mt-1", "block", "w-full", "border", "border-gray-300", "rounded-md", "shadow-sm", "py-2", "px-3", "focus:outline-none", "focus:ring-vinted", "focus:border-vinted", "sm:text-sm"], ["for", "brand", 1, "block", "text-sm", "font-medium", "text-gray-700"], ["type", "text", "id", "brand", "formControlName", "brand", 1, "mt-1", "block", "w-full", "border", "border-gray-300", "rounded-md", "shadow-sm", "py-2", "px-3", "focus:outline-none", "focus:ring-vinted", "focus:border-vinted", "sm:text-sm"], ["for", "size", 1, "block", "text-sm", "font-medium", "text-gray-700"], ["id", "size", "formControlName", "size", 1, "mt-1", "block", "w-full", "bg-white", "border", "border-gray-300", "rounded-md", "shadow-sm", "py-2", "px-3", "focus:outline-none", "focus:ring-vinted", "focus:border-vinted", "sm:text-sm"], ["value", ""], ["value", "XXS"], ["value", "XS"], ["value", "S"], ["value", "M"], ["value", "L"], ["value", "XL"], ["value", "XXL"], ["for", "condition", 1, "block", "text-sm", "font-medium", "text-gray-700"], ["id", "condition", "formControlName", "condition", 1, "mt-1", "block", "w-full", "bg-white", "border", "border-gray-300", "rounded-md", "shadow-sm", "py-2", "px-3", "focus:outline-none", "focus:ring-vinted", "focus:border-vinted", "sm:text-sm"], ["value", "Nuevo con etiquetas"], ["value", "Nuevo sin etiquetas"], ["value", "Muy bueno"], ["value", "Bueno"], ["value", "Satisfactorio"], [1, "border-t", "border-gray-200", "pt-4"], [1, "pt-5", "flex", "justify-end", "gap-3"], ["type", "button", 1, "bg-white", "py-2", "px-4", "border", "border-gray-300", "rounded-md", "shadow-sm", "text-sm", "font-medium", "text-gray-700", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-vinted", 3, "click"], ["type", "submit", 1, "inline-flex", "justify-center", "py-2", "px-4", "border", "border-transparent", "shadow-sm", "text-sm", "font-medium", "rounded-md", "text-white", "bg-vinted", "hover:bg-vinted-dark", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-vinted", "disabled:opacity-50", 3, "disabled"], [1, "flex", "items-center", "justify-between", "p-3", "rounded-lg", "border", "border-gray-200", "bg-gray-50"], [1, "flex", "flex-col"], [1, "text-sm", "font-medium", "text-gray-900"], [1, "text-xs", "text-gray-500", "mt-0.5"], [1, "relative", "inline-flex", "items-center", "cursor-pointer"], ["type", "checkbox", "formControlName", "isActive", 1, "sr-only", "peer"], [1, "w-11", "h-6", "bg-gray-300", "peer-focus:outline-none", "peer-focus:ring-2", "peer-focus:ring-vinted", "rounded-full", "peer", "peer-checked:after:translate-x-full", "peer-checked:after:border-white", "after:content-['']", "after:absolute", "after:top-[2px]", "after:left-[2px]", "after:bg-white", "after:border-gray-300", "after:border", "after:rounded-full", "after:h-5", "after:w-5", "after:transition-all", "peer-checked:bg-vinted"]], template: function ProductFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "form", 3);
        \u0275\u0275listener("ngSubmit", function ProductFormComponent_Template_form_ngSubmit_4_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(5, "div")(6, "label", 4);
        \u0275\u0275text(7, "T\xEDtulo");
        \u0275\u0275elementEnd();
        \u0275\u0275element(8, "input", 5);
        \u0275\u0275template(9, ProductFormComponent_Conditional_9_Template, 2, 0, "p", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div")(11, "label", 7);
        \u0275\u0275text(12, "Descripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275element(13, "textarea", 8);
        \u0275\u0275template(14, ProductFormComponent_Conditional_14_Template, 2, 0, "p", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 9)(16, "div")(17, "label", 10);
        \u0275\u0275text(18, "Precio (\u20AC)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 11);
        \u0275\u0275template(20, ProductFormComponent_Conditional_20_Template, 2, 0, "p", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div")(22, "label", 12);
        \u0275\u0275text(23, "Marca");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "input", 13);
        \u0275\u0275template(25, ProductFormComponent_Conditional_25_Template, 2, 0, "p", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "div")(27, "label", 14);
        \u0275\u0275text(28, "Talla");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "select", 15)(30, "option", 16);
        \u0275\u0275text(31, "Selecciona una talla");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "option", 17);
        \u0275\u0275text(33, "XXS");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "option", 18);
        \u0275\u0275text(35, "XS");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "option", 19);
        \u0275\u0275text(37, "S");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "option", 20);
        \u0275\u0275text(39, "M");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "option", 21);
        \u0275\u0275text(41, "L");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "option", 22);
        \u0275\u0275text(43, "XL");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "option", 23);
        \u0275\u0275text(45, "XXL");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(46, ProductFormComponent_Conditional_46_Template, 2, 0, "p", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "div")(48, "label", 24);
        \u0275\u0275text(49, "Estado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "select", 25)(51, "option", 16);
        \u0275\u0275text(52, "Selecciona el estado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "option", 26);
        \u0275\u0275text(54, "Nuevo con etiquetas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "option", 27);
        \u0275\u0275text(56, "Nuevo sin etiquetas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "option", 28);
        \u0275\u0275text(58, "Muy bueno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "option", 29);
        \u0275\u0275text(60, "Bueno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "option", 30);
        \u0275\u0275text(62, "Satisfactorio");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(63, ProductFormComponent_Conditional_63_Template, 2, 0, "p", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(64, ProductFormComponent_Conditional_64_Template, 10, 1, "div", 31);
        \u0275\u0275elementStart(65, "div", 32)(66, "button", 33);
        \u0275\u0275listener("click", function ProductFormComponent_Template_button_click_66_listener() {
          return ctx.goBack();
        });
        \u0275\u0275text(67, " Cancelar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "button", 34);
        \u0275\u0275text(69);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        let tmp_4_0;
        let tmp_5_0;
        let tmp_6_0;
        let tmp_7_0;
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.isEditMode() ? "Editar prenda" : "Vender nueva prenda", " ");
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.productForm);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_2_0 = ctx.productForm.get("title")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.productForm.get("title")) == null ? null : tmp_2_0.touched) ? 9 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_3_0 = ctx.productForm.get("description")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.productForm.get("description")) == null ? null : tmp_3_0.touched) ? 14 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275conditional(((tmp_4_0 = ctx.productForm.get("price")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.productForm.get("price")) == null ? null : tmp_4_0.touched) ? 20 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_5_0 = ctx.productForm.get("brand")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.productForm.get("brand")) == null ? null : tmp_5_0.touched) ? 25 : -1);
        \u0275\u0275advance(21);
        \u0275\u0275conditional(((tmp_6_0 = ctx.productForm.get("size")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.productForm.get("size")) == null ? null : tmp_6_0.touched) ? 46 : -1);
        \u0275\u0275advance(17);
        \u0275\u0275conditional(((tmp_7_0 = ctx.productForm.get("condition")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.productForm.get("condition")) == null ? null : tmp_7_0.touched) ? 63 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isEditMode() ? 64 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.productForm.invalid || ctx.isSubmitting());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isEditMode() ? "Actualizar" : "Publicar", " ");
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductFormComponent, { className: "ProductFormComponent", filePath: "src\\app\\features\\products\\pages\\product-form\\product-form.component.ts", lineNumber: 164 });
})();

export {
  ProductFormComponent
};
//# sourceMappingURL=chunk-FS3OCBUO.js.map
