/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
import { UserI } from "./user";

export interface ProductI extends Document{
    owner: UserI;
    title: string,
    description: string,
    image: string,
    price: string,
    create_at: Date;
}