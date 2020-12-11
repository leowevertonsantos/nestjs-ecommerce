/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDTO, RegisterDTO } from 'src/auth/dtos/auth.dto';
import { UserI } from 'src/types/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<UserI>){ }

    private sanitizeUser(user: UserI){
        return user.depopulate('password');
    }

    public async create(userDTO: RegisterDTO) {
        const userFinded = await this.userModel.findOne({name : userDTO.name})
        new this.userModel(userDTO)

        if(userFinded){
            throw new HttpException(`User with name ${userDTO.name} already exists`, HttpStatus.BAD_REQUEST);
        };

        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);

    }

    public async findByLogin(userDTO: AuthDTO) {
        const user = await this.userModel.findOne({name: userDTO.name});
        if(!user){
            throw new HttpException(`Invalid Credentials`, HttpStatus.UNAUTHORIZED);
        }

        if(!await bcrypt.compare(userDTO.password, user.password)){
            throw new HttpException(`Invalid Credentials`, HttpStatus.UNAUTHORIZED);
        }

        return this.sanitizeUser(user);
    }

}
