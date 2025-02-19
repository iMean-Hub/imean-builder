import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageProcessingEvent } from '../impl/message-processing.event';

@EventsHandler(MessageProcessingEvent)
export class MessageProcessingHandler
  implements IEventHandler<MessageProcessingEvent>
{
  constructor() {}
  handle(event: MessageProcessingEvent) {
    throw new Error(`Method not implemented. ${event}`);
  }
}
