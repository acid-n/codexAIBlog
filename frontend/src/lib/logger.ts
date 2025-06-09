export const logger = {
  info(message: string, ...args: unknown[]) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.info(message, ...args);
    }
  },
  error(message: string, error?: unknown) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(message, error);
    }
  },
};
