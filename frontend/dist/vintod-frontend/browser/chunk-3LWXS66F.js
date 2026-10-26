import {
  RouterOutlet
} from "./chunk-JJ7KZVYI.js";
import "./chunk-HA5NQ34U.js";
import {
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart
} from "./chunk-FGNI3DP5.js";

// src/app/layouts/public-layout/public-layout.component.ts
var PublicLayoutComponent = class _PublicLayoutComponent {
  static {
    this.\u0275fac = function PublicLayoutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PublicLayoutComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PublicLayoutComponent, selectors: [["app-public-layout"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 0, consts: [[1, "min-h-screen", "flex", "flex-col", "bg-surface"], [1, "flex-1", "w-full"]], template: function PublicLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "main", 1);
        \u0275\u0275element(2, "router-outlet");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [RouterOutlet], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PublicLayoutComponent, { className: "PublicLayoutComponent", filePath: "src\\app\\layouts\\public-layout\\public-layout.component.ts", lineNumber: 16 });
})();
export {
  PublicLayoutComponent
};
//# sourceMappingURL=chunk-3LWXS66F.js.map
