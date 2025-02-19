import { Global, Injectable, LoggerService } from '@nestjs/common';
import winston from 'winston';
import 'winston-daily-rotate-file';

@Global()
@Injectable()
export class WinstonLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        // 控制台日志
        new winston.transports.Console({
          //   format: winston.format.combine(
          //     winston.format.colorize(),
          //     winston.format.simple()
          //   ),
        }),
        // 日志轮换
        new winston.transports.DailyRotateFile({
          filename: 'logs/%DATE%.log', // 保存的文件名，使用 %DATE% 会自动插入日期
          datePattern: 'YYYY-MM-DD', // 文件日期格式
          maxSize: '20m', // 最大文件大小，达到此大小时会进行轮换
          maxFiles: '14d', // 保留14天的日志文件
          level: 'info', // 最低日志级别
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
