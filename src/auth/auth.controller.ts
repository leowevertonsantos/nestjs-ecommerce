/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/shared/services/user.service';
import { AuthDTO, RegisterDTO } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService){}


    @Post('login')
    public async login(@Body() userDTO: AuthDTO) {
        return await this.userService.findByLogin(userDTO);
    }

    @Post('register')
    public async register(@Body() userDTO: RegisterDTO){
        return await this.userService.create(userDTO);
    }
}
