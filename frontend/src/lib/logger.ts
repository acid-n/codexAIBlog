export const logger = {
  error(message: string, error?: unknown) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(message, error);
    }
  },
};
