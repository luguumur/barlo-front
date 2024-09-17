
export type AppConfig = {
    apiPrefix: string;
    authenticatedEntryPath: string;
    unAuthenticatedEntryPath: string;
};

const appConfig: AppConfig = {
    apiPrefix: 'https://webapi.barloworld.mn',
    authenticatedEntryPath: '/',
    unAuthenticatedEntryPath: '/auth/login',
};

export default appConfig;