export const CONSTS = {
  BACKEND_URL: `${
    import.meta.env.PROD
      ? import.meta.env.VITE_PROD_BACKEND_URL
      : import.meta.env.VITE_DEV_BACKEND_URL
  }`,
};
