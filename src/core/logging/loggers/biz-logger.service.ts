import { LoggerService } from '@nestjs/common';
import { APP_ENV, LOGGER_SERVICE_URL } from '../../configs';

export class BizLogger implements LoggerService {
  private queue: object[] = [];
  private labels: object = {};
  private baseFields: object = {};
  public processId?: string;

  constructor(
    private options: {
      category: string;
      service: string;
      conversationId?: string;
      userId?: string;
      processId?: string;
    }
  ) {
    const { processId, conversationId, userId, ...labels } = this.options;
    this.processId = processId;
    this.baseFields = {
      processId,
      conversationId,
      userId,
    };
    this.labels = { ...labels, env: APP_ENV };
  }

  register(options: {
    conversationId?: string;
    userId?: string;
    processId?: string;
  }) {
    return new BizLogger({ ...this.options, ...options });
  }

  private async send() {
    if (this.queue.length) {
      const msg = this.queue.shift();
      try {
        await fetch(`${LOGGER_SERVICE_URL}/api/log`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(msg),
        });
      } catch {}
    }
  }

  log(event: string, msg?: any) {
    this.queue.push({
      ...this.labels,
      event,
      level: 'info',
      msg: { ...this.baseFields, ...msg },
      timestamp: Date.now(),
    });
    this.send();
  }

  error(event: string, msg?: any) {
    this.queue.push({
      ...this.labels,
      event,
      level: 'error',
      msg: msg,
      timestamp: Date.now(),
    });
    this.send();
  }

  debug(event: string, msg?: any) {
    this.queue.push({
      ...this.labels,
      event,
      level: 'debug',
      msg: msg,
      timestamp: Date.now(),
    });
    this.send();
  }

  warn(event: string, msg?: any) {
    this.queue.push({
      ...this.labels,
      event,
      level: 'warning',
      msg: msg,
      timestamp: Date.now(),
    });
    this.send();
  }
}
