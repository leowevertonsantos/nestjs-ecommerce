/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
import { UserI } from "./user";
import {ProductI} from "./product";

interface ProductOrderI{
    product: ProductI;
    quantity: number;
}

export interface OrderI extends Document{
    owner: UserI;
    totalPrice: number;
    products: ProductOrderI[];
    create_at: Date;
}