/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/shared/services/user.service';
import { AuthService } from './auth.service';
import { AuthDTO, RegisterDTO } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService 
        ){}


    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async tempAuth(){
        return { auth: 'work'}
    }


    @Post('login')
    public async login(@Body() userDTO: AuthDTO) {

        const user =  await this.userService.findByLogin(userDTO);
        const payload = {
            name: user.name,
            seller: user.seller,
        }

        const token = await this.authService.signinPayload(payload);
        return { user, token };
    }

    @Post('register')
    public async register(@Body() userDTO: RegisterDTO){
         
        const user =  await this.userService.create(userDTO);
        const payload = {
            name: user.name,
            seller: user.seller,
        }

        const token = await this.authService.signinPayload(payload);
        return { user, token };

    }
}
