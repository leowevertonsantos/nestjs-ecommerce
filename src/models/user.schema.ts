/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
    {
        name: String,
        password: String,
        seller: {
            type: Boolean,
            default: false
        },
        address: {
            addr1: String,
            addr2: String,
            city: String,
            state: String,
            country: String,
            zip: Number,
        }
    },
    {
        timestamps: true
    }
    
);


UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
        
        if(this.isModified('password')){
            const hashed = await bcrypt.hash(this['password'], 16);
            this['password'] = hashed;
        }
        next();

    } catch (error) {
        next(error);
    }

    // try {
        
    //     if(!this.isModified('password')){
    //         return next();
    //     }

    //     const hashed = await bcrypt.hash(this['password'], 16);

    //     this['password'] = hashed;
    //     next();

    // } catch (error) {
    //     next(error);
    // }
});