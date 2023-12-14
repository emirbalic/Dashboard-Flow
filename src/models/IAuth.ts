export interface IAuth {
    access_token: string;
    apiRoot: string;
    isAdmin: boolean;
    isAllowed: boolean;
    requiresReset: false
    username:string;
}
