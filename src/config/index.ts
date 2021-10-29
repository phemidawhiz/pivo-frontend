export default {
  app_domain: process.env.BASE_DOMAIN as string,
  environment: process.env.NODE_ENV as string,
  api_domain: process.env.API_DOMAIN as string,
  auth_secret: process.env.AUTH_SECRET,
  defaultPath: '/app/dashboard',
  userDataLocalStorage: {
    timeFrame: 1000*60*2, // 2min
  }
};
