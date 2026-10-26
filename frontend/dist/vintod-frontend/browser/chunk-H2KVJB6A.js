import {
  ɵɵdefinePipe
} from "./chunk-FGNI3DP5.js";

// src/app/shared/pipes/currency.pipe.ts
var AppCurrencyPipe = class _AppCurrencyPipe {
  transform(value, currencyCode = "EUR") {
    if (value === null || value === void 0 || isNaN(Number(value))) {
      return "0,00 \u20AC";
    }
    const num = Number(value);
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }
  static {
    this.\u0275fac = function AppCurrencyPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppCurrencyPipe)();
    };
  }
  static {
    this.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "appCurrency", type: _AppCurrencyPipe, pure: true, standalone: true });
  }
};

export {
  AppCurrencyPipe
};
//# sourceMappingURL=chunk-H2KVJB6A.js.map
