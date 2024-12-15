/**
 * User information required for loggin in
 */
export interface IUserCredentials {
    email: string;
    password: string;
}

/**
 * User information required for registration
 */
export interface IUserRegistration extends IUserCredentials {
    username: string;
}

export interface IToken {
    token: string;
}
