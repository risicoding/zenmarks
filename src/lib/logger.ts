const isDevelopment = process.env.NODE_ENV === "development";

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log("[LOG]:", ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn("[WARN]:", ...args);
    }
  },
  error: (...args: unknown[]) => {
    if (isDevelopment) {
      console.error("[ERROR]:", ...args);
    }
  },
  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug("[DEBUG]:", ...args);
    }
  },
};
