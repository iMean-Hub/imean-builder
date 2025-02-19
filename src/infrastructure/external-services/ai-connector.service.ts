import { MICROSERVICE_AI_CONNECTOR_URL } from '#core/configs';
import { Injectable } from '@nestjs/common';
import { MicroserviceClient } from './microservice-sdks/ai-connector';

@Injectable()
export class AiConnectorService {
  readonly client: MicroserviceClient;

  constructor() {
    this.client = new MicroserviceClient({
      baseUrl: MICROSERVICE_AI_CONNECTOR_URL,
      prefix: '/service/ai-connector',
      fetch: globalThis.fetch,
      websocket: {
        WebSocket: WebSocket as any,
      },
    });
  }
}
