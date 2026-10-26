import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-VPYCVBQT.js";
import {
  EventEmitter,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate
} from "./chunk-FGNI3DP5.js";

// src/app/shared/components/search-bar/search-bar.component.ts
function SearchBarComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function SearchBarComponent_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clear());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 2);
    \u0275\u0275element(2, "path", 7);
    \u0275\u0275elementEnd()();
  }
}
var SearchBarComponent = class _SearchBarComponent {
  constructor() {
    this.placeholder = "Buscar...";
    this.searchTerm = "";
    this.searchChange = new EventEmitter();
  }
  onSearchChange(val) {
    this.searchTerm = val;
    this.searchChange.emit(val);
  }
  clear() {
    this.searchTerm = "";
    this.searchChange.emit("");
  }
  static {
    this.\u0275fac = function SearchBarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SearchBarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SearchBarComponent, selectors: [["app-search-bar"]], inputs: { placeholder: "placeholder", searchTerm: "searchTerm" }, outputs: { searchChange: "searchChange" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 3, consts: [[1, "relative", "w-full"], [1, "absolute", "inset-y-0", "left-0", "pl-3", "flex", "items-center", "pointer-events-none", "text-gray-400"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], ["type", "text", 1, "block", "w-full", "pl-9", "pr-8", "py-2", "text-sm", "bg-white", "border", "border-gray-300", "rounded-lg", "shadow-sm", "placeholder-gray-400", "focus:outline-none", "focus:ring-2", "focus:ring-vinted", "focus:border-vinted", 3, "ngModelChange", "placeholder", "ngModel"], ["type", "button", "title", "Borrar b\xFAsqueda", 1, "absolute", "inset-y-0", "right-0", "pr-2.5", "flex", "items-center", "text-gray-400", "hover:text-gray-600"], ["type", "button", "title", "Borrar b\xFAsqueda", 1, "absolute", "inset-y-0", "right-0", "pr-2.5", "flex", "items-center", "text-gray-400", "hover:text-gray-600", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"]], template: function SearchBarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(2, "svg", 2);
        \u0275\u0275element(3, "path", 3);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(4, "input", 4);
        \u0275\u0275listener("ngModelChange", function SearchBarComponent_Template_input_ngModelChange_4_listener($event) {
          return ctx.onSearchChange($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, SearchBarComponent_Conditional_5_Template, 3, 0, "button", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("placeholder", ctx.placeholder)("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.searchTerm ? 5 : -1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SearchBarComponent, { className: "SearchBarComponent", filePath: "src\\app\\shared\\components\\search-bar\\search-bar.component.ts", lineNumber: 37 });
})();

export {
  SearchBarComponent
};
//# sourceMappingURL=chunk-PXXD4P2T.js.map
