import {
  EmptyStateComponent
} from "./chunk-C5B2IABJ.js";
import {
  ErrorStateComponent
} from "./chunk-C246LOGA.js";
import {
  ProductsStore
} from "./chunk-YHGVVQNI.js";
import {
  RouterLink
} from "./chunk-JJ7KZVYI.js";
import {
  CommonModule,
  CurrencyPipe,
  NgClass,
  NgStyle
} from "./chunk-HA5NQ34U.js";
import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  NgModule,
  __spreadValues,
  computed,
  inject,
  input,
  isDevMode,
  numberAttribute,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind4,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction5,
  ɵɵreadContextLet,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstoreLet,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-FGNI3DP5.js";

// src/app/features/products/components/product-card/product-card.component.ts
var _c0 = (a0) => ["/products", a0];
var ProductCardComponent = class _ProductCardComponent {
  constructor() {
    this.isFavorite = signal(false);
    this.favCount = signal(Math.floor(Math.random() * 40) + 12);
    this.fontVariationSettings = computed(() => {
      return this.isFavorite() ? "'FILL' 1" : "'FILL' 0";
    });
  }
  toggleFavorite(event) {
    event.stopPropagation();
    event.preventDefault();
    const current = this.isFavorite();
    this.isFavorite.set(!current);
    this.favCount.update((c) => !current ? c + 1 : Math.max(0, c - 1));
  }
  static {
    this.\u0275fac = function ProductCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductCardComponent, selectors: [["app-product-card"]], inputs: { product: "product" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 39, vars: 23, consts: [[1, "group", "bg-surface-container-lowest", "rounded-2xl", "overflow-hidden", "shadow-sm", "hover:shadow-md", "transition-all", "flex", "flex-col", "justify-between", "cursor-pointer", 3, "routerLink"], [1, "p-space-sm", "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-2"], [1, "w-6", "h-6", "rounded-full", "bg-primary-fixed", "flex", "items-center", "justify-center", "text-[11px]", "font-bold", "text-on-primary-fixed", "uppercase", "overflow-hidden", "shrink-0"], [1, "font-label-md", "text-label-md", "text-on-surface", "font-medium", "truncate", "max-w-[120px]"], [1, "flex", "items-center", "gap-0.5", "text-tertiary", "font-label-md", "text-label-md"], [1, "material-symbols-outlined", "text-[15px]", 2, "font-variation-settings", "'FILL' 1"], [1, "relative", "aspect-[3/4]", "w-full", "bg-surface-container", "overflow-hidden"], [1, "w-full", "h-full", "object-cover", "group-hover:scale-105", "transition-transform", "duration-500", 3, "src", "alt"], [1, "absolute", "bottom-2.5", "left-2.5", "bg-secondary-fixed/90", "text-on-secondary-fixed", "font-label-md", "text-label-md", "px-2.5", "py-1", "rounded-full", "shadow-sm", "backdrop-blur-sm"], ["type", "button", 1, "absolute", "top-2.5", "right-2.5", "w-8", "h-8", "rounded-full", "bg-surface/85", "backdrop-blur-md", "flex", "items-center", "justify-center", "shadow-sm", "transition-colors", "hover:text-error", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "p-space-md", "flex", "flex-col", "gap-1"], [1, "flex", "items-baseline", "justify-between"], [1, "font-price-display", "text-price-display", "text-on-surface", "font-extrabold"], [1, "font-label-md", "text-label-md", "text-outline", "bg-surface-container", "px-2", "py-0.5", "rounded"], [1, "flex", "items-center", "gap-1", "text-secondary", "font-label-md", "text-label-md"], [1, "material-symbols-outlined", "text-[15px]"], [1, "flex", "items-center", "justify-between", "pt-1"], [1, "font-label-lg", "text-label-lg", "text-on-surface-variant", "font-medium", "truncate", "max-w-[150px]"], [1, "flex", "items-center", "gap-1", "text-outline", "font-label-md", "text-label-md"], [1, "material-symbols-outlined", "text-[14px]"]], template: function ProductCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "span", 6);
        \u0275\u0275text(9, "star");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "4.9");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 7);
        \u0275\u0275element(13, "img", 8);
        \u0275\u0275elementStart(14, "span", 9);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "button", 10);
        \u0275\u0275listener("click", function ProductCardComponent_Template_button_click_16_listener($event) {
          return ctx.toggleFavorite($event);
        });
        \u0275\u0275elementStart(17, "span", 11);
        \u0275\u0275text(18, "favorite");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(19, "div", 12)(20, "div", 13)(21, "span", 14);
        \u0275\u0275text(22);
        \u0275\u0275pipe(23, "currency");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "span", 15);
        \u0275\u0275text(25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 16)(27, "span", 17);
        \u0275\u0275text(28, "verified_user");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "span");
        \u0275\u0275text(30, "Incluye protecci\xF3n al comprador");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "div", 18)(32, "span", 19);
        \u0275\u0275text(33);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "div", 20)(35, "span", 21);
        \u0275\u0275text(36, "favorite_border");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "span");
        \u0275\u0275text(38);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(21, _c0, ctx.product.slug || ctx.product._id));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", (ctx.product.sellerName || "U").charAt(0), " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", "@" + (ctx.product.sellerName || "vendedor"), " ");
        \u0275\u0275advance(7);
        \u0275\u0275property("src", ctx.product.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=80", \u0275\u0275sanitizeUrl)("alt", ctx.product.title);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.product.condition || "Muy bueno", " ");
        \u0275\u0275advance();
        \u0275\u0275classProp("text-error", ctx.isFavorite())("text-outline", !ctx.isFavorite());
        \u0275\u0275advance();
        \u0275\u0275styleProp("font-variation-settings", ctx.fontVariationSettings());
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(23, 16, ctx.product.price, "EUR", "symbol", "1.2-2"), " ");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.product.size, " ");
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate1(" ", ctx.product.brand || "Vintage", " ");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.favCount());
      }
    }, dependencies: [RouterLink, CurrencyPipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductCardComponent, { className: "ProductCardComponent", filePath: "src\\app\\features\\products\\components\\product-card\\product-card.component.ts", lineNumber: 12 });
})();

