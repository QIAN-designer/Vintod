import {
  EventEmitter,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-FGNI3DP5.js";

// src/app/shared/components/error-state/error-state.component.ts
var ErrorStateComponent = class _ErrorStateComponent {
  constructor() {
    this.message = "Ha ocurrido un error inesperado.";
    this.retry = new EventEmitter();
  }
  static {
    this.\u0275fac = function ErrorStateComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ErrorStateComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ErrorStateComponent, selectors: [["app-error-state"]], inputs: { message: "message" }, outputs: { retry: "retry" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 1, consts: [[1, "text-center", "py-12", "bg-red-50", "rounded-lg", "border", "border-red-200"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "mx-auto", "h-12", "w-12", "text-red-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"], [1, "mt-2", "text-sm", "font-medium", "text-red-800"], [1, "mt-1", "text-sm", "text-red-600"], [1, "mt-6"], ["type", "button", 1, "inline-flex", "items-center", "px-4", "py-2", "border", "border-transparent", "text-sm", "font-medium", "rounded-md", "text-red-700", "bg-red-100", "hover:bg-red-200", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-red-500", 3, "click"]], template: function ErrorStateComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(1, "svg", 1);
        \u0275\u0275element(2, "path", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(3, "h3", 3);
        \u0275\u0275text(4, "Error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5)(8, "button", 6);
        \u0275\u0275listener("click", function ErrorStateComponent_Template_button_click_8_listener() {
          return ctx.retry.emit();
        });
        \u0275\u0275text(9, " Reintentar ");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.message);
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ErrorStateComponent, { className: "ErrorStateComponent", filePath: "src\\app\\shared\\components\\error-state\\error-state.component.ts", lineNumber: 21 });
})();

export {
  ErrorStateComponent
};
//# sourceMappingURL=chunk-C246LOGA.js.map
