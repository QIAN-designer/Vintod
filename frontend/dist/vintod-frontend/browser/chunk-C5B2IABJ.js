import {
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-FGNI3DP5.js";

// src/app/shared/components/empty-state/empty-state.component.ts
var EmptyStateComponent = class _EmptyStateComponent {
  constructor() {
    this.title = "No hay art\xEDculos";
    this.description = "No se han encontrado prendas.";
  }
  static {
    this.\u0275fac = function EmptyStateComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EmptyStateComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmptyStateComponent, selectors: [["app-empty-state"]], inputs: { title: "title", description: "description" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 7, vars: 2, consts: [[1, "text-center", "py-12"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "aria-hidden", "true", 1, "mx-auto", "h-12", "w-12", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"], [1, "mt-2", "text-sm", "font-medium", "text-gray-900"], [1, "mt-1", "text-sm", "text-gray-500"]], template: function EmptyStateComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(1, "svg", 1);
        \u0275\u0275element(2, "path", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(3, "h3", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.title);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.description);
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmptyStateComponent, { className: "EmptyStateComponent", filePath: "src\\app\\shared\\components\\empty-state\\empty-state.component.ts", lineNumber: 16 });
})();

export {
  EmptyStateComponent
};
//# sourceMappingURL=chunk-C5B2IABJ.js.map
