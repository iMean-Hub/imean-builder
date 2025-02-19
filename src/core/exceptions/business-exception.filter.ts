import { HTTP_STATUS_CODE_ENUM } from '#shared/enums/http-status-code.enum';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const result = {
      data: null,
      code: HTTP_STATUS_CODE_ENUM.INTERNAL_SERVER_ERROR,
      message: '',
    };
    //BadRequestException 用于业务异常处理，最终应该用后者
    if (exception instanceof BadRequestException) {
      //客户端调用错误，比如参数不对或者签名有问题
      const errorMsg = <any>exception.getResponse();
      result.code = errorMsg?.message;
      result.message = errorMsg.error;
    } else if (exception instanceof HttpException) {
      //捕获客户端未知的异常
      const errorMsg = <any>exception.getResponse();
      result.code = exception.getStatus();
      result.message = errorMsg;
    } else if (exception instanceof ForbiddenException) {
      //权限不够
      result.code = HTTP_STATUS_CODE_ENUM.FORBIDDEN;
      result.message = '权限不足，请联系管理员';
    } else if (exception instanceof UnauthorizedException) {
      //认证未通过
      result.code = HTTP_STATUS_CODE_ENUM.UNAUTHORIZED;
      result.message = '未认证，请登录之后再进行访问';
    } else if (exception instanceof InternalServerErrorException) {
      //服务器内部错误
      const errorMsg = <any>exception.getResponse();
      result.code = errorMsg?.message;
      result.message = errorMsg.error;
    }

    response.status(200).json(result);
  }
}
