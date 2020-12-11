/* eslint-disable prettier/prettier */
import { Document } from "mongoose";

export interface UserI extends Document{
    name: string;
    readonly password: string;
    seller: boolean;
    address: AddressI;
    create_at: Date;
}

interface AddressI{
    add1: string;
    add2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}