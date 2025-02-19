import i18n from '#core/i18n';
import { HttpException } from '@nestjs/common';

export enum BusinessErrorCode {
  NETWORK_CONNECTION_ERROR_WRE = 1019,
  NETWORK_CONNECTION_ERROR_MCE,
  NETWORK_CONNECTION_ERROR_HTE,
  FLIGHT_SEARCH_SERVICE_UNAVAILABLE_HSE,
  FLIGHT_SEARCH_SERVICE_UNAVAILABLE_TGE,
  PROCESSING_ERROR,
}

export type BusinessErrorCodeKeys = keyof typeof BusinessErrorCode;

export class BusinessException extends HttpException {
  constructor(status: BusinessErrorCode, message?: string) {
    message = i18n().errors[BusinessErrorCode[status]];
    super(message ?? '', status);
  }
}
