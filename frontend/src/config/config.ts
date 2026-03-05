const _config = {
  RZP_TEST_API_KEY: import.meta.env.VITE_RZP_TEST_API_KEY,
  enviroment: import.meta.env.VITE_CLIENT_ID,
};

export const config = Object.freeze(_config);