// node_modules/ngx-skeleton-loader/fesm2022/ngx-skeleton-loader.mjs
var _c02 = ["*"];
var _c1 = (a0, a1, a2, a3, a4) => ({
  "custom-content": a0,
  circle: a1,
  progress: a2,
  "progress-dark": a3,
  pulse: a4
});
function NgxSkeletonLoaderComponent_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function NgxSkeletonLoaderComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, NgxSkeletonLoaderComponent_For_3_Conditional_1_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const appearanceValue_r2 = \u0275\u0275readContextLet(0);
    const animationValue_r3 = \u0275\u0275readContextLet(1);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(5, _c1, appearanceValue_r2 === "custom-content", appearanceValue_r2 === "circle", animationValue_r3 === "progress", animationValue_r3 === "progress-dark", animationValue_r3 === "pulse"))("ngStyle", ctx_r0.styles());
    \u0275\u0275attribute("aria-label", ctx_r0.ariaLabel())("aria-valuetext", ctx_r0.loadingText());
    \u0275\u0275advance();
    \u0275\u0275conditional(appearanceValue_r2 === "custom-content" ? 1 : -1);
  }
}
var NGX_SKELETON_LOADER_CONFIG = new InjectionToken("ngx-skeleton-loader.config");
var NgxSkeletonLoaderComponent = class _NgxSkeletonLoaderComponent {
  constructor() {
    this.#config = inject(NGX_SKELETON_LOADER_CONFIG, {
      optional: true
    });
    this.count = input(this.#config?.count || 1, {
      transform: numberAttribute
    });
    this.loadingText = input(this.#config?.loadingText || "Loading...");
    this.appearance = input(this.#config?.appearance || "line");
    this.animation = input(this.#config?.animation || "progress");
    this.ariaLabel = input(this.#config?.ariaLabel || "loading");
    this.theme = input(this.#config?.theme || null);
    this.items = computed(() => {
      let count = this.count() || 1;
      if (this.appearance() === "custom-content") {
        if (isDevMode() && count !== 1) {
          console.error(`\`NgxSkeletonLoaderComponent\` enforces elements with "custom-content" appearance as DOM nodes. Forcing "count" to "1".`);
          count = 1;
        }
      }
      return [...Array(count)].map((_, index) => index);
    });
    this.styles = computed(() => {
      const theme = this.theme();
      if (this.#config?.theme?.extendsFromRoot) {
        return __spreadValues(__spreadValues({}, this.#config?.theme), theme);
      }
      return theme;
    });
  }
  /**
   * Injects the `NgxSkeletonLoaderConfig` configuration object, which is optional.
   * This configuration object provides various options for customizing the behavior
   * and appearance of the `NgxSkeletonLoaderComponent`.
   */
  #config;
  static {
    this.\u0275fac = function NgxSkeletonLoaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxSkeletonLoaderComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _NgxSkeletonLoaderComponent,
      selectors: [["ngx-skeleton-loader"]],
      inputs: {
        count: [1, "count"],
        loadingText: [1, "loadingText"],
        appearance: [1, "appearance"],
        animation: [1, "animation"],
        ariaLabel: [1, "ariaLabel"],
        theme: [1, "theme"]
      },
      standalone: true,
      features: [\u0275\u0275StandaloneFeature],
      ngContentSelectors: _c02,
      decls: 4,
      vars: 2,
      consts: [["aria-busy", "true", "aria-valuemin", "0", "aria-valuemax", "100", "role", "progressbar", "tabindex", "-1", 1, "skeleton-loader", 3, "ngClass", "ngStyle"]],
      template: function NgxSkeletonLoaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275declareLet(0)(1);
          \u0275\u0275repeaterCreate(2, NgxSkeletonLoaderComponent_For_3_Template, 2, 11, "div", 0, \u0275\u0275repeaterTrackByIdentity);
        }
        if (rf & 2) {
          \u0275\u0275storeLet(ctx.appearance());
          \u0275\u0275advance();
          \u0275\u0275storeLet(ctx.animation());
          \u0275\u0275advance();
          \u0275\u0275repeater(ctx.items());
        }
      },
      dependencies: [NgClass, NgStyle],
      styles: ['.skeleton-loader[_ngcontent-%COMP%]{box-sizing:border-box;overflow:hidden;position:relative;background:#eff1f6 no-repeat;border-radius:4px;width:100%;height:20px;display:inline-block;margin-bottom:10px;will-change:transform}.skeleton-loader[_ngcontent-%COMP%]:after, .skeleton-loader[_ngcontent-%COMP%]:before{box-sizing:border-box}.skeleton-loader.circle[_ngcontent-%COMP%]{width:40px;height:40px;margin:5px;border-radius:50%}.skeleton-loader.progress[_ngcontent-%COMP%], .skeleton-loader.progress-dark[_ngcontent-%COMP%]{transform:translateZ(0)}.skeleton-loader.progress[_ngcontent-%COMP%]:after, .skeleton-loader.progress[_ngcontent-%COMP%]:before, .skeleton-loader.progress-dark[_ngcontent-%COMP%]:after, .skeleton-loader.progress-dark[_ngcontent-%COMP%]:before{box-sizing:border-box}.skeleton-loader.progress[_ngcontent-%COMP%]:before, .skeleton-loader.progress-dark[_ngcontent-%COMP%]:before{animation:_ngcontent-%COMP%_progress 2s ease-in-out infinite;background-size:200px 100%;position:absolute;z-index:1;top:0;left:0;width:200px;height:100%;content:""}.skeleton-loader.progress[_ngcontent-%COMP%]:before{background-image:linear-gradient(90deg,#fff0,#fff9,#fff0)}.skeleton-loader.progress-dark[_ngcontent-%COMP%]:before{background-image:linear-gradient(90deg,transparent,rgba(0,0,0,.2),transparent)}.skeleton-loader.pulse[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse 1.5s cubic-bezier(.4,0,.2,1) infinite;animation-delay:.5s}.skeleton-loader.custom-content[_ngcontent-%COMP%]{height:100%;background:none}@media (prefers-reduced-motion: reduce){.skeleton-loader.pulse[_ngcontent-%COMP%], .skeleton-loader.progress-dark[_ngcontent-%COMP%], .skeleton-loader.custom-content[_ngcontent-%COMP%], .skeleton-loader.progress[_ngcontent-%COMP%]:before{animation:none}.skeleton-loader.progress[_ngcontent-%COMP%]:before, .skeleton-loader.progress-dark[_ngcontent-%COMP%], .skeleton-loader.custom-content[_ngcontent-%COMP%]{background-image:none}}@media screen and (min-device-width: 1200px){.skeleton-loader[_ngcontent-%COMP%]{-webkit-user-select:none;user-select:none;cursor:wait}}@keyframes _ngcontent-%COMP%_progress{0%{transform:translate3d(-200px,0,0)}to{transform:translate3d(calc(200px + 100vw),0,0)}}@keyframes _ngcontent-%COMP%_pulse{0%{opacity:1}50%{opacity:.4}to{opacity:1}}'],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxSkeletonLoaderComponent, [{
    type: Component,
    args: [{
      selector: "ngx-skeleton-loader",
      imports: [NgClass, NgStyle],
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: `@let appearanceValue = appearance();
@let animationValue = animation();
@for (item of items(); track item) {
  <div
    class="skeleton-loader"
    [attr.aria-label]="ariaLabel()"
    aria-busy="true"
    aria-valuemin="0"
    aria-valuemax="100"
    [attr.aria-valuetext]="loadingText()"
    role="progressbar"
    tabindex="-1"
    [ngClass]="{
      'custom-content': appearanceValue === 'custom-content',
      circle: appearanceValue === 'circle',
      progress: animationValue === 'progress',
      'progress-dark': animationValue === 'progress-dark',
      pulse: animationValue === 'pulse'
    }"
    [ngStyle]="styles()"
    >
    @if (appearanceValue  === 'custom-content') {
      <ng-content></ng-content>
    }
  </div>
}
`,
      styles: ['.skeleton-loader{box-sizing:border-box;overflow:hidden;position:relative;background:#eff1f6 no-repeat;border-radius:4px;width:100%;height:20px;display:inline-block;margin-bottom:10px;will-change:transform}.skeleton-loader:after,.skeleton-loader:before{box-sizing:border-box}.skeleton-loader.circle{width:40px;height:40px;margin:5px;border-radius:50%}.skeleton-loader.progress,.skeleton-loader.progress-dark{transform:translateZ(0)}.skeleton-loader.progress:after,.skeleton-loader.progress:before,.skeleton-loader.progress-dark:after,.skeleton-loader.progress-dark:before{box-sizing:border-box}.skeleton-loader.progress:before,.skeleton-loader.progress-dark:before{animation:progress 2s ease-in-out infinite;background-size:200px 100%;position:absolute;z-index:1;top:0;left:0;width:200px;height:100%;content:""}.skeleton-loader.progress:before{background-image:linear-gradient(90deg,#fff0,#fff9,#fff0)}.skeleton-loader.progress-dark:before{background-image:linear-gradient(90deg,transparent,rgba(0,0,0,.2),transparent)}.skeleton-loader.pulse{animation:pulse 1.5s cubic-bezier(.4,0,.2,1) infinite;animation-delay:.5s}.skeleton-loader.custom-content{height:100%;background:none}@media (prefers-reduced-motion: reduce){.skeleton-loader.pulse,.skeleton-loader.progress-dark,.skeleton-loader.custom-content,.skeleton-loader.progress:before{animation:none}.skeleton-loader.progress:before,.skeleton-loader.progress-dark,.skeleton-loader.custom-content{background-image:none}}@media screen and (min-device-width: 1200px){.skeleton-loader{-webkit-user-select:none;user-select:none;cursor:wait}}@keyframes progress{0%{transform:translate3d(-200px,0,0)}to{transform:translate3d(calc(200px + 100vw),0,0)}}@keyframes pulse{0%{opacity:1}50%{opacity:.4}to{opacity:1}}\n']
    }]
  }], null, null);
})();
var NgxSkeletonLoaderModule = class _NgxSkeletonLoaderModule {
  static forRoot(config) {
    return {
      ngModule: _NgxSkeletonLoaderModule,
      providers: [{
        provide: NGX_SKELETON_LOADER_CONFIG,
        useValue: config
      }]
    };
  }
  static {
    this.\u0275fac = function NgxSkeletonLoaderModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxSkeletonLoaderModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _NgxSkeletonLoaderModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxSkeletonLoaderModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NgxSkeletonLoaderComponent],
      exports: [NgxSkeletonLoaderComponent]
    }]
  }], null, null);
})();

