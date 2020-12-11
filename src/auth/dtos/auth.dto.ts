/* eslint-disable prettier/prettier */
export interface AuthDTO{
    name: string;
    password: string;
}

export interface RegisterDTO{
    name: string;
    password: string;
    seller: boolean;
}