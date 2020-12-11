/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {


  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      code : status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: status !== HttpStatus.INTERNAL_SERVER_ERROR ? (exception.message ||  null) : 'Internal Server Error'
    };

    return response.status(status).json(errorResponse);
  }


}
