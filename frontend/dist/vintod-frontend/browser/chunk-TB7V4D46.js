import {
  ɵɵdefinePipe
} from "./chunk-FGNI3DP5.js";

// src/app/shared/pipes/date.pipe.ts
var AppDatePipe = class _AppDatePipe {
  transform(value, format = "short") {
    if (!value)
      return "-";
    const date = new Date(value);
    if (isNaN(date.getTime()))
      return "-";
    if (format === "relative") {
      const diffMs = Date.now() - date.getTime();
      const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
      if (diffDays === 0)
        return "Hoy";
      if (diffDays === 1)
        return "Ayer";
      if (diffDays < 30)
        return `Hace ${diffDays} d\xEDas`;
      return date.toLocaleDateString("es-ES");
    }
    if (format === "full") {
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }
  static {
    this.\u0275fac = function AppDatePipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppDatePipe)();
    };
  }
  static {
    this.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "appDate", type: _AppDatePipe, pure: true, standalone: true });
  }
};

export {
  AppDatePipe
};
//# sourceMappingURL=chunk-TB7V4D46.js.map