// src/app/features/products/components/product-skeleton/product-skeleton.component.ts
var _c03 = () => ({ width: "24px", height: "24px", margin: "0" });
var _c12 = () => ({ width: "80px", height: "12px", margin: "0", "border-radius": "4px" });
var _c2 = () => ({ width: "35px", height: "12px", margin: "0", "border-radius": "4px" });
var _c3 = () => ({ width: "100%", height: "100%", margin: "0", "border-radius": "0" });
var _c4 = () => ({ width: "70px", height: "18px", margin: "0", "border-radius": "4px" });
var _c5 = () => ({ width: "40px", height: "14px", margin: "0", "border-radius": "4px" });
var _c6 = () => ({ width: "120px", height: "12px", margin: "0", "border-radius": "4px" });
var _c7 = () => ({ width: "90px", height: "14px", margin: "0", "border-radius": "4px" });
var _c8 = () => ({ width: "30px", height: "12px", margin: "0", "border-radius": "4px" });
var ProductSkeletonComponent = class _ProductSkeletonComponent {
  static {
    this.\u0275fac = function ProductSkeletonComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductSkeletonComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductSkeletonComponent, selectors: [["app-product-skeleton"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 18, consts: [[1, "bg-surface-container-lowest", "rounded-2xl", "overflow-hidden", "shadow-sm", "flex", "flex-col", "justify-between", "animate-pulse"], [1, "p-space-sm", "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-2"], ["count", "1", "appearance", "circle", 3, "theme"], ["count", "1", "appearance", "line", 3, "theme"], [1, "aspect-[3/4]", "w-full", "bg-surface-container"], [1, "p-space-md", "flex", "flex-col", "gap-2"], [1, "flex", "items-baseline", "justify-between"], [1, "flex", "items-center", "justify-between", "pt-1"]], template: function ProductSkeletonComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "ngx-skeleton-loader", 3)(4, "ngx-skeleton-loader", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275element(5, "ngx-skeleton-loader", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 5);
        \u0275\u0275element(7, "ngx-skeleton-loader", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 6)(9, "div", 7);
        \u0275\u0275element(10, "ngx-skeleton-loader", 4)(11, "ngx-skeleton-loader", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275element(12, "ngx-skeleton-loader", 4);
        \u0275\u0275elementStart(13, "div", 8);
        \u0275\u0275element(14, "ngx-skeleton-loader", 4)(15, "ngx-skeleton-loader", 4);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275property("theme", \u0275\u0275pureFunction0(9, _c03));
        \u0275\u0275advance();
        \u0275\u0275property("theme", \u0275\u0275pureFunction0(10, _c12));
        \u0275\u0275advance();
        \u0275\u0275property("theme", \u0275\u0275pureFunction0(11, _c2));
        \u0275\u0275advance(2);
        \u0275\u0275property("theme", \u0275\u0275pureFunction0(12, _c3));
        \u0275\u0275advance(3);
        \u0275\u0275property("theme", \u0275\u0275pureFunction0(13, _c4));
        \u0275\u0275advance();
        \u0275\u0275property("theme", \u0275\u0275pureFunction0(14, _c5));
        \u0275\u0275advance();
        \u0275\u0275property("theme", \u0275\u0275pureFunction0(15, _c6));
        \u0275\u0275advance(2);
        \u0275\u0275property("theme", \u0275\u0275pureFunction0(16, _c7));
        \u0275\u0275advance();
        \u0275\u0275property("theme", \u0275\u0275pureFunction0(17, _c8));
      }
    }, dependencies: [NgxSkeletonLoaderModule, NgxSkeletonLoaderComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductSkeletonComponent, { className: "ProductSkeletonComponent", filePath: "src\\app\\features\\products\\components\\product-skeleton\\product-skeleton.component.ts", lineNumber: 10 });
})();

// src/app/features/products/pages/product-list/product-list.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item._id || $item.id;
var _c04 = () => [1, 2, 3, 4, 5, 6, 7, 8];
function ProductListComponent_For_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 123);
    \u0275\u0275listener("click", function ProductListComponent_For_43_Template_button_click_0_listener() {
      const cat_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectCategory(cat_r2.name));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("text-primary", ctx_r2.store.categoryFilter() === cat_r2.name)("font-bold", ctx_r2.store.categoryFilter() === cat_r2.name)("text-on-surface-variant", ctx_r2.store.categoryFilter() !== cat_r2.name)("hover:text-primary", ctx_r2.store.categoryFilter() !== cat_r2.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cat_r2.name, " ");
  }
}
function ProductListComponent_For_116_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 124);
    \u0275\u0275listener("click", function ProductListComponent_For_116_Template_div_click_0_listener() {
      const cat_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectCategory(cat_r5.name));
    });
    \u0275\u0275elementStart(1, "div", 125);
    \u0275\u0275element(2, "img", 126);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 127)(4, "span", 128);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 52);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cat_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", cat_r5.img, \u0275\u0275sanitizeUrl)("alt", cat_r5.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", cat_r5.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r5.count);
  }
}
function ProductListComponent_Conditional_123_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1, "close");
    \u0275\u0275elementEnd();
  }
}
function ProductListComponent_Conditional_154_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 129);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_154_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.resetFilters());
    });
    \u0275\u0275text(1, " Restablecer ");
    \u0275\u0275elementEnd();
  }
}
function ProductListComponent_Conditional_161_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-error-state", 130);
    \u0275\u0275listener("retry", function ProductListComponent_Conditional_161_Template_app_error_state_retry_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadProducts());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r2.store.error());
  }
}
function ProductListComponent_Conditional_162_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-skeleton");
  }
}
function ProductListComponent_Conditional_162_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88);
    \u0275\u0275repeaterCreate(1, ProductListComponent_Conditional_162_For_2_Template, 1, 0, "app-product-skeleton", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c04));
  }
}
function ProductListComponent_Conditional_163_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state");
  }
}
function ProductListComponent_Conditional_163_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-card", 131);
  }
  if (rf & 2) {
    const product_r8 = ctx.$implicit;
    \u0275\u0275property("product", product_r8);
  }
}
function ProductListComponent_Conditional_163_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88);
    \u0275\u0275repeaterCreate(1, ProductListComponent_Conditional_163_Conditional_1_For_2_Template, 1, 1, "app-product-card", 131, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.store.filteredProducts());
  }
}
function ProductListComponent_Conditional_163_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ProductListComponent_Conditional_163_Conditional_0_Template, 1, 0, "app-empty-state")(1, ProductListComponent_Conditional_163_Conditional_1_Template, 3, 0, "div", 88);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.store.filteredProducts().length === 0 ? 0 : 1);
  }
}
function ProductListComponent_For_182_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 142);
    \u0275\u0275element(1, "img", 145);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const img_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", img_r11, \u0275\u0275sanitizeUrl);
  }
}
function ProductListComponent_For_182_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 96)(1, "div", 46)(2, "div", 132)(3, "div", 21);
    \u0275\u0275element(4, "img", 133)(5, "span", 134);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "div", 135);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 136)(10, "span", 137);
    \u0275\u0275text(11, "star");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 138);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "button", 139);
    \u0275\u0275listener("click", function ProductListComponent_For_182_Template_button_click_16_listener() {
      const seller_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleFollow(seller_r10));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "p", 140);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 141);
    \u0275\u0275repeaterCreate(21, ProductListComponent_For_182_For_22_Template, 2, 1, "div", 142, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 143)(24, "span");
    \u0275\u0275text(25, "Env\xEDa en menos de 24h");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 144);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const seller_r10 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275property("src", seller_r10.avatar, \u0275\u0275sanitizeUrl)("alt", seller_r10.name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(seller_r10.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(seller_r10.rating);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", seller_r10.sales, " ventas)");
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-surface-container-high", !seller_r10.isFollowing)("text-on-surface", !seller_r10.isFollowing)("bg-secondary", seller_r10.isFollowing)("text-on-secondary", seller_r10.isFollowing);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", seller_r10.isFollowing ? "Siguiendo" : "Seguir", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(' "', seller_r10.bio, '" ');
    \u0275\u0275advance(2);
    \u0275\u0275repeater(seller_r10.previewImgs);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", seller_r10.itemsCount, " disponibles");
  }
}
var ProductListComponent = class _ProductListComponent {
  constructor() {
    this.store = inject(ProductsStore);
    this.ecoCounter = signal(14280);
    this.categories = [
      {
        id: "vestidos",
        name: "Vestidos",
        count: "3.4k prendas",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpWimkC6IOgvpAb-PTT_a9jH_h4L9VDYNox39MonsSiysLrls-Hi3IreaNGJglKhqir1tzEQWzbGFeiu4qVMUadwNA4YhJ31WBEdiIKPvJU5bxdOAjUbb5261rLY_KubKDW9iDjxSCfVfSg5iY9OR0iSEdcMCTm1qamJYuS56lVZawEK8vmvbNtT5W_kRsrXKHjU4ozvWWA0gH7p443ZEZe0zxmVDrCX9JkuRWAqGepJOcboA4wmqO"
      },
      {
        id: "zapatillas",
        name: "Zapatillas",
        count: "2.8k pares",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuANl2E4e5hp7oGZnW7r9Ic51MMcRmy2S1VdFlvCEEP5dFocFYtMughqy8q9zXJKb1XGBtaN6xoMPMQksou3A6pxcSyBiNvwK7JgLozmcngSnxqinL1OgjPsXWLn5rtiS2WfkGNBaGE4OvpCQNTsXoKeSxgMTnbg7g-u4tg5Wxm_IGzApA55IxdHpBkENnHOQb9-9xt7DFNzl-ARnyRbn6nMB96k14HC5eDPg6vZRYaKFwtGsaNT-oty"
      },
      {
        id: "chaquetas",
        name: "Chaquetas",
        count: "1.9k abrigos",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbzQyh4eQQiMN2v4VuY_Z8iTfQYcLR35p5YSlJAX7ixJRCcYvWalsPBpxQ1Lx-a-fXBCMzk3Ay2IA2tVH12QxeuC_b17h2Q6G8v62ighQA6YGJi2luusMQabNSK6bJhIhXnvq0I7lU6vHE6q2iQ1c_u4WNPM3grlFQ-0kdxqp3sNaCTDdCjBJf5gX-AKuiYN9WhLZW3csA-v8EEaxFhqdB5cVJSnlpXEZniGwkuHUN905J-ap7QbEe"
      },
      {
        id: "bolsos",
        name: "Bolsos",
        count: "890 piezas",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvDCUOjKRWcyMSqLS3-xs__gjhJki0OshYKQAd1wCnxNCXscjzUyWR5RBET7wdQmVma3kaPWwtf7M9FcNyty2uOMI9kDZOGufJEuNKaT0RAzSDD6ZuqPrOOWRZquQDUWTjpxlcUCRx5shNMpQ2N0Mp9f13NN8Wv07tXkCvB17BIsk-x6WkqquQCv27kubVNivrsBAlnuV3q4489CbYNleXK50HdqnBD4m7GMUS-Wg7Dsjf3FdW1a_5"
      },
      {
        id: "vintage",
        name: "Vintage",
        count: "4.1k tesoros",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6cWd5niQ9aaMQaBDpUSuKYKfEbs7-NyB8oVIO9oPfKc66fVppGq8s4HQPKqfL0kNsWVcySJ_QLz9RUpBVOQKoWtWQs2NcAaXQ3a07lEPGhdUYjoiPdJyJrGemYl5E-eI7Fb3iSYUt7WVlBIAAKOdSJL2SwM8jiuEUai-mCoZ-L4zSJyXV0pXm6lsiVOyRPoi_t-5hnUiMZReb1Uw7TDa5x-bF_Xa3y_3yTFOWQm0io2nFmqi8XWU_"
      },
      {
        id: "punto",
        name: "Punto",
        count: "1.5k prendas",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALjH4nkQqLFwBd3NxFGNcR85XaUXOARkaWhQwp2TKwwkiNO8IhDBQH0sRDks6nEKfTUuMouZ_i3ylvksabVcq1At4dO1VpK33RuiDWzYidXRFmTIpP9tEizU1QpCpOgr0O-FjUmiJb6TmTi-_3sYGqC5P6rKwYvdQ0PPvei7ZkK58mb58k2AD_mTOrtp0nhM1fXiiHLLRapxtFIm7bgYQnaqtz-LUwIu10WZc8lDwNm6IGLUzCKYRK"
      }
    ];
    this.featuredSellers = [
      {
        id: "s1",
        name: "Andrea Silva",
        rating: "5.0",
        sales: 240,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWb_2in6D-JvI0P0wGd1TnDPYgu15aNHXIaUGA7yNgyr--j4846Eb4yZnZshp6200IWpZeuom-HjMDc3l72KNdGNkOaYkp4jYL1KPadsTSiZw-cQa1T77DKduEyZr9Q7g6gns6DEllxoVbhz6A2YSiJL14ddmUV3mOHYx-BdoKHJ9Y5bQw3iho6k6T5VoetxihKPKQOLfvaZKMH_C1j2aqEOuDKmIGWWxVY69m1TFvlTwTi3Ez2vlN",
        bio: "Armario minimalista escandinavo, linos franceses y prendas de Rouje, Arket y COS.",
        itemsCount: 14,
        isFollowing: false,
        previewImgs: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2kcJ4qR0IZJPkvTYoeb7Gsbd7Yee-SGhv3VuvbnYbyCBsqOkJY5IUf0t1W0zFxMpInbbWv-bYMVaOPHKVJrVKNWzMd688JQROZ4NYyH5-3hqcJNXX0zQ-Bbq3ajPk-IK3-nquVXTjlL_ydoU4SrjVlUxWzHwET5Qpw9B_gQcX46rHkrXC9DSRSCRsE78PM-ktmlyOI37ePt7dS-jTT4z49GLR0wTNFbKkyoZXlLn0BTTtLVOzwh_",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAwtVDi1T9ejwYyfIxvl5dfy_z2XqjZfyuSKuBQvucNu2c7065TOXJceryyTp12R7qu6H7GzeQjww8IjDxImOvP7ulBv-Te2dT6WWVx95vlC84RjHkOWEMj9NMolYYbBiqSAy7Rc2Xxt3nf_Sjyq6XV72JeC6vNTDACJEMcZeHxwPGxYyMx2DqnZD9grN0bom42sAjnmU2KphrFzpPiFuOuzXq5lf84d1zZQXAJQL9n6mHGuCbXyek7",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAd9nQn7EC1QesErTLfFww1Rvs8Gx9umS8PE03ED9kCotXcfcPfY72YEGYA3e0RycbFv1eNO7AifvzSrYHkNuTkVQPuo6YN_nwSRhfYxPLACXiQByWQldVC_yXE3NR1ICJ9hdS0_1ZLRz3Ql14_Wt0WTCmDiYlq3VcNX0CFqY79qwywOMyBscDG2eCgbIXhaGDlGtpcHI-ZDGDBPCG0CzZxdSARpEYZkcjIDCaFeM4K5HM0DhBGL5OR"
        ]
      },
      {
        id: "s2",
        name: "Nico Archivist",
        rating: "4.9",
        sales: 312,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKc1cyWVRescGIuHopPSUcesp0viQfHnno4Xe4mcttY-zUoEwVv_QhGWr5hEx5W6OPpI18l1XqR0DneUSeNaRwMBirJ9OpYmhVMuScmZiSU2klQJ9JrdU3P1lFjpmWkxBDYOIlwVIrwvIK43aK2ni65FmklR77-oGEs2ycw3Bfl6QFdOAnviSUIobJM4gN4YxWZdAeB-NN3Buu3TAUde9HZjn1Y42p1vOsOPdtJ8ed43-40uiI8yXq",
        bio: "Especializado en archivo 90s, sudaderas universitarias USA originales y ropa de trabajo.",
        itemsCount: 28,
        isFollowing: false,
        previewImgs: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBpRTa0xm5GHf6XuGTseyZ1eq5egibLHyr8ObMQf_WNoix6H2_lJ4sBAs3-ZQGfbtrkSJNwoutKeSldVL4uI_tKs2Azdd8e6S2W2T0Jd3Gxa6sPtuvnySxDkuIpyR9At81huASHI_mxJMT_GxXEcV7l5VsR9XBQyINz5O941o-KfU3l4BB2RlMPCF_sA_8RQO6osU50_RHOnHnZ7F2IhjfInZ26OkbcNKpej6Z00Ej_SZ1g9cEk-ZjP",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAsIw-8ZIeuD2vCuhe6qpG5Oz-RxuQ-9DuRoCiy2Z9vjQuk0H7TnIfscQCFThifRKmqAnRpti20PWMqSoKHoNX97b4B31MlqQPvEUZOzkW1dDLmf1vHtZStAky0rdXyKzhlz71rbh0Djgij15onYT0G2ocok35ULuUXrAR_ngytwbk9aMNynxYqc_zp1Dc7x3nkqS1ZUj7A96nvlm2fBdyq2kDWyfspSIx5iQo8aa5rJE1mTm3iRztw",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDAVz89SXrQekOMds49cggzWDXGXaFWb4RZJ5ReXaVyK42umkGv1wjXSPrMd6Bu2cJNBrDnO_AuPlHI9C0GIFiiVbuU1cvSddYYpaxrmsU6_ef1-ZSdxR__QhH2wQDSb1RXmvU1tf-I5ZmCDPDTb9z_0iO0VJ04VCZC42YKqwjdMPanXPDjSpzkLC6QQC0WBnbqI8sKhc2K-8sWsu_XJ-zvZq8lOlKCg1Qgsm9VDZ6_KHhDCGIuHaHG"
        ]
      },
      {
        id: "s3",
        name: "Marta Atelier",
        rating: "5.0",
        sales: 185,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOCL5z6TTmfc8WaS2sq2XPkZY-1ZT5RutgInx1KPyQVQqsVhw06uBzUcY8Gg7hQC4-WvqF_YDmAOfTRBYr6R3XZMmOw9jFRcZpATaKEFXH2DfO-L-oD5BBsyV6obhjtne4OAzB_B3pZb8GASsvHDQnOIU6-GN10dTmPddYJ2_Dl-Bz5Ie21pFncPNfBi35_hWaPs8dbm2FbGyuCKWb6_o_6XECpJ0brEk6RLue-VAKGd-iuunBuIDR",
        bio: "Accesorios de lujo, bolsos descatalogados y vestidos de invitada con etiqueta.",
        itemsCount: 9,
        isFollowing: false,
        previewImgs: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDwd-YocTfJ5qhIbuNxn-Hl89aDp04karNQE5eMDDoHUU6DmfMwQt4OzRYX4FjxeSRS63YQ8GDhSenJz1icKfo3cFUm6wlQjiF1PhY88rIAu1Rk70Y6owAQTAR2XbCwM_6Q643YYxX4kfcyncX2tRT2-YDzJ-SQ0wr_9om1vSJ64z8XFbDf5kHD4fyxkR4brWAw3ZhYWlVl-VdBetF2KRhG3Uge-Ts6Kemnp_3u6Ehj1Rov-eSZs1B5",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB3u_Rx2BvvaCEjLrM1IpUazBWznhTv8sk-qOuFJcs3bZt5N4ojEPLlcxm42moBn8IKtBSGJFuUMYhAOtfwCEvUyNjaMU3vMZZFp7cMzz2qPdJyag4Iv974cIE_zkK5bQlSC0Z64eOoWSpkNO_E30ZtTzxhQbXMirXXpc5cmI2lsmwmJ05_Luqje6bx94w6ON3ivseC5LE9VKc7E9nuQj5UImYxMOOtsbANkvAPaBQPA6xUaoxfQp4A",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD2hJi1h8GoNey5UgNzFAIAOokHl1kX-MeGXdu156oBSBgbTA-XLA_6fHUL_hsK2TdGHjeKsf3fHVRjXhnIjZKSQ1GTM4trod1bA9bYo9xXcmkjlxYVdXsZOWIPQDBLAqySj049We8LJmHvhkDigOTdlzb46Z8NjPwCfEzBgzVr9RfgBjspAhKb0v55iOMvjGYjlLM-fFP1ayQlEIzM4jwoEavvIEPEE2D_hf6zxeqTvQfxe7At4pom"
        ]
      }
    ];
  }
  ngOnInit() {
    this.loadProducts();
    this.ecoIntervalId = setInterval(() => {
      if (Math.random() > 0.5) {
        this.ecoCounter.update((c) => c + Math.floor(Math.random() * 3) + 1);
      }
    }, 4500);
  }
  ngOnDestroy() {
    if (this.ecoIntervalId) {
      clearInterval(this.ecoIntervalId);
    }
  }
  loadProducts() {
    this.store.loadProducts();
  }
  onSearchInput(event) {
    const val = event.target.value;
    this.store.setSearchFilter(val);
  }
  selectCategory(categoryName) {
    this.store.setCategoryFilter(categoryName);
    this.scrollToFeed();
  }
  onBrandChange(event) {
    const val = event.target.value;
    this.store.setBrandFilter(val);
  }
  onConditionChange(event) {
    const val = event.target.value;
    this.store.setConditionFilter(val);
  }
  resetFilters() {
    this.store.resetFilters();
  }
  scrollToFeed() {
    const el = document.getElementById("feed-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
  toggleFollow(seller) {
    seller.isFollowing = !seller.isFollowing;
  }
  static {
    this.\u0275fac = function ProductListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductListComponent, selectors: [["app-product-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 277, vars: 17, consts: [[1, "min-h-screen", "bg-surface", "font-body-md", "text-on-surface", "flex", "flex-col"], [1, "fixed", "top-0", "left-0", "right-0", "z-50", "bg-surface/90", "backdrop-blur-xl", "shadow-[0_1px_8px_rgba(0,0,0,0.04)]"], [1, "max-w-[1280px]", "mx-auto", "px-margin-desktop", "flex", "flex-col", "justify-between", "py-space-xs"], [1, "flex", "items-center", "justify-between", "gap-space-lg", "pt-space-xs"], ["routerLink", "/", 1, "flex", "items-center", "gap-2", "shrink-0"], [1, "w-8", "h-8", "rounded-xl", "bg-primary", "flex", "items-center", "justify-center", "text-on-primary", "font-bold", "shadow-sm"], [1, "material-symbols-outlined", "text-[20px]"], [1, "font-headline-md", "text-headline-md", "tracking-tight", "text-primary", "font-extrabold"], [1, "flex-1", "max-w-2xl", "px-space-sm"], [1, "relative", "flex", "items-center", "w-full", "bg-surface-container-low", "rounded-full", "px-space-md", "py-1.5", "focus-within:ring-2", "focus-within:ring-primary-container", "transition-all"], [1, "material-symbols-outlined", "text-outline", "mr-2", "text-[20px]"], ["type", "text", "placeholder", "Buscar ropa, marcas o art\xEDculos...", 1, "w-full", "bg-transparent", "border-none", "outline-none", "font-body-md", "text-body-md", "text-on-surface", "placeholder:text-outline", 3, "input", "value"], ["type", "button", 1, "flex", "items-center", "gap-1", "bg-surface-container-highest", "px-3", "py-1", "rounded-full", "font-label-md", "text-label-md", "text-on-surface-variant", "hover:bg-surface-container", "hover:text-on-surface", "transition-colors", "shrink-0", 3, "click"], [1, "material-symbols-outlined", "text-[16px]"], [1, "hidden", "lg:flex", "items-center", "gap-1", "shrink-0"], ["routerLink", "/", 1, "px-space-md", "py-space-xs", "bg-surface-container-high", "text-on-surface", "font-label-lg", "text-label-lg", "rounded-full", "transition-all"], ["routerLink", "/admin/products", 1, "px-space-md", "py-space-xs", "font-label-lg", "text-label-lg", "text-primary", "hover:bg-surface-container-low", "rounded-full", "transition-all", "flex", "items-center", "gap-1"], [1, "material-symbols-outlined", "text-[18px]"], [1, "flex", "items-center", "gap-space-md", "shrink-0"], ["routerLink", "/products/new", 1, "flex", "items-center", "gap-1.5", "bg-secondary-container", "text-on-secondary-container", "px-space-lg", "py-2", "rounded-full", "font-label-lg", "text-label-lg", "shadow-sm", "hover:opacity-95", "active:scale-95", "transition-all"], [1, "hidden", "sm:flex", "items-center", "gap-2", "pl-space-xs"], [1, "relative"], [1, "w-8", "h-8", "rounded-full", "bg-surface-container-highest", "text-primary", "font-bold", "flex", "items-center", "justify-center", "text-xs"], [1, "absolute", "bottom-0", "right-0", "w-2.5", "h-2.5", "bg-secondary", "rounded-full", "ring-2", "ring-surface"], [1, "font-label-md", "text-label-md", "text-on-surface", "hidden", "xl:inline-block"], [1, "flex", "items-center", "gap-space-lg", "overflow-x-auto", "py-2", "scrollbar-none"], ["type", "button", 1, "font-label-md", "text-label-md", "transition-colors", "whitespace-nowrap", "cursor-pointer", 3, "text-primary", "font-bold", "text-on-surface-variant", "hover:text-primary"], ["type", "button", 1, "font-label-md", "text-label-md", "text-primary", "font-bold", "whitespace-nowrap", "hover:text-primary-container", "transition-colors", 3, "click"], [1, "w-full", "pt-32", "bg-surface", "flex-1"], [1, "max-w-[1280px]", "mx-auto", "px-margin-desktop", "py-space-lg"], [1, "flex", "flex-col", "w-full"], [1, "relative", "w-full", "rounded-2xl", "bg-gradient-to-r", "from-surface-container", "via-surface-container-low", "to-primary-fixed/30", "p-space-lg", "md:p-space-xl", "overflow-hidden", "shadow-sm", "mb-space-xl"], [1, "absolute", "-right-16", "-bottom-16", "w-96", "h-96", "rounded-full", "bg-primary-container/10", "blur-3xl", "pointer-events-none"], [1, "absolute", "right-1/4", "-top-12", "w-64", "h-64", "rounded-full", "bg-secondary-fixed/40", "blur-2xl", "pointer-events-none"], [1, "relative", "z-10", "grid", "grid-cols-1", "lg:grid-cols-12", "gap-space-lg", "items-center"], [1, "lg:col-span-7", "flex", "flex-col", "gap-space-md"], [1, "inline-flex", "items-center", "gap-2", "bg-surface", "px-space-md", "py-1", "rounded-full", "shadow-sm", "w-fit"], [1, "inline-block", "w-2.5", "h-2.5", "rounded-full", "bg-secondary", "animate-pulse"], [1, "font-label-md", "text-label-md", "text-on-surface", "uppercase", "tracking-wider"], [1, "font-display-hero", "text-display-hero", "text-on-surface", "leading-tight", "tracking-tight"], [1, "font-body-lg", "text-body-lg", "text-on-surface-variant", "max-w-xl"], [1, "flex", "flex-wrap", "items-center", "gap-space-md", "pt-space-xs"], ["routerLink", "/products/new", 1, "bg-primary-container", "hover:bg-primary", "text-on-primary", "font-label-lg", "text-label-lg", "px-space-xl", "py-3", "rounded-full", "transition-all", "shadow-md", "active:scale-95", "flex", "items-center", "gap-2"], ["type", "button", 1, "bg-surface", "hover:bg-surface-container-highest", "text-on-surface", "font-label-lg", "text-label-lg", "px-space-lg", "py-3", "rounded-full", "transition-all", "shadow-sm", "flex", "items-center", "gap-2", 3, "click"], [1, "lg:col-span-5", "flex", "flex-col", "gap-space-md"], [1, "bg-surface/95", "backdrop-blur-md", "rounded-2xl", "p-space-lg", "shadow-sm", "flex", "flex-col", "gap-space-sm", "relative", "overflow-hidden"], [1, "flex", "items-center", "justify-between"], [1, "font-label-md", "text-label-md", "text-on-surface-variant"], [1, "material-symbols-outlined", "text-secondary", "text-[22px]"], [1, "flex", "items-baseline", "gap-2"], [1, "font-display-hero", "text-headline-lg", "text-secondary", "font-extrabold", "tracking-tight"], [1, "font-headline-sm", "text-headline-sm", "text-on-surface"], [1, "font-body-sm", "text-body-sm", "text-outline"], [1, "w-full", "bg-surface-container", "rounded-full", "h-2", "mt-space-xs", "overflow-hidden"], [1, "bg-secondary", "h-full", "rounded-full", "w-[78%]", "transition-all", "duration-1000"], [1, "flex", "justify-between", "items-center", "text-outline", "font-label-md", "text-label-md", "pt-1"], [1, "text-secondary", "font-bold"], [1, "flex", "items-center", "gap-space-md", "bg-secondary-fixed/50", "p-space-sm", "rounded-xl", "px-space-md"], [1, "material-symbols-outlined", "text-on-secondary-fixed", "text-[24px]"], [1, "font-body-sm", "text-body-sm", "text-on-secondary-fixed", "font-medium"], [1, "w-full", "mb-space-xl"], [1, "flex", "items-center", "justify-between", "mb-space-md"], [1, "font-headline-md", "text-headline-md", "text-on-surface", "font-bold"], ["type", "button", 1, "font-label-lg", "text-label-lg", "text-primary", "hover:text-primary-container", "transition-colors", "flex", "items-center", "gap-1", 3, "click"], [1, "grid", "grid-cols-2", "sm:grid-cols-3", "md:grid-cols-6", "gap-space-md"], [1, "group", "flex", "flex-col", "bg-surface-container-low", "hover:bg-surface-container", "rounded-2xl", "overflow-hidden", "p-space-xs", "transition-all", "shadow-sm", "hover:shadow-md", "cursor-pointer"], ["id", "feed-grid", 1, "w-full", "sticky", "top-28", "z-40", "bg-surface/95", "backdrop-blur-md", "py-space-sm", "mb-space-lg"], [1, "flex", "flex-col", "lg:flex-row", "items-stretch", "lg:items-center", "justify-between", "gap-space-md", "bg-surface-container-low", "p-space-sm", "rounded-2xl", "shadow-sm"], [1, "flex", "items-center", "gap-space-xs", "overflow-x-auto", "scrollbar-none", "py-1"], ["type", "button", 1, "flex", "items-center", "gap-1.5", "px-space-md", "py-2", "rounded-full", "font-label-md", "text-label-md", "shadow-sm", "shrink-0", "transition-colors", 3, "click"], [1, "relative", "shrink-0"], [1, "appearance-none", "bg-surface", "text-on-surface-variant", "hover:bg-surface-container", "hover:text-on-surface", "pl-space-md", "pr-7", "py-2", "rounded-full", "font-label-md", "text-label-md", "cursor-pointer", "border-none", "outline-none", "shadow-xs", 3, "change", "value"], ["value", ""], ["value", "Nike"], ["value", "Levi's"], ["value", "Zara"], ["value", "Carhartt"], ["value", "S\xE9zane"], [1, "material-symbols-outlined", "absolute", "right-2", "top-2.5", "text-[16px]", "text-outline", "pointer-events-none"], ["value", "Nuevo con etiquetas"], ["value", "Muy bueno"], ["value", "Bueno"], ["value", "Satisfactorio"], ["type", "button", 1, "text-primary", "hover:text-primary-container", "font-label-md", "text-label-md", "px-space-sm", "underline", "shrink-0", "cursor-pointer"], [1, "flex", "items-center", "justify-end", "gap-space-sm", "shrink-0", "border-t", "lg:border-t-0", "pt-2", "lg:pt-0"], [1, "font-label-md", "text-label-md", "text-outline"], [1, "text-on-surface"], [3, "message"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "gap-space-lg"], [1, "w-full", "bg-surface-container-low", "rounded-2xl", "p-space-lg", "md:p-space-xl", "mb-space-xl"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "mb-space-lg", "gap-space-sm"], [1, "inline-flex", "items-center", "gap-1", "text-secondary", "font-label-md", "text-label-md", "uppercase", "tracking-wider", "mb-1"], [1, "font-headline-lg", "text-headline-lg", "text-on-surface", "font-bold"], [1, "font-body-md", "text-body-md", "text-on-surface-variant"], ["type", "button", 1, "font-label-lg", "text-label-lg", "text-primary", "hover:text-primary-container", "transition-colors", "flex", "items-center", "gap-1", "shrink-0"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-space-lg"], [1, "bg-surface", "rounded-2xl", "p-space-md", "shadow-sm", "flex", "flex-col", "justify-between", "gap-space-md"], [1, "w-full", "rounded-2xl", "bg-surface-container", "p-space-lg", "md:p-space-xl", "mb-space-lg", "shadow-sm"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-space-lg", "items-center"], [1, "flex", "items-start", "gap-space-md"], [1, "w-12", "h-12", "rounded-full", "bg-secondary-fixed", "flex", "items-center", "justify-center", "text-on-secondary-fixed", "shrink-0"], [1, "material-symbols-outlined", "text-[24px]"], [1, "font-headline-sm", "text-headline-sm", "text-on-surface", "font-bold", "mb-1"], [1, "font-body-sm", "text-body-sm", "text-on-surface-variant"], [1, "w-12", "h-12", "rounded-full", "bg-primary-fixed", "flex", "items-center", "justify-center", "text-on-primary-fixed", "shrink-0"], [1, "w-12", "h-12", "rounded-full", "bg-tertiary-fixed", "flex", "items-center", "justify-center", "text-on-tertiary-fixed", "shrink-0"], [1, "w-full", "bg-surface-container-low", "mt-space-xl", "py-space-xl"], [1, "max-w-[1280px]", "mx-auto", "px-margin-desktop"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-space-xl", "mb-space-xl"], [1, "font-headline-sm", "text-headline-sm", "text-on-surface", "mb-space-md"], [1, "space-y-space-sm"], [1, "font-body-sm", "text-body-sm", "text-on-surface-variant", "hover:text-on-surface", "transition-colors"], ["routerLink", "/"], ["routerLink", "/admin/products"], ["routerLink", "/products/new"], [1, "flex", "items-center", "gap-space-sm", "p-space-sm", "bg-surface", "rounded-xl", "shadow-[0_1px_8px_rgba(0,0,0,0.04)]", "mb-space-sm"], [1, "material-symbols-outlined", "text-outline", "text-[20px]"], [1, "font-label-md", "text-label-md", "text-on-surface"], [1, "pt-space-lg", "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-space-md", "border-t", "border-slate-200"], [1, "flex", "items-center", "gap-2"], [1, "font-headline-sm", "text-headline-sm", "text-primary", "font-bold"], [1, "flex", "items-center", "gap-space-lg", "font-body-sm", "text-body-sm", "text-outline"], ["routerLink", "/", 1, "hover:text-on-surface", "transition-colors"], ["type", "button", 1, "font-label-md", "text-label-md", "transition-colors", "whitespace-nowrap", "cursor-pointer", 3, "click"], [1, "group", "flex", "flex-col", "bg-surface-container-low", "hover:bg-surface-container", "rounded-2xl", "overflow-hidden", "p-space-xs", "transition-all", "shadow-sm", "hover:shadow-md", "cursor-pointer", 3, "click"], [1, "aspect-square", "w-full", "rounded-xl", "overflow-hidden", "bg-surface-container-highest", "relative"], [1, "w-full", "h-full", "object-cover", "group-hover:scale-105", "transition-transform", "duration-300", 3, "src", "alt"], [1, "py-space-sm", "px-space-xs", "text-center"], [1, "font-label-lg", "text-label-lg", "text-on-surface", "group-hover:text-primary", "transition-colors", "block"], ["type", "button", 1, "text-primary", "hover:text-primary-container", "font-label-md", "text-label-md", "px-space-sm", "underline", "shrink-0", "cursor-pointer", 3, "click"], [3, "retry", "message"], [3, "product"], [1, "flex", "items-center", "gap-3"], [1, "w-12", "h-12", "rounded-full", "object-cover", 3, "src", "alt"], [1, "absolute", "bottom-0", "right-0", "w-3.5", "h-3.5", "rounded-full", "bg-secondary", "ring-2", "ring-surface"], [1, "font-headline-sm", "text-headline-sm", "text-on-surface", "font-bold", "leading-tight"], [1, "flex", "items-center", "gap-1", "text-outline", "font-label-md", "text-label-md"], [1, "material-symbols-outlined", "text-[14px]", "text-tertiary", 2, "font-variation-settings", "'FILL' 1"], [1, "text-on-surface", "font-semibold"], ["type", "button", 1, "px-space-md", "py-1.5", "rounded-full", "font-label-md", "text-label-md", "transition-all", "active:scale-95", 3, "click"], [1, "font-body-sm", "text-body-sm", "text-on-surface-variant", "italic"], [1, "grid", "grid-cols-3", "gap-2"], [1, "aspect-square", "rounded-xl", "overflow-hidden", "bg-surface-container"], [1, "flex", "items-center", "justify-between", "pt-space-xs", "text-outline", "font-label-md", "text-label-md"], [1, "text-primary", "font-bold"], ["alt", "Prenda", 1, "w-full", "h-full", "object-cover", "hover:scale-105", "transition-transform", 3, "src"]], template: function ProductListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3)(4, "a", 4)(5, "span", 5)(6, "span", 6);
        \u0275\u0275text(7, "shopping_bag");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "span", 7);
        \u0275\u0275text(9, "Vintod");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 8)(11, "div", 9)(12, "span", 10);
        \u0275\u0275text(13, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "input", 11);
        \u0275\u0275listener("input", function ProductListComponent_Template_input_input_14_listener($event) {
          return ctx.onSearchInput($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "button", 12);
        \u0275\u0275listener("click", function ProductListComponent_Template_button_click_15_listener() {
          return ctx.scrollToFeed();
        });
        \u0275\u0275elementStart(16, "span");
        \u0275\u0275text(17, "Art\xEDculos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "span", 13);
        \u0275\u0275text(19, "expand_more");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(20, "nav", 14)(21, "a", 15);
        \u0275\u0275text(22, " Explorar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "a", 16)(24, "span", 17);
        \u0275\u0275text(25, "admin_panel_settings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "span");
        \u0275\u0275text(27, "Panel Admin");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "div", 18)(29, "a", 19)(30, "span", 17);
        \u0275\u0275text(31, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "span");
        \u0275\u0275text(33, "\xA1Vender ahora!");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "div", 20)(35, "div", 21)(36, "div", 22);
        \u0275\u0275text(37, " VM ");
        \u0275\u0275elementEnd();
        \u0275\u0275element(38, "span", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "span", 24);
        \u0275\u0275text(40, "Vendedor");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(41, "div", 25);
        \u0275\u0275repeaterCreate(42, ProductListComponent_For_43_Template, 2, 9, "button", 26, _forTrack0);
        \u0275\u0275elementStart(44, "button", 27);
        \u0275\u0275listener("click", function ProductListComponent_Template_button_click_44_listener() {
          return ctx.selectCategory("");
        });
        \u0275\u0275text(45, " Ver todo el cat\xE1logo ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(46, "main", 28)(47, "div", 29)(48, "div", 30)(49, "section", 31);
        \u0275\u0275element(50, "div", 32)(51, "div", 33);
        \u0275\u0275elementStart(52, "div", 34)(53, "div", 35)(54, "div", 36);
        \u0275\u0275element(55, "span", 37);
        \u0275\u0275elementStart(56, "span", 38);
        \u0275\u0275text(57, "Moda Circular Verificada");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "h1", 39);
        \u0275\u0275text(59, " Dale una segunda vida a tu ropa favorita. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "p", 40);
        \u0275\u0275text(61, " Compra y vende moda de segunda mano sin comisiones de venta. Encuentra tesoros de archivo, marcas deseadas y reduce tu huella textil con env\xEDos locales seguros. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "div", 41)(63, "a", 42)(64, "span", 6);
        \u0275\u0275text(65, "add_circle");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "span");
        \u0275\u0275text(67, "Subir prendas gratis");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(68, "button", 43);
        \u0275\u0275listener("click", function ProductListComponent_Template_button_click_68_listener() {
          return ctx.scrollToFeed();
        });
        \u0275\u0275elementStart(69, "span");
        \u0275\u0275text(70, "Explorar novedades de hoy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "span", 17);
        \u0275\u0275text(72, "arrow_downward");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(73, "div", 44)(74, "div", 45)(75, "div", 46)(76, "span", 47);
        \u0275\u0275text(77, "Impacto colectivo en tiempo real");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "span", 48);
        \u0275\u0275text(79, "eco");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(80, "div", 49)(81, "span", 50);
        \u0275\u0275text(82);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "span", 51);
        \u0275\u0275text(84, "kg de CO\u2082");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(85, "p", 52);
        \u0275\u0275text(86, " Ahorrados esta semana por intercambios y compras de segunda mano en Vintod Espa\xF1a. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(87, "div", 53);
        \u0275\u0275element(88, "div", 54);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(89, "div", 55)(90, "span");
        \u0275\u0275text(91, "Objetivo mensual: 18.000 kg");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(92, "span", 56);
        \u0275\u0275text(93, "78% alcanzado");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(94, "div", 57)(95, "span", 58);
        \u0275\u0275text(96, "verified");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(97, "span", 59);
        \u0275\u0275text(98, " Tarifa plana de env\xEDo asegurado con recogida en punto pack desde solo ");
        \u0275\u0275elementStart(99, "strong");
        \u0275\u0275text(100, "2,50 \u20AC");
        \u0275\u0275elementEnd();
        \u0275\u0275text(101, ". ");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(102, "section", 60)(103, "div", 61)(104, "div")(105, "h2", 62);
        \u0275\u0275text(106, "Explora por categor\xEDas clave");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(107, "p", 52);
        \u0275\u0275text(108, "Prendas revisadas por la comunidad y listas para enviar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(109, "button", 63);
        \u0275\u0275listener("click", function ProductListComponent_Template_button_click_109_listener() {
          return ctx.selectCategory("");
        });
        \u0275\u0275elementStart(110, "span");
        \u0275\u0275text(111, "Ver cat\xE1logo completo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "span", 13);
        \u0275\u0275text(113, "chevron_right");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(114, "div", 64);
        \u0275\u0275repeaterCreate(115, ProductListComponent_For_116_Template, 8, 4, "div", 65, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(117, "section", 66)(118, "div", 67)(119, "div", 68)(120, "button", 69);
        \u0275\u0275listener("click", function ProductListComponent_Template_button_click_120_listener() {
          return ctx.selectCategory("");
        });
        \u0275\u0275elementStart(121, "span");
        \u0275\u0275text(122);
        \u0275\u0275elementEnd();
        \u0275\u0275template(123, ProductListComponent_Conditional_123_Template, 2, 0, "span", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(124, "div", 70)(125, "select", 71);
        \u0275\u0275listener("change", function ProductListComponent_Template_select_change_125_listener($event) {
          return ctx.onBrandChange($event);
        });
        \u0275\u0275elementStart(126, "option", 72);
        \u0275\u0275text(127, "Todas las marcas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(128, "option", 73);
        \u0275\u0275text(129, "Nike");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(130, "option", 74);
        \u0275\u0275text(131, "Levi's");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(132, "option", 75);
        \u0275\u0275text(133, "Zara");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(134, "option", 76);
        \u0275\u0275text(135, "Carhartt");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(136, "option", 77);
        \u0275\u0275text(137, "S\xE9zane");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(138, "span", 78);
        \u0275\u0275text(139, "keyboard_arrow_down");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(140, "div", 70)(141, "select", 71);
        \u0275\u0275listener("change", function ProductListComponent_Template_select_change_141_listener($event) {
          return ctx.onConditionChange($event);
        });
        \u0275\u0275elementStart(142, "option", 72);
        \u0275\u0275text(143, "Todos los estados");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(144, "option", 79);
        \u0275\u0275text(145, "Nuevo con etiquetas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(146, "option", 80);
        \u0275\u0275text(147, "Muy bueno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(148, "option", 81);
        \u0275\u0275text(149, "Bueno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(150, "option", 82);
        \u0275\u0275text(151, "Satisfactorio");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(152, "span", 78);
        \u0275\u0275text(153, "keyboard_arrow_down");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(154, ProductListComponent_Conditional_154_Template, 2, 0, "button", 83);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(155, "div", 84)(156, "span", 85);
        \u0275\u0275text(157, " Prendas disponibles: ");
        \u0275\u0275elementStart(158, "strong", 86);
        \u0275\u0275text(159);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(160, "section", 60);
        \u0275\u0275template(161, ProductListComponent_Conditional_161_Template, 1, 1, "app-error-state", 87)(162, ProductListComponent_Conditional_162_Template, 3, 1, "div", 88)(163, ProductListComponent_Conditional_163_Template, 2, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(164, "section", 89)(165, "div", 90)(166, "div")(167, "div", 91)(168, "span", 13);
        \u0275\u0275text(169, "verified");
        \u0275\u0275elementEnd();
        \u0275\u0275text(170, " Vendedoras Pro & Coleccionistas ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(171, "h2", 92);
        \u0275\u0275text(172, " Miembros destacados y sus armarios ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(173, "p", 93);
        \u0275\u0275text(174, " Sigue a perfiles con alta reputaci\xF3n y estilo curado para no perderte sus nuevos lanzamientos. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(175, "button", 94)(176, "span");
        \u0275\u0275text(177, "Descubrir m\xE1s armarios");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(178, "span", 13);
        \u0275\u0275text(179, "arrow_forward");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(180, "div", 95);
        \u0275\u0275repeaterCreate(181, ProductListComponent_For_182_Template, 28, 16, "div", 96, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(183, "section", 97)(184, "div", 98)(185, "div", 99)(186, "div", 100)(187, "span", 101);
        \u0275\u0275text(188, "verified_user");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(189, "div")(190, "h3", 102);
        \u0275\u0275text(191, " 100% Reembolso garantizado ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(192, "p", 103);
        \u0275\u0275text(193, " Tu dinero se retiene de forma segura hasta que recibes tu prenda y confirmas que se ajusta a la descripci\xF3n. ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(194, "div", 99)(195, "div", 104)(196, "span", 101);
        \u0275\u0275text(197, "local_shipping");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(198, "div")(199, "h3", 102);
        \u0275\u0275text(200, " Env\xEDos asegurados desde 2,50 \u20AC ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(201, "p", 103);
        \u0275\u0275text(202, " Seguimiento punto a punto integrado con Correos, InPost y SEUR. Seguro por p\xE9rdida o da\xF1o incluido. ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(203, "div", 99)(204, "div", 105)(205, "span", 101);
        \u0275\u0275text(206, "support_agent");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(207, "div")(208, "h3", 102);
        \u0275\u0275text(209, " Atenci\xF3n al cliente 24/7 ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(210, "p", 103);
        \u0275\u0275text(211, " Equipo dedicado para mediaciones, devoluciones r\xE1pidas y resoluci\xF3n de incidencias en espa\xF1ol. ");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(212, "footer", 106)(213, "div", 107)(214, "div", 108)(215, "div")(216, "h4", 109);
        \u0275\u0275text(217, "Comunidad Vintod");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(218, "ul", 110)(219, "li", 111)(220, "a", 112);
        \u0275\u0275text(221, "Sobre Vintod");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(222, "li", 111)(223, "a", 112);
        \u0275\u0275text(224, "Sostenibilidad e Impacto");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(225, "li", 111)(226, "a", 113);
        \u0275\u0275text(227, "Panel de Control");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(228, "div")(229, "h4", 109);
        \u0275\u0275text(230, "Comprar y Vender");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(231, "ul", 110)(232, "li", 111)(233, "a", 114);
        \u0275\u0275text(234, "C\xF3mo vender");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(235, "li", 111)(236, "a", 112);
        \u0275\u0275text(237, "Tarifas de env\xEDo");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(238, "li", 111)(239, "a", 112);
        \u0275\u0275text(240, "Protecci\xF3n al comprador");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(241, "div")(242, "h4", 109);
        \u0275\u0275text(243, "Soporte y Ayuda");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(244, "ul", 110)(245, "li", 111)(246, "a", 112);
        \u0275\u0275text(247, "Ayuda y Centro de soporte");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(248, "li", 111)(249, "a", 112);
        \u0275\u0275text(250, "Gu\xEDa de seguridad");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(251, "li", 111)(252, "a", 112);
        \u0275\u0275text(253, "Normas de la comunidad");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(254, "div")(255, "h4", 109);
        \u0275\u0275text(256, "Regi\xF3n & Idioma");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(257, "div", 115)(258, "span", 116);
        \u0275\u0275text(259, "language");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(260, "span", 117);
        \u0275\u0275text(261, "Espa\xF1a (ES) \xB7 EUR (\u20AC)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(262, "p", 52);
        \u0275\u0275text(263, "Moda circular verificada y env\xEDos neutros en carbono en toda la Pen\xEDnsula.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(264, "div", 118)(265, "div", 119)(266, "span", 120);
        \u0275\u0275text(267, "Vintod");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(268, "span", 52);
        \u0275\u0275text(269, "\xA9 2026 Vintod Marketplace. Todos los derechos reservados.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(270, "div", 121)(271, "a", 122);
        \u0275\u0275text(272, "Privacidad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(273, "a", 122);
        \u0275\u0275text(274, "T\xE9rminos y Condiciones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(275, "a", 122);
        \u0275\u0275text(276, "Aviso de Cookies");
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(14);
        \u0275\u0275property("value", ctx.store.searchFilter());
        \u0275\u0275advance(28);
        \u0275\u0275repeater(ctx.categories);
        \u0275\u0275advance(40);
        \u0275\u0275textInterpolate1(" ", ctx.ecoCounter().toLocaleString("es-ES"), " ");
        \u0275\u0275advance(33);
        \u0275\u0275repeater(ctx.categories);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("bg-primary-container", !ctx.store.categoryFilter())("text-on-primary", !ctx.store.categoryFilter())("bg-surface", ctx.store.categoryFilter())("text-on-surface-variant", ctx.store.categoryFilter());
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Categor\xEDa: ", ctx.store.categoryFilter() || "Todo", "");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.store.categoryFilter() ? 123 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.store.brandFilter());
        \u0275\u0275advance(16);
        \u0275\u0275property("value", ctx.store.conditionFilter());
        \u0275\u0275advance(13);
        \u0275\u0275conditional(ctx.store.searchFilter() || ctx.store.categoryFilter() || ctx.store.brandFilter() || ctx.store.conditionFilter() ? 154 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.store.filteredProducts().length);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.store.error() ? 161 : ctx.store.loading() ? 162 : 163);
        \u0275\u0275advance(20);
        \u0275\u0275repeater(ctx.featuredSellers);
      }
    }, dependencies: [
      RouterLink,
      ProductCardComponent,
      ProductSkeletonComponent,
      EmptyStateComponent,
      ErrorStateComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductListComponent, { className: "ProductListComponent", filePath: "src\\app\\features\\products\\pages\\product-list\\product-list.component.ts", lineNumber: 21 });
})();
export {
  ProductListComponent
};
//# sourceMappingURL=chunk-DRPFOAEY.js.map
