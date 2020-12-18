/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserI} from './../types/user'

@Injectable()
export class SellerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const user: UserI = request.user;

    if(user && user.seller){
      return true;
    }
    
    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    
  }
}
