/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'; 
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/shared/services/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){

    }

    async signinPayload(payload: any){
        return sign(payload, process.env.SECRET_JWT_KEY, {expiresIn: '12h'});
    }

    async validateUser(payload: any){
        return await this.userService.findByPayload(payload);
    }
}
