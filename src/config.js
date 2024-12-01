export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export const FIREBASE_API = {
    // measurementId: 'G-MGJHSL8XW3'
    apiKey: 'AIzaSyADo4GgESmGkmV6Q9Yi2CQIqXLGHH5RsD4',
    authDomain: 'hootspy-web.firebaseapp.com',
    projectId: 'hootspy-web',
    storageBucket: 'hootspy-web.appspot.com',
    messagingSenderId: '636055561179',
    appId: '1:636055561179:web:d07e8b9d96233f8c1b7dfe'
};

export const AUTH0_API = {
    client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
    domain: 'dev-w0-vxep3.us.auth0.com'
};

export const AWS_API = {
    poolId: 'us-east-1_AOfOTXLvD',
    appClientId: '3eau2osduslvb7vks3vsh9t7b0'
};

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '';

// export const DASHBOARD_PATH = '/dashboard/default';
export const DASHBOARD_PATH = '/product';
export const SUBSCRIPTION_PATH = '/subscription';
export const EXPIRED_PATH = '/expired';

export const UNAUTHENTICATEDROUTES = ['/login', '/register', '/forgot-password'];

const config = {
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    // NOTE: tested this, but no changes are seen!!!!!!
    // presetColor: 'theme2', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

export default config;
